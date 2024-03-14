/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useRef, useCallback} from 'react';
import {createPortal} from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import {DocSearchButton, useDocSearchKeyboardEvents} from '@docsearch/react';
import {translate} from '@docusaurus/Translate';
import lunr from 'lunr';

function SearchBar() {
  const searchContainer = useRef(null);
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    import('@docsearch/react/style');
  }, []);

  React.useEffect(() => {
    searchContainer.current = document.createElement('div');
    document.body.appendChild(searchContainer.current);
    return () => document.body.removeChild(searchContainer.current);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (event) => {
      setIsOpen(true);
    },
    [setIsOpen],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  const translatedSearchLabel = translate({
    id: 'theme.SearchBar.label',
    message: 'Search',
    description: 'The ARIA label and placeholder for search button',
  });

  return (
    <React.Fragment>
      <DocSearchButton
        onClick={onOpen}
        ref={searchButtonRef}
        translations={{
          buttonText: translatedSearchLabel,
          buttonAriaLabel: translatedSearchLabel,
        }}
      />

      {isOpen &&
        createPortal(<Modal onClose={onClose} />, searchContainer.current)}
    </React.Fragment>
  );
}

function MergeBaseUrl({path, alternateText, description}) {
  const ref = useBaseUrl(path);
  return <img src={ref} alt={alternateText} title={description} />;
}

function useOfflineIndex(setIsLoading) {
  const searchIndex = usePluginData('search-index');
  const [result, setResult] = React.useState({});

  const load = () => {
    setIsLoading(true);

    const {index, ...rest} = searchIndex;
    const idx = lunr.Index.load(index);
    setResult({idx, ...rest});

    setIsLoading(false);
  };

  React.useMemo(() => load(), [searchIndex]);

  return [result];
}

function useOfflineSearch(term, siteConfig, setHoveredIdx) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState([]);

  const [index] = useOfflineIndex(setIsLoading);

  React.useEffect(() => {
    if (!term) {
      setResult([]);
      return;
    }

    const t = setTimeout(() => {
      setIsLoading(true);

      const result = index.idx.search(term + '*').map(({ref}) => {
        const doc = index.documents.find((doc) => doc.id === ref);

        return {
          url: `${siteConfig.baseUrl}docs/${ref}`,
          title: doc ? doc.title : '',
          snippet: doc.content,
        };
      });

      setResult(result);
      setIsLoading(false);
      setHoveredIdx(-1);
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, [term, index, setHoveredIdx]);

  return [result, isLoading];
}

function useMarvisSearch(term, siteConfig, setHoveredIdx) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState([]);

  const searchOptions = siteConfig.customFields.marvisSearch;

  React.useEffect(() => {
    if (!term) {
      setResult([]);
      return;
    }

    const abort = new AbortController();

    const t = setTimeout(() => {
      setIsLoading(true);

      fetch(`${searchOptions.proxyURL}`, {
        method: 'POST',
        body: JSON.stringify({
          query: term,
          count: searchOptions.numResults,
          doc_source: `${searchOptions.docSource}`,
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        signal: abort.signal,
      })
        .then((x) => x.json())
        .then((x) => x.data)
        .catch((err) => (console.error(err), undefined))
        .then((x) => {
          if (x === undefined) {
            setResult([]);
            return;
          }

          const onClick = (index, e) => {
            const data = {feedback: {id: x.id, index}};
            navigator.sendBeacon(searchOptions.proxyURL, JSON.stringify(data));
          };

          const result = x.docs.map((item) => ({onClick, ...item}));
          setResult(result);
        });

      setIsLoading(false);
      setHoveredIdx(-1);
    }, 500);

    return () => {
      clearTimeout(t);
      abort.abort();
    };
  }, [term, siteConfig, setHoveredIdx]);

  return [result, isLoading];
}

function SearchFooterIcon() {
  const {siteConfig} = useDocusaurusContext();

  /** @type boolean */
  const offlineDocs = siteConfig.customFields.offlineDocs;

  return offlineDocs ? (
    <div alt="computer" title="Search results generated by your computer">
      &#128187;
    </div>
  ) : (
    <MergeBaseUrl
      path="img/marvis.svg"
      alternateText="Marvis"
      description="Search results generated by Marvis"
    />
  );
}

function Modal({onClose}) {
  const {siteConfig} = useDocusaurusContext();
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const [term, setSearchTerm] = React.useState('');

  /** @type boolean */
  const offlineDocs = siteConfig.customFields.offlineDocs;
  const useSearch = offlineDocs ? useOfflineSearch : useMarvisSearch;

  const [results, isLoading] = useSearch(term, siteConfig, setHoveredIdx);

  React.useEffect(() => {
    const existing = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';
    return () => (document.body.style.overflowY = existing);
  }, []);

  return (
    <div
      className={`DocSearch-Container ${
        isLoading ? 'DocSearch-Container--Stalled' : ''
      }`}
      onClick={onClose}>
      <div className="DocSearch-Modal" onClick={(e) => e.stopPropagation()}>
        <header className="DocSearch-SearchBar">
          <div className="DocSearch-Form">
            <label className="DocSearch-MagnifierLabel" id="docsearch-label">
              <svg
                width="20"
                height="20"
                className="DocSearch-Search-Icon"
                viewBox="0 0 20 20">
                <path
                  d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                  stroke="currentColor"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
              </svg>
            </label>
            <div className="DocSearch-LoadingIndicator">
              <svg viewBox="0 0 38 38" stroke="currentColor" strokeOpacity=".5">
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".3" cx="18" cy="18" r="18"></circle>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"></animateTransform>
                    </path>
                  </g>
                </g>
              </svg>
            </div>
            <input
              className="DocSearch-Input"
              aria-autocomplete="both"
              aria-labelledby="docsearch-label"
              id="docsearch-input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              enterkeyhint="go"
              spellCheck="false"
              placeholder="Search docs"
              maxLength="64"
              type="search"
              autoFocus
              value={term}
              onChange={(e) => setSearchTerm(e.target.value)}></input>
            {term && (
              <button
                type="reset"
                title="Clear the query"
                className="DocSearch-Reset"
                onClick={() => setSearch('')}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path
                    d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                    stroke="currentColor"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"></path>
                </svg>
              </button>
            )}
          </div>
        </header>
        {results.length === 0 && <div style={{height: 12}} />}
        {results.length > 0 && (
          <div className="DocSearch-Dropdown">
            <div className="DocSearch-Dropdown-Container">
              <section className="DocSearch-Hits">
                <div className="DocSearch-Hit-source">Results</div>
                <ul
                  role="listbox"
                  aria-labelledby="docsearch-label"
                  id="docsearch-list">
                  {results.map((x, idx) => (
                    <li
                      key={idx}
                      className="DocSearch-Hit"
                      id="docsearch-item-0"
                      role="option"
                      onMouseEnter={() => setHoveredIdx(idx)}
                      aria-selected={hoveredIdx === idx}>
                      <a href={x.url} onClick={x.onClick}>
                        <div className="DocSearch-Hit-Container">
                          <div className="DocSearch-Hit-content-wrapper">
                            <span className="DocSearch-Hit-title">
                              {x.title}
                            </span>
                            <span className="DocSearch-Hit-path">
                              {x.snippet}
                            </span>
                            <span className="DocSearch-Hit-path url">
                              {x.url}
                            </span>
                          </div>
                          <div className="DocSearch-Hit-action">
                            <svg
                              className="DocSearch-Hit-Select-Icon"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20">
                              <g
                                stroke="currentColor"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M18 3v4c0 2-2 4-4 4H2"></path>
                                <path d="M8 17l-6-6 6-6"></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

        <footer className="DocSearch-Footer">
          <div className="DocSearch-Logo">
            <span className="DocSearch-Label">Search by</span>
            <SearchFooterIcon />
          </div>
          <ul className="DocSearch-Commands">
            <li>
              <span className="DocSearch-Commands-Key">
                <svg width="15" height="15">
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.2">
                    <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-1.4376v-.5c0-.8128.5646-1.4376 1.7073-1.4376.7344 0 1.2808.2819 1.5443.876M1 11.5c.2672.6929 1.0731 1.1 1.916 1.1s1.6488-.4071 1.916-1.1M5.9727 2.6s-.0237-.2739.2415-.2739c.2652 0 .2126.2739.2126.2739" />
                  </g>
                </svg>
              </span>
              <span className="DocSearch-Label">to close</span>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default SearchBar;
