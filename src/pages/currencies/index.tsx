import { useBoundStore } from '@/stores'
import { useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'

export default function Currencies() {
  const currencies = useBoundStore(state => state.currencies)
  const fetchAllCurrencies = useBoundStore(state => state.fetchAllCurrencies)

  const noCurrencies = Object.keys(currencies).length < 1

  useEffect(() => {
    if (noCurrencies) {
      fetchAllCurrencies()
    }
  }, [currencies])

  if (noCurrencies) {
    return <Spinner size="xl" />
  }

  return (
    <>
      {JSON.stringify(currencies, null, 2)}
    </>
  )
}
