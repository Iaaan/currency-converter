import { useEffect } from 'react'
import Head from 'next/head'
import { useBoundStore } from '../stores'

export default function Home() {
  const currencies = useBoundStore(state => state.currencies)
  const fetchAllCurrencies = useBoundStore(state => state.fetchAllCurrencies)

  useEffect(() => {
    if (Object.keys(currencies).length === 0) {
      fetchAllCurrencies()
    }
  }, [currencies])

  return (
    <>
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="Convert your currencies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{JSON.stringify(currencies)}</main>
    </>
  )
}
