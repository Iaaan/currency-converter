import { useBoundStore } from '@/stores'
import { useEffect } from 'react'
import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function Currencies() {
  const currencies = useBoundStore(state => state.currencies)
  const fetchAllCurrencies = useBoundStore(state => state.fetchAllCurrencies)

  const noCurrencies = Object.keys(currencies).length < 1

  useEffect(() => {
    if (noCurrencies) {
      fetchAllCurrencies()
    }
  }, [noCurrencies, fetchAllCurrencies])

  if (noCurrencies) {
    return <LoadingSpinner />
  }

  return (
    <>
      {JSON.stringify(currencies, null, 2)}
    </>
  )
}
