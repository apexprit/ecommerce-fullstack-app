import {
    Box,
    Container,
    Stack,
    Text,
    Heading,
    Button,
    Image,
    SimpleGrid,
    Card,
    CardBody,
    CardFooter,
    useBreakpointValue,
    Flex,
    Icon,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaArrowRight, FaChartLine, FaShieldAlt, FaHeadset } from 'react-icons/fa'

export default function Home() {
    const headingSize = useBreakpointValue({ base: '2xl', md: '4xl' })
    const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' })
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 })

    return (
        <Box>
            {/* Hero Section */}
            <Container maxW="container.xl">
                <Stack
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 28 }}
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={headingSize}
                        >
                            <Text as={'span'} color={'brand.500'}>
                                Enterprise-grade
                            </Text>
                            <br />
                            <Text as={'span'}>
                                B2B Services Platform
                            </Text>
                        </Heading>
                        <Text color={'gray.600'} fontSize={'lg'}>
                            Streamline your business operations with our comprehensive suite of services.
                            From software solutions to consulting, we provide the tools your enterprise needs to thrive.
                        </Text>
                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={{ base: 'column', sm: 'row' }}
                        >
                            <Button
                                rounded={'full'}
                                size={buttonSize}
                                fontWeight={'normal'}
                                px={6}
                                colorScheme={'brand'}
                                as={RouterLink}
                                to="/products"
                                rightIcon={<FaArrowRight />}
                            >
                                Browse Services
                            </Button>
                            <Button
                                rounded={'full'}
                                size={buttonSize}
                                fontWeight={'normal'}
                                px={6}
                                variant="outline"
                                as={RouterLink}
                                to="/about"
                            >
                                Learn More
                            </Button>
                        </Stack>
                    </Stack>
                    <Flex
                        flex={1}
                        justify={'center'}
                        align={'center'}
                        position={'relative'}
                        w={'full'}
                    >
                        <Image
                            alt={'Hero Image'}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={'100%'}
                            src={'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                            borderRadius={'2xl'}
                            boxShadow={'2xl'}
                        />
                    </Flex>
                </Stack>
            </Container>

            {/* Features Section */}
            <Box bg={'gray.50'} py={16}>
                <Container maxW={'container.xl'}>
                    <Heading textAlign={'center'} mb={12}>
                        Why Choose Our Platform
                    </Heading>
                    <SimpleGrid columns={gridColumns} spacing={10}>
                        {features.map((feature) => (
                            <Card key={feature.title} variant="filled" _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}>
                                <CardBody>
                                    <Icon as={feature.icon} w={12} h={12} color="brand.500" mb={4} />
                                    <Heading size="md" mb={2}>{feature.title}</Heading>
                                    <Text>{feature.description}</Text>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Services Preview */}
            <Container maxW={'container.xl'} py={16}>
                <Heading mb={8}>Popular Services</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                    {services.map((service) => (
                        <Card key={service.id} overflow="hidden" variant="outline">
                            <Image
                                src={service.image}
                                alt={service.title}
                                height="200px"
                                objectFit="cover"
                            />
                            <CardBody>
                                <Heading size="md">{service.title}</Heading>
                                <Text mt={2} color="gray.600">{service.description}</Text>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    as={RouterLink}
                                    to={`/products/${service.id}`}
                                    variant="link"
                                    colorScheme="brand"
                                >
                                    View Details →
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>

            {/* CTA Section */}
            <Box bg={'brand.500'} color="white" py={16}>
                <Container maxW={'container.xl'} textAlign="center">
                    <Heading mb={4}>Ready to Transform Your Business?</Heading>
                    <Text fontSize="xl" mb={8} opacity={0.9}>
                        Join thousands of enterprises that trust our platform for their critical operations.
                    </Text>
                    <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} justify="center">
                        <Button
                            size="lg"
                            colorScheme="white"
                            variant="outline"
                            _hover={{ bg: 'white', color: 'brand.500' }}
                            as={RouterLink}
                            to="/register"
                        >
                            Start Free Trial
                        </Button>
                        <Button
                            size="lg"
                            colorScheme="white"
                            variant="solid"
                            bg="white"
                            color="brand.500"
                            _hover={{ bg: 'gray.100' }}
                            as={RouterLink}
                            to="/contact"
                        >
                            Schedule Demo
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}

const features = [
    {
        title: 'Scalable Solutions',
        description: 'Grow with confidence using our scalable infrastructure designed for enterprise workloads.',
        icon: FaChartLine,
    },
    {
        title: 'Enterprise Security',
        description: 'Bank-level security with encryption, access controls, and compliance certifications.',
        icon: FaShieldAlt,
    },
    {
        title: '24/7 Support',
        description: 'Dedicated support team available round the clock for mission-critical assistance.',
        icon: FaHeadset,
    },
]

const services = [
    {
        id: 1,
        title: 'ERP Implementation',
        description: 'Complete enterprise resource planning system setup and customization.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
        id: 2,
        title: 'Cloud Migration',
        description: 'Seamless transition of your infrastructure to secure cloud environments.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
        id: 3,
        title: 'Data Analytics',
        description: 'Advanced analytics and business intelligence dashboards.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
        id: 4,
        title: 'Cybersecurity Audit',
        description: 'Comprehensive security assessment and vulnerability testing.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
]