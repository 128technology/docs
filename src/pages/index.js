import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Plan</>,
    description: (
      <>
        See what the SSR can do for your network!
      </>
    ),
  },
  {
    title: <>Set Up</>,
    description: (
      <>
        Install or upgrade your software.
      </>
    ),
  },
    {
    title: <>Manage</>,
    description: (
      <>
        Use the SSR to monitor and manage your network.
      </>
    ),
  },
  {
    title: <>About the Session Smart Router</>,
    link: 'docs/intro_getting_started',
    description: (
      <>
        Start here for a look into the SSR
      </>
    ),
  },
  {
    title: <>Installation Guide</>,
    link: 'docs/intro_installation',
    description: (
      <>
        Software download and installation information.
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
    title: <>Release Notes</>,
    link: 'docs/release_notes_128t_6.3', 
    description: (
      <>
       Release information for SSR Software and components.
      </>
    ),
  },
  {
    title: <>Software Upgrades</>,
    link: 'docs/intro_upgrade_considerations',
    description: (
      <>
        Old software? Need an upgrade? Start here!
      </>
    ),
  },
  {
    title: <>Security</>,
    link: 'docs/seurity-overview',
    description: (
      <>
        Understand and configure the security features.
      </>
    ),
  },
  {
    title: <>Supported Hardware Platforms</>,
    link: 'docs/supported-devices-overview',
    description: (
      <>
        List of SSR supported platforms.
      </>
    ),
  },
  {
    title: <>Best Practices</>,
    link: 'docs/bcp_sdwan_design_guide',
    description: (
      <>
        Recommended guides and design patterns
      </>
    ),
  },
  {
    title: <>Command References</>,
    link: 'docs/cli_reference',
    description: (
      <>
        Settings and functionality of the SSR CLI
      </>
    ),
  },
  {
    title: <>Concepts</>,
    link: 'docs/concepts-overview',
    description: (
      <>
        Learn how the SSR Software does what it does so well!
      </>
    ),
  },
  {
    title: <></>,
    link: '',
    description: (
      <>
        
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
    title: <>WAN Assurance</>,
    link: 'docs/wan_overview',
    description: (
      <>
        Onboard and Adopt the SSR into the Mist Cloud
      </>
    ),
  },
  {
    title: <></>,
    link: '',
    description: (
      <>
        
      </>
    ),
  },
  {
    title: <>High Availability</>,
    link: 'docs/config_ha',
    description: (
      <>
        Learn about HA options and configuration
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

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The source for documentation of the Juniper Session Smart Routing Platform.">
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
