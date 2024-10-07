// pages/_app.js
import Head from 'next/head';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Typing Test</title>
        <meta name="description" content="Your favourite app for testing your typing speed" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
