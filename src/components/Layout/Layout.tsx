import type { ReactNode } from 'react'
import { useBoundStore } from '@/stores'

import { Avatar, Box, Button, Center, Container, Heading } from '@chakra-ui/react'
import { Header } from './Layout.css'

export interface LayoutProps {
  children: ReactNode,
}

const Layout = (props: LayoutProps) => {
  const username = useBoundStore(state => state.username)
  const logout = useBoundStore(state => state.logout)

  return (
    <Container maxWidth="1080px">
      <Header>
        <Heading as="h1" size="md">Currency Converter</Heading>
        <Box>
          { 
            username &&
            <Button
              variant="link"
              paddingRight="1rem"
              onClick={logout}
            >
              Logout
            </Button>
          }
          <Avatar
            name={username || undefined}
            size="sm"
          />
        </Box>
      </Header>
      <main>
        {props.children}
      </main>
    </Container>
  )
}

export default Layout
