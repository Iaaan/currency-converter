import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useBoundStore } from '../stores'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function Home() {
  const username = useBoundStore(state => state.username)
  const router = useRouter()
  
  useEffect(() => {
    if (!username) {
      router.push('/login')
    } else {
      router.push('/currencies')
    }
  }, [username, router])

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
