// noinspection JSUnusedGlobalSymbols

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // noinspection HtmlUnknownTarget,HtmlRequiredTitleElement
  return (
    <Html>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Muli&display=swap'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
