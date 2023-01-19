import Head from 'next/head'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function Home() {
  return (
    <>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Convert your currencies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingSpinner />
    </>
  )
}
