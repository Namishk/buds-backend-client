import { Html, Head, Main, NextScript } from "next/document";
import BackgroundWrapper from "~/components/BackgroundWrapper";

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head />
      <body>
        <BackgroundWrapper />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
