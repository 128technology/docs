/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useRef, useCallback, useMemo} from 'react';
import {createPortal} from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useHistory} from '@docusaurus/router';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {DocSearchButton, useDocSearchKeyboardEvents} from '@docsearch/react';
import {translate} from '@docusaurus/Translate';

function SearchBar() {
  const {withBaseUrl} = useBaseUrlUtils();
  const history = useHistory();
  const searchContainer = useRef(null);
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(null);

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

function Modal({onClose}) {
  const {siteConfig, siteMetadata} = useDocusaurusContext();
  const [search, setSearch] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(-1);

  const searchOptions = siteConfig.customFields.marvisSearch;

  React.useEffect(() => {
    const existing = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';
    return () => (document.body.style.overflowY = existing);
  }, []);

  React.useEffect(() => {
    if (!search) {
      setItems([]);
      return;
    }

    const abort = new AbortController();

    const t = setTimeout(() => {
      setIsLoading(true);

      fetch(
        `${searchOptions.proxyURL}`,
        {
          method: 'POST',
          body: JSON.stringify({
            query: search,
            count: `${searchOptions.numResults}`,
            doc_source: `${searchOptions.docSource}`
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          signal: abort.signal,
        },
      )
        .then((x) => x.json())
        .then((x) => x.data.docs)
        .catch((err) => (console.error(err), []))
        .then((x) => {
          setItems(x);
          setIsLoading(false);
          setHoveredIdx(-1);
        });
    }, 500);

    return () => {
      clearTimeout(t);
      abort.abort();
    };
  }, [search]);

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}></input>
            {search && (
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
        {items.length === 0 && <div style={{height: 12}} />}
        {items.length > 0 && (
          <div className="DocSearch-Dropdown">
            <div className="DocSearch-Dropdown-Container">
              <section className="DocSearch-Hits">
                <div className="DocSearch-Hit-source">Results</div>
                <ul
                  role="listbox"
                  aria-labelledby="docsearch-label"
                  id="docsearch-list">
                  {items.map((x, idx) => (
                    <li
                      key={idx}
                      className="DocSearch-Hit"
                      id="docsearch-item-0"
                      role="option"
                      onMouseEnter={() => setHoveredIdx(idx)}
                      aria-selected={hoveredIdx === idx}>
                      <a href={x.url}>
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

        <footer class="DocSearch-Footer">
          <div class="DocSearch-Logo">
            <span class="DocSearch-Label">Search by</span>
            <img
              src="/img/marvis.svg"
              alt="Marvis"
              title="Search results generated by Marvis"></img>
          </div>
          <ul class="DocSearch-Commands">
            <li>
              <span class="DocSearch-Commands-Key">
                <svg width="15" height="15">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.2">
                    <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path>
                  </g>
                </svg>
              </span>
              <span class="DocSearch-Label">to close</span>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default SearchBar;

