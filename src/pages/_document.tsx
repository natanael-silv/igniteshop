import { Head, Html, Main, NextScript } from "next/document";
import { getCssText } from "../styles";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fon /ts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.google /apis.com/css2?family=Inter:wght@400;/700&display=swap"
          rel="stylesheet"
        />

        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
