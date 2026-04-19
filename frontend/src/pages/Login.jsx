import {
    Box,
    Container,
    Flex,
    Stack,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Link,
    Checkbox,
    Divider,
    useToast,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authService } from '../services/api'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    })
    const toast = useToast()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulate API call
            const response = await authService.login({
                email: formData.email,
                password: formData.password,
            })

            // Store token (in real app)
            localStorage.setItem('token', response.data.token)

            toast({
                title: 'Login successful',
                description: 'Welcome back!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            navigate('/dashboard')
        } catch (error) {
            toast({
                title: 'Login failed',
                description: error.response?.data?.message || 'Invalid credentials',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container maxW="container.sm" py={12}>
            <Flex align="center" justify="center" minH="80vh">
                <Box
                    w="full"
                    maxW="md"
                    p={8}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="gray.200"
                    boxShadow="lg"
                >
                    <Stack spacing={6}>
                        <Stack align="center">
                            <Heading size="lg">Sign in to your account</Heading>
                            <Text color="gray.600">
                                Welcome back! Please enter your details.
                            </Text>
                        </Stack>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        size="lg"
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size="lg">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="sm"
                                                onClick={() => setShowPassword(!showPassword)}
                                                variant="ghost"
                                            >
                                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <Flex justify="space-between" align="center">
                                    <Checkbox
                                        name="rememberMe"
                                        isChecked={formData.rememberMe}
                                        onChange={handleChange}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link
                                        as={RouterLink}
                                        to="/forgot-password"
                                        color="brand.500"
                                        fontWeight="medium"
                                    >
                                        Forgot password?
                                    </Link>
                                </Flex>

                                <Button
                                    type="submit"
                                    colorScheme="brand"
                                    size="lg"
                                    fontSize="md"
                                    isLoading={isLoading}
                                    loadingText="Signing in..."
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </form>

                        <Divider />

                        <Stack spacing={4}>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    toast({
                                        title: 'Google login',
                                        description: 'This would redirect to Google OAuth',
                                        status: 'info',
                                        duration: 3000,
                                    })
                                }}
                            >
                                Sign in with Google
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    toast({
                                        title: 'GitHub login',
                                        description: 'This would redirect to GitHub OAuth',
                                        status: 'info',
                                        duration: 3000,
                                    })
                                }}
                            >
                                Sign in with GitHub
                            </Button>
                        </Stack>

                        <Flex justify="center" gap={2}>
                            <Text color="gray.600">Don't have an account?</Text>
                            <Link
                                as={RouterLink}
                                to="/register"
                                color="brand.500"
                                fontWeight="semibold"
                            >
                                Sign up
                            </Link>
                        </Flex>
                    </Stack>
                </Box>
            </Flex>
        </Container>
    )
}

export default Login