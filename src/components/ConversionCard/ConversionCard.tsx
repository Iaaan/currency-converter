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
  return (
    <Container>
      { !base && <CurrencyText>Select base currency.</CurrencyText> }

      { base &&
        <>
          <CurrencyText>1 {base}</CurrencyText>
          <CurrencyText>=</CurrencyText>
        </>
      }

      { (quote && conversion) &&
        <CurrencyText>{`${conversion} ${quote}s`}</CurrencyText>
      }
    </Container>
  )
}
