import { Box } from '@chakra-ui/react'
import { Container, CurrencyText } from './ConversionCard.css'

export interface ConversionCardProps {
  base?: string,
  quote?: string,
  conversion: number | null,
}

export default function ConversionCard({
  base,
  quote,
  conversion,
}: ConversionCardProps) {
  if (!base) return (
    <Container>
      <CurrencyText>Select base currency.</CurrencyText>
    </Container>
  )

  return (
    <Container>
      <CurrencyText>{base ? `1 ${base} = ` : 'Select base currency.'}</CurrencyText>
      { (quote && conversion) &&
        <CurrencyText>{`${conversion} ${quote}`}</CurrencyText>
      }
    </Container>
  )
}
