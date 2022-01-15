import { RadioCard } from "./RadioCard"
import { useState } from 'react'
import { Button, Text, NumberInput, NumberInputField, Heading, SimpleGrid, useRadioGroup, VStack } from '@chakra-ui/react'

interface Props {
  next: (values: any) => void
  initialCount: number
}

const options = [5, 20, 50, 100]

export const CountSelection = ({ next, initialCount }: Props) => {
  const [pounds, setPounds] = useState(initialCount);
  const [customAmount, setCustomAmount] = useState(
    '' + (options.includes(pounds) ? '' : pounds)
  )

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'pounds',
    value: pounds,
    onChange: (nextValue: string) => {
      setCustomAmount('')
      setPounds(parseInt(nextValue))
    }
  })

  const group = getRootProps()

  const nextStep = () => {
    next({ count: pounds })
  }

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h3" size="md" textTransform="uppercase">
        Join #TeamSeas
      </Heading>

      <Text fontSize="md" fontWeight="bold">
        $1 removes a pound of trash
      </Text>

      <SimpleGrid columns={2} spacing={2} {...group}>
        {options.map(option => {
          const radio = getRadioProps({ value: option })
          return (
            <RadioCard key={option} {...radio}>
              {option} pounds
            </RadioCard>
          )
        })}
      </SimpleGrid>

      <NumberInput
        onFocus={() => setPounds(0)}
        onChange={value => {
          setPounds(parseInt(value))
          setCustomAmount(value)
        }}
        value={customAmount}
      >
        <NumberInputField placeholder="Other amount" />
      </NumberInput>

      <hr />

      <Button
        isFullWidth
        colorScheme="orange"
        size="lg"
        borderRadius="full"
        onClick={nextStep}
      >
        Next
      </Button>

    </VStack>
  )
}
