import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href=''/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}