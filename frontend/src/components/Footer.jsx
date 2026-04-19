import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    SimpleGrid,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.900', 'gray.900')}
            color={useColorModeValue('gray.200', 'gray.200')}
            mt="auto"
        >
            <Container as={Stack} maxW={'container.xl'} py={10}>
                <SimpleGrid
                    templateColumns={{ base: '1fr', sm: '2fr 1fr 1fr 1fr' }}
                    spacing={8}
                >
                    <Stack spacing={6}>
                        <Box>
                            <Heading size="md" color="white">B2B Services</Heading>
                        </Box>
                        <Text fontSize={'sm'}>
                            Empowering enterprises with cutting-edge solutions.
                            Trusted by Fortune 500 companies worldwide.
                        </Text>
                        <Stack direction={'row'} spacing={6}>
                            <Link href="#" aria-label="Facebook">
                                <FaFacebook size={20} />
                            </Link>
                            <Link href="#" aria-label="Twitter">
                                <FaTwitter size={20} />
                            </Link>
                            <Link href="#" aria-label="LinkedIn">
                                <FaLinkedin size={20} />
                            </Link>
                            <Link href="#" aria-label="Instagram">
                                <FaInstagram size={20} />
                            </Link>
                        </Stack>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Heading size="sm" color="white" mb={2}>Products</Heading>
                        <Link as={RouterLink} to="/products?category=software">Software</Link>
                        <Link as={RouterLink} to="/products?category=consulting">Consulting</Link>
                        <Link as={RouterLink} to="/products?category=training">Training</Link>
                        <Link as={RouterLink} to="/products?category=support">Support</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Heading size="sm" color="white" mb={2}>Company</Heading>
                        <Link as={RouterLink} to="/about">About Us</Link>
                        <Link as={RouterLink} to="/careers">Careers</Link>
                        <Link as={RouterLink} to="/contact">Contact</Link>
                        <Link as={RouterLink} to="/press">Press</Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Heading size="sm" color="white" mb={2}>Legal</Heading>
                        <Link as={RouterLink} to="/privacy">Privacy Policy</Link>
                        <Link as={RouterLink} to="/terms">Terms of Service</Link>
                        <Link as={RouterLink} to="/cookies">Cookie Policy</Link>
                        <Link as={RouterLink} to="/security">Security</Link>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.700', 'gray.700')}
            >
                <Container
                    as={Stack}
                    maxW={'container.xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}
                >
                    <Text fontSize="sm">
                        © {new Date().getFullYear()} B2B Services Platform. All rights reserved.
                    </Text>
                    <Stack direction={'row'} spacing={6} fontSize="sm">
                        <Text>ISO 27001 Certified</Text>
                        <Text>GDPR Compliant</Text>
                        <Text>SOC 2 Type II</Text>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}