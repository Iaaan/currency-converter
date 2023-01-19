import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useBoundStore } from '@/stores'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
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

  // Selected currency query params
  const {c1, c2} = router.query
  const currency1 = c1?.toString()
  const currency2 = c2?.toString()

  const numCurrencies = Object.keys(currencies).length
  const numPages = Math.floor(numCurrencies / PAGE_SIZE)

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

  // Loading if there are no currencies.
  if (numCurrencies === 0) return <LoadingSpinner />

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
  const currenciesOnPage = Object.keys(currencies)
    .slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const getHref = (k: string) => {
    return currency1
      ? `/currencies/?c1=${currency1}&c2=${k}`
      : `/currencies/?c1=${k}`
  }

  return (
    <>
      <Box height="5rem">
        {currency1 && <Text as="span">{currencies[currency1]} </Text>}
        {currency2 && <Text as="span">{'=>'} {currencies[currency2]} </Text>}
        {conversion && <Text as="span">{conversion}</Text>}
      </Box>
      <SimpleGrid
        columns={{ sm: 1, md: 2}}
        spacing="2"
        minH="37rem"
        alignContent="start"
      >
        {currenciesOnPage.map(k => (
          <Link key={k} href={getHref(k)}>
            <Button w="100%">{currencies[k]}</Button>
          </Link>
        ))}
      </SimpleGrid>

      <Flex
        justify="space-between"
        maxW="34rem"
        margin="0 auto"
      >
        <IconButton
          aria-label="previous page"
          icon={<ArrowBackIcon />}
          onClick={prevPage}
          isDisabled={page === 0}
        />

        <Text>{page + 1} / {numPages + 1}</Text>

        <IconButton
          aria-label="next page"
          icon={<ArrowForwardIcon />}
          onClick={nextPage}
          isDisabled={page === numPages}
        />
      </Flex>
    </>
  )
}
