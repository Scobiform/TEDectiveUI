import Head from 'next/head'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function TEDectiveUI({ Component, pageProps }: AppProps) {

  const appName = process.env.NEXT_PUBLIC_NAME;
  const appDescription = process.env.NEXT_PUBLIC_DESCRIPTION;
  const appKeywords = process.env.NEXT_PUBLIC_KEYWORDS;
  const ogImage = process.env.NEXT_PUBLIC_OG_IMAGE;

  const title = `${appName} - ${appDescription}`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 shrink-to-fit=no"
        />
        <meta name="description" content={appDescription} />
        <meta name="keywords" content={appKeywords} />
        <meta property="og:image" content={ogImage} />

        <title>{title}</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="favicon.ico"></link>
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#00A535" />
      </Head>
        <Component {...pageProps} />
    </>
  )
}
