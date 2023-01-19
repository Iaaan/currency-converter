import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useBoundStore } from '@/stores'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ConversionCard } from '@/components/ConversionCard'
import { Pager } from '@/components/Pager'
import {
  Box,
  Button,
  Input,
  SimpleGrid,
 } from '@chakra-ui/react'

const PAGE_SIZE = 20

export default function Currencies() {
  const router = useRouter()
  const currencies = useBoundStore(state => state.currencies)
  const conversion = useBoundStore(state => state.conversion)
  const fetchAllCurrencies = useBoundStore(state => state.fetchAllCurrencies)
  const fetchConversion = useBoundStore(state => state.fetchConversion)
  const clearConversion = useBoundStore(state => state.clearConversion)

  // Local state for paging
  const [page, setPage] = useState(0)
  // Local state for search input
  const [search, setSearch] = useState('')

  // Selected currency query params
  const {c1, c2} = router.query
  const currency1 = c1?.toString()
  const currency2 = c2?.toString()

  const numCurrencies = Object.keys(currencies).length

  // Fetch all currencies if we haven't already.
  useEffect(() => {
    if (numCurrencies === 0) {
      fetchAllCurrencies()
    }
  }, [numCurrencies, fetchAllCurrencies])

  // Fetch conversion when both currencies are selected.
  useEffect(() => {
    if (currency1 && currency2) {
      clearConversion()
      fetchConversion(currency1, currency2)
    }

    if (!currency1 || !currency2) {
      clearConversion()
    }
  }, [currency1, currency2, clearConversion, fetchConversion])

  // Memoized filter for search input on currencies.
  const filterCurrencies = () => {
    return Object.keys(currencies)
      .filter(k => {
        const text = `${k}${currencies[k]}`.toLowerCase()
        const term = search.toLowerCase()

        return text.includes(term)
    })
  }

  const filteredCurrencies = useMemo(filterCurrencies, [search, currencies])

  const numPages = Math.floor(filteredCurrencies.length / PAGE_SIZE)

  // Handler for test search input
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    if (page !== 0) {
      setPage(0)
    }
  }

  // Paging handlers for prev/next buttons.
  const nextPage = () => {
    if (page + 1 > numPages) return

    setPage(page + 1)
  }

  const prevPage = () => {
    if (page === 0) return

    setPage(page - 1)
  }

  // Subset of currency keys based on page number.
  const currenciesOnPage = filteredCurrencies
    .slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const getHref = (k: string) => {
    return currency1
      ? `/currencies/?c1=${currency1}&c2=${k}`
      : `/currencies/?c1=${k}`
  }

  // Loading if there are no currencies.
  if (numCurrencies === 0) return <LoadingSpinner />

  return (
    <>
      <ConversionCard
        base={currency1 && currencies[currency1]}
        quote={currency2 && currencies[currency2]}
        conversion={conversion}
      />

      <Box marginBottom="1rem">
        <Input
          placeholder="Search currencies"
          value={search}
          onChange={onSearchChange}
        />
      </Box>

      <SimpleGrid
        columns={{ sm: 1, md: 2}}
        spacing="2"
        minH="32rem"
        marginBottom="1rem"
        alignContent="start"
      >
        {currenciesOnPage.map(k => (
          <Link key={k} href={getHref(k)}>
            <Button w="100%">{currencies[k]}</Button>
          </Link>
        ))}
      </SimpleGrid>

      <Pager
        page={page}
        numPages={numPages}
        onPrev={prevPage}
        onNext={nextPage}
      />
    </>
  )
}
