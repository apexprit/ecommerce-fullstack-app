import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    Flex,
    Image,
    useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaHome, FaSearch, FaShoppingCart } from 'react-icons/fa'

const NotFound = () => {
    const bgColor = useColorModeValue('gray.50', 'gray.900')

    return (
        <Container maxW="container.xl" py={20}>
            <Flex
                direction="column"
                align="center"
                justify="center"
                textAlign="center"
                minH="70vh"
            >
                <Box mb={8}>
                    <Heading
                        size="4xl"
                        color="brand.500"
                        mb={4}
                        fontWeight="black"
                        lineHeight="1"
                    >
                        404
                    </Heading>
                    <Heading size="xl" mb={4}>
                        Page Not Found
                    </Heading>
                    <Text fontSize="lg" color="gray.600" maxW="md" mx="auto">
                        Oops! The page you're looking for seems to have wandered off into the digital void.
                        It might have been moved, deleted, or never existed.
                    </Text>
                </Box>

                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap={4}
                    mb={12}
                    maxW="sm"
                    w="full"
                >
                    <Button
                        as={RouterLink}
                        to="/"
                        leftIcon={<FaHome />}
                        colorScheme="brand"
                        size="lg"
                        flex={1}
                    >
                        Go Home
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/products"
                        leftIcon={<FaSearch />}
                        variant="outline"
                        colorScheme="brand"
                        size="lg"
                        flex={1}
                    >
                        Browse Products
                    </Button>
                </Flex>

                <Box
                    bg={bgColor}
                    p={8}
                    borderRadius="xl"
                    borderWidth="1px"
                    maxW="2xl"
                    w="full"
                >
                    <Heading size="md" mb={4}>
                        What could have happened?
                    </Heading>
                    <Text color="gray.600" mb={6}>
                        Here are a few possibilities:
                    </Text>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        gap={6}
                        textAlign="left"
                    >
                        <Box flex={1}>
                            <Heading size="sm" mb={2} color="brand.500">
                                Mistyped URL
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                                Double-check the web address for typos or errors.
                            </Text>
                        </Box>
                        <Box flex={1}>
                            <Heading size="sm" mb={2} color="brand.500">
                                Outdated Link
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                                The page may have been moved or deleted. Try navigating from the homepage.
                            </Text>
                        </Box>
                        <Box flex={1}>
                            <Heading size="sm" mb={2} color="brand.500">
                                Site Maintenance
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                                We might be performing updates. Check back in a few minutes.
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                <Text color="gray.500" fontSize="sm" mt={12}>
                    Need help?{' '}
                    <Button variant="link" colorScheme="brand" size="sm">
                        Contact our support team
                    </Button>
                </Text>
            </Flex>
        </Container>
    )
}

export default NotFound