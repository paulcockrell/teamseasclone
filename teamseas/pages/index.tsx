import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Box, Text, VStack, Grid, Heading
} from '@chakra-ui/react'
import { Logo } from '../components/Logo'
import { Counter } from '../components/Counter'
import { LeaderBoard } from '../components/LeaderBoard'
import { DonationWizard } from '../components/DonationWizard'
import { useQuery, useSubscription } from 'urql'

const TotalDonationsQuery = `
  query Query {
    totalDonations
  }
`

const TotalUpdatedQuery = `
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`

const handleSubscription = (_previous: any, newTotal: any) => {
  return newTotal?.totalUpdated?.total
}

const Home: NextPage = () => {
  const [{ data, fetching, error }] = useQuery({ query: TotalDonationsQuery })
  const [res] = useSubscription({ query: TotalUpdatedQuery }, handleSubscription)

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <Box textAlign="center" fontSize="xl">
      <Head>
        <title>TeamSeas</title>
        <meta name="description" content="Teamseas, taking the poo out of the sea" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh" p={3} bg="gray.50">
        <VStack spacing={8}>
          <Logo h="32" pointerEvents="none" />
          <Heading as="h1" size="xl" textTransform="uppercase">
            Join the movement!
          </Heading>
          <Text>
            The team is growing every day and scoring wins for the planet.
            <br /> Remove trash with us and track our progress!
          </Text>

          <Heading as="h2" size="4xl">
            <Counter from={0} to={res.data || data.totalDonations} />
          </Heading>

          <DonationWizard />

          <LeaderBoard />
        </VStack>
      </Grid>
    </Box>
  )
}

export default Home
