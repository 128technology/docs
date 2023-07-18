import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

const features = [
  {
    title: <>About</>,
    link: 'docs/about_128t',
    description: (
      <>
        Software Releases, policies, and contribution guidelines
      </>
    ),
  },
  {
    title: <>Getting Started</>,
    link: 'docs/intro_getting_started',
    description: (
      <>
        Install and set up your SSR
      </>
    ),
  },
  {
    title: <>Concepts</>,
    link: 'docs/concepts_glossary',
    description: (
      <>
        SSR architecture concepts and components
      </>
    ),
  },
  {
    title: <>Administration</>,
    link: 'docs/config_basics',
    description: (
      <>
        Manage SSR software lifecycle and configuration
      </>
    ),
  },
  {
    title: <>WAN Assurance</>,
    link: 'docs/wan_overview',
    description: (
      <>
        Onboard and Adopt the SSR into the Mist Cloud
      </>
    ),
  },
  {
    title: <>Best Practices</>,
    link: 'docs/bcp_conductor_deployment',
    description: (
      <>
        Recommended guides and design patterns
      </>
    ),
  },
  {
    title: <>CLI Reference</>,
    link: 'docs/cli_reference',
    description: (
      <>
        Settings and functionality of the SSR CLI
      </>
    ),
  },
  {
    title: <>Plugins</>,
    link: 'docs/plugin_intro',
    description: (
      <>
        Extend SSR functionality with plugins
      </>
    ),
  },
  {
    title: <>Software Releases</>,
    link: 'docs/about_releases',
    description: (
      <>
        List of all SSR software releases
      </>
    ),
  }
];

function Feature({link, title, description}) {
  const href = useBaseUrl(link);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      <Link to={href}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
}

function MergeBaseUrl({path, description}) {
  const ref = useBaseUrl(path);
  return (
    <img src={ref} alt={description} />
  );
}

function Banner() {
  return (
    <div className={classnames('banner', styles.banner)}>
      <p>
        You are viewing a local version of this documentation. For the most up-to-date information, 
        please visit the <a href='https://docs.128technology.com/'>online documentation</a>.
      </p>
    </div>
  );
}

function CheckSSR() {
  const [isLocalSSR, setIsLocalSSR] = useState(false);

  useEffect(() => {
    fetch("/ssrflag.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setIsLocalSSR(json.isLocalSSR);
      }).catch(e => {
        console.log("Error: " + e);
        setIsLocalSSR(false);
      });
  }, []);

  return (
    <>
      {isLocalSSR ? <Banner /> : null}
    </>
  );
}


function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The source for documentation of the Juniper Session Smart Routing Platform.">
      <CheckSSR />
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="heroTitle">Session Smart Router</div>
          <p className="hero__subtitle">Product Docs</p>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={classnames('col col--4', styles.feature)}>
                <p>The Juniper Session Smart platform is an innovative software router, built around the services that matter.</p>

                <p>Deliver your sessions tunnel-free with Secure Vector Routing.
                Segment and secure your endpoints with Network Tenancy.
                Automate using the APIs of a routing platform developed with modern software.
                This Docs Repository is your guide to optimizing the Session Smart Router's features and capabilities.
                </p>

                <p>Get started now building services with the Session Smart Router.</p>
              </div>
              <div className={classnames('col col--8', styles.feature)}>
                <MergeBaseUrl path="img/128t-components.png" description="Session Smart Networking Platform" />
              </div>
            </div>
          </div>
        </section>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({title, link, description}) => (
                  <Feature
                    key={title.props.children}
                    title={title}
                    link={link}
                    description={description}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
