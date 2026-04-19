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
    useToast,
    Alert,
    AlertIcon,
    Checkbox,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authService } from '../services/api'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
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

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if (!formData.acceptTerms) {
            toast({
                title: 'Please accept terms and conditions',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        setIsLoading(true)

        try {
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            }

            // Simulate API call
            const response = await authService.register(userData)

            toast({
                title: 'Account created successfully',
                description: 'Please check your email to verify your account.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            navigate('/login')
        } catch (error) {
            toast({
                title: 'Registration failed',
                description: error.response?.data?.message || 'Something went wrong',
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
                            <Heading size="lg">Create your account</Heading>
                            <Text color="gray.600">
                                Start your journey with us today.
                            </Text>
                        </Stack>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <Flex direction={{ base: 'column', sm: 'row' }} gap={4}>
                                    <FormControl isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            size="lg"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            size="lg"
                                        />
                                    </FormControl>
                                </Flex>

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
                                    <Text fontSize="sm" color="gray.500" mt={1}>
                                        Must be at least 8 characters with letters and numbers.
                                    </Text>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <InputGroup size="lg">
                                        <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="sm"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                variant="ghost"
                                            >
                                                {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl isRequired>
                                    <Checkbox
                                        name="acceptTerms"
                                        isChecked={formData.acceptTerms}
                                        onChange={handleChange}
                                    >
                                        I agree to the{' '}
                                        <Link color="brand.500" href="/terms" isExternal>
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link color="brand.500" href="/privacy" isExternal>
                                            Privacy Policy
                                        </Link>
                                    </Checkbox>
                                </FormControl>

                                <Button
                                    type="submit"
                                    colorScheme="brand"
                                    size="lg"
                                    fontSize="md"
                                    isLoading={isLoading}
                                    loadingText="Creating account..."
                                >
                                    Create Account
                                </Button>
                            </Stack>
                        </form>

                        <Flex justify="center" gap={2}>
                            <Text color="gray.600">Already have an account?</Text>
                            <Link
                                as={RouterLink}
                                to="/login"
                                color="brand.500"
                                fontWeight="semibold"
                            >
                                Sign in
                            </Link>
                        </Flex>

                        <Alert status="info" fontSize="sm">
                            <AlertIcon />
                            By creating an account, you agree to receive occasional product updates and marketing emails.
                            You can unsubscribe at any time.
                        </Alert>
                    </Stack>
                </Box>
            </Flex>
        </Container>
    )
}

export default Register