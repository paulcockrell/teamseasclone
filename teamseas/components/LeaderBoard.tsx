import { Stack, Radio, RadioGroup, Box, Heading, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { Donation } from "../types/models"
import { LeaderBoardItem } from "./LeaderBoardItem"
import { useQuery } from 'urql'

const DonationsQuery = `
  query Query($orderBy: OrderByParams) {
    donations(orderBy: $orderBy) {
      count
      id
      displayName
      createdAt
      message
      team
    }
  }
`

type DonationsQueryResults = {
  donations: Donation[]
}

interface Props { }

export const LeaderBoard = (props: Props) => {
  const [orderByField, setOrderByField] = useState('createdAt')
  const [{ data, fetching, error }] = useQuery<DonationsQueryResults>({
    query: DonationsQuery,
    variables: {
      orderBy: {
        field: orderByField,
        direction: 'desc',
      },
    },
  })

  if (error) return <p>Something went wrong...</p>
  if (fetching || !data) return <p>Loading...</p>

  return (
    <Box w="100%">
      <VStack spacing="4">
        <Heading as="h1" size="2xl" textTransform="uppercase">
          Leaderboard
        </Heading>

        <RadioGroup onChange={setOrderByField} value={orderByField}>
          <Stack direction='row'>
            <Radio value='createdAt'>Most recent</Radio>
            <Radio value='count'>Most pounds</Radio>
          </Stack>
        </RadioGroup>

        {data.donations.map(donation =>
          <LeaderBoardItem donation={donation} />
        )}
      </VStack>
    </Box>
  )
}
