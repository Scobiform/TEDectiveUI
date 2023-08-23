import Head from 'next/head'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }: AppProps) {

  const appName = process.env.NEXT_PUBLIC_SITE_NAME;
  const appDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;

  const title = `${appName} - ${appDescription}`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
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
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
