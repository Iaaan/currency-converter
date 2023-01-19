import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useBoundStore } from '@/stores'

import { Avatar, Box, Button, Center, Container, Heading } from '@chakra-ui/react'
import { Header, Main } from './Layout.css'

export interface LayoutProps {
  children: ReactNode,
}

const Layout = (props: LayoutProps) => {
  const router = useRouter()
  const username = useBoundStore(state => state.username)
  const logout = useBoundStore(state => state.logout)

  useEffect(() => {
    if (!username && router.pathname !== '/login') {
      router.push('/login')
    }
  }, [username, router])

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
      <Main>
        {props.children}
      </Main>
    </Container>
  )
}

export default Layout
