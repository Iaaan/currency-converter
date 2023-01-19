import { useState } from 'react'
import { Button, Center, Input, VStack  } from '@chakra-ui/react'
import { useBoundStore } from '@/stores'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useBoundStore(state => state.login)

  const handleLogin = async () => {
    await login({ username })
  }

  return (
    <Center height="50vh">
      <VStack width="30rem">
        <Input
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          isDisabled={username === '' || password === ''}
          onClick={handleLogin}
          w="100%"
        >
          Login
        </Button>
      </VStack>
    </Center>
  )
}
