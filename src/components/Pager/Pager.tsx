import { IconButton, Flex, Text } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export interface PagerProps {
  page: number,
  numPages: number,
  onPrev: () => void,
  onNext: () => void,
}

export default function Pager ({
  page,
  numPages,
  onPrev,
  onNext,
}: PagerProps) {
  return (
    <Flex
      justify="space-between"
      maxW="34rem"
      margin="0 auto"
    >
      <IconButton
        aria-label="previous page"
        icon={<ArrowBackIcon />}
        onClick={onPrev}
        isDisabled={page === 0}
      />

      <Text>{page + 1} / {numPages + 1}</Text>

      <IconButton
        aria-label="next page"
        icon={<ArrowForwardIcon />}
        onClick={onNext}
        isDisabled={page === numPages}
      />
    </Flex>
  )
}
