import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/700.css'

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createClient, Provider, subscriptionExchange, defaultExchanges } from 'urql'
import { createClient as createWSClient } from 'graphql-ws'

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
  }
})

const wsClient = process.browser ? createWSClient({
  url: 'ws://localhost:3001/graphql',
}) : null

const client = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink: any) => ({
          unsubscribe: wsClient ? wsClient.subscribe(operation, sink) : () => { }
        })
      })
    })
  ]
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
