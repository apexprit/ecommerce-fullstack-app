import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Text,
    Image,
    Button,
    Badge,
    Stack,
    Flex,
    Divider,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useToast,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    List,
    ListItem,
    ListIcon,
    Alert,
    AlertIcon,
    Spinner,
    useBreakpointValue,
} from '@chakra-ui/react'
import { StarIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { productService } from '../services/api'
import { useCartStore } from '../store/cartStore'
import { useState } from 'react'

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const { addItem, isInCart, getItemQuantity } = useCartStore()
    const [quantity, setQuantity] = useState(1)

    const isMobile = useBreakpointValue({ base: true, md: false })

    // Fetch product details
    const {
        data: product,
        isLoading,
        error,
    } = useQuery(['product', id], () => productService.getById(id), {
        enabled: !!id,
    })

    // Mock product for demo
    const mockProduct = {
        _id: id,
        name: 'Premium Laptop',
        description:
            'High-performance laptop with 16GB RAM, 512GB SSD, and Intel Core i7 processor. Perfect for developers, designers, and professionals.',
        longDescription: `This premium laptop is designed for power users who need reliability and performance. It features a stunning 15.6" 4K display, backlit keyboard, and all-day battery life. Built with aerospace-grade aluminum for durability.`,
        price: 1299.99,
        discountedPrice: 1199.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        rating: 4.5,
        stock: 15,
        specifications: [
            'Processor: Intel Core i7-1165G7',
            'RAM: 16GB DDR4',
            'Storage: 512GB NVMe SSD',
            'Display: 15.6" 4K UHD',
            'Graphics: Intel Iris Xe',
            'Battery: Up to 10 hours',
            'Weight: 3.5 lbs',
            'OS: Windows 11 Pro',
        ],
        features: [
            'Backlit keyboard',
            'Fingerprint sensor',
            'Thunderbolt 4 ports',
            'Wi-Fi 6',
            'Bluetooth 5.2',
            'HD webcam with privacy shutter',
        ],
        reviews: [
            { user: 'Alex Johnson', rating: 5, comment: 'Excellent performance!', date: '2024-01-15' },
            { user: 'Sam Wilson', rating: 4, comment: 'Great battery life, but a bit heavy.', date: '2024-01-10' },
            { user: 'Taylor Swift', rating: 5, comment: 'Perfect for my design work.', date: '2024-01-05' },
        ],
    }

    const displayProduct = product || mockProduct
    const isProductInCart = isInCart(displayProduct._id)
    const cartQuantity = getItemQuantity(displayProduct._id)

    const handleAddToCart = () => {
        addItem(displayProduct, quantity)
        toast({
            title: 'Added to cart',
            description: `${quantity} × ${displayProduct.name} added to your cart.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    const handleBuyNow = () => {
        addItem(displayProduct, quantity)
        navigate('/cart')
    }

    if (isLoading) {
        return (
            <Container maxW="container.xl" py={20}>
                <Flex justify="center" align="center" minH="50vh">
                    <Spinner size="xl" color="brand.500" />
                </Flex>
            </Container>
        )
    }

    if (error && !mockProduct) {
        return (
            <Container maxW="container.xl" py={10}>
                <Alert status="error">
                    <AlertIcon />
                    Failed to load product details.
                </Alert>
                <Button mt={4} onClick={() => navigate('/products')}>
                    Back to Products
                </Button>
            </Container>
        )
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Button
                variant="link"
                colorScheme="brand"
                mb={6}
                onClick={() => navigate('/products')}
            >
                ← Back to Products
            </Button>

            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
                {/* Product Images */}
                <GridItem>
                    <Box
                        borderRadius="lg"
                        overflow="hidden"
                        borderWidth="1px"
                        borderColor="gray.200"
                        p={4}
                        bg="white"
                    >
                        <Image
                            src={displayProduct.image}
                            alt={displayProduct.name}
                            width="100%"
                            height="auto"
                            objectFit="contain"
                            maxH="500px"
                        />
                    </Box>
                    {isMobile && (
                        <Flex mt={4} gap={2} overflowX="auto" py={2}>
                            {[1, 2, 3].map((i) => (
                                <Image
                                    key={i}
                                    src={`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=${i}`}
                                    alt={`Product view ${i}`}
                                    width="80px"
                                    height="80px"
                                    objectFit="cover"
                                    borderRadius="md"
                                    borderWidth="1px"
                                />
                            ))}
                        </Flex>
                    )}
                </GridItem>

                {/* Product Info */}
                <GridItem>
                    <Stack spacing={4}>
                        <Flex justify="space-between" align="start">
                            <Box>
                                <Heading size="xl">{displayProduct.name}</Heading>
                                <Text color="gray.600" fontSize="lg">
                                    {displayProduct.category}
                                </Text>
                            </Box>
                            <Badge colorScheme="brand" fontSize="lg" px={3} py={1}>
                                {displayProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                        </Flex>

                        <Flex align="center">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    color={
                                        i < Math.floor(displayProduct.rating)
                                            ? 'yellow.400'
                                            : 'gray.300'
                                    }
                                    boxSize={5}
                                />
                            ))}
                            <Text ml={2} fontSize="lg" fontWeight="medium">
                                {displayProduct.rating} · {displayProduct.reviews?.length || 3} reviews
                            </Text>
                        </Flex>

                        <Divider />

                        {/* Pricing */}
                        <Box>
                            {displayProduct.discountedPrice ? (
                                <Flex align="baseline" gap={3}>
                                    <Heading size="2xl" color="brand.600">
                                        ${displayProduct.discountedPrice.toFixed(2)}
                                    </Heading>
                                    <Text
                                        fontSize="xl"
                                        color="gray.500"
                                        textDecoration="line-through"
                                    >
                                        ${displayProduct.price.toFixed(2)}
                                    </Text>
                                    <Badge colorScheme="green" fontSize="md">
                                        Save ${(displayProduct.price - displayProduct.discountedPrice).toFixed(2)}
                                    </Badge>
                                </Flex>
                            ) : (
                                <Heading size="2xl" color="brand.600">
                                    ${displayProduct.price.toFixed(2)}
                                </Heading>
                            )}
                            <Text color="gray.600" mt={2}>
                                Tax included. Shipping calculated at checkout.
                            </Text>
                        </Box>

                        <Divider />

                        {/* Quantity & Add to Cart */}
                        <Box>
                            <Text fontWeight="medium" mb={2}>
                                Quantity
                            </Text>
                            <Flex gap={4} align="center">
                                <NumberInput
                                    size="lg"
                                    maxW={32}
                                    value={quantity}
                                    min={1}
                                    max={displayProduct.stock}
                                    onChange={(value) => setQuantity(parseInt(value) || 1)}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text color="gray.600">
                                    {displayProduct.stock} available
                                </Text>
                            </Flex>
                        </Box>

                        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mt={4}>
                            <Button
                                colorScheme="brand"
                                size="lg"
                                flex={1}
                                leftIcon={isProductInCart ? <CheckCircleIcon /> : undefined}
                                onClick={handleAddToCart}
                                isDisabled={displayProduct.stock === 0}
                            >
                                {isProductInCart
                                    ? `Already in Cart (${cartQuantity})`
                                    : 'Add to Cart'}
                            </Button>
                            <Button
                                colorScheme="green"
                                size="lg"
                                flex={1}
                                onClick={handleBuyNow}
                                isDisabled={displayProduct.stock === 0}
                            >
                                Buy Now
                            </Button>
                        </Stack>

                        {displayProduct.stock === 0 && (
                            <Alert status="warning">
                                <AlertIcon />
                                This product is currently out of stock.
                            </Alert>
                        )}

                        {/* Product Highlights */}
                        <Box mt={6}>
                            <List spacing={2}>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    Free shipping on orders over $100
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    30-day return policy
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckCircleIcon} color="green.500" />
                                    2-year manufacturer warranty
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>
                </GridItem>
            </Grid>

            {/* Tabs for Details, Specs, Reviews */}
            <Box mt={12}>
                <Tabs variant="enclosed" colorScheme="brand">
                    <TabList>
                        <Tab fontWeight="semibold">Description</Tab>
                        <Tab fontWeight="semibold">Specifications</Tab>
                        <Tab fontWeight="semibold">Reviews</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Stack spacing={4}>
                                <Heading size="md">Product Description</Heading>
                                <Text>{displayProduct.longDescription || displayProduct.description}</Text>
                                <Heading size="md" mt={4}>
                                    Key Features
                                </Heading>
                                <List spacing={2}>
                                    {(displayProduct.features || mockProduct.features).map((feature, idx) => (
                                        <ListItem key={idx}>
                                            <ListIcon as={CheckCircleIcon} color="brand.500" />
                                            {feature}
                                        </ListItem>
                                    ))}
                                </List>
                            </Stack>
                        </TabPanel>
                        <TabPanel>
                            <Heading size="md" mb={4}>
                                Technical Specifications
                            </Heading>
                            <List spacing={3}>
                                {(displayProduct.specifications || mockProduct.specifications).map((spec, idx) => (
                                    <ListItem key={idx} borderBottomWidth="1px" py={2}>
                                        <Flex justify="space-between">
                                            <Text fontWeight="medium">{spec.split(':')[0]}:</Text>
                                            <Text>{spec.split(':')[1]}</Text>
                                        </Flex>
                                    </ListItem>
                                ))}
                            </List>
                        </TabPanel>
                        <TabPanel>
                            <Heading size="md" mb={4}>
                                Customer Reviews
                            </Heading>
                            <Stack spacing={6}>
                                {(displayProduct.reviews || mockProduct.reviews).map((review, idx) => (
                                    <Box
                                        key={idx}
                                        p={4}
                                        borderWidth="1px"
                                        borderRadius="lg"
                                        borderColor="gray.200"
                                    >
                                        <Flex justify="space-between" mb={2}>
                                            <Text fontWeight="bold">{review.user}</Text>
                                            <Text color="gray.500">{review.date}</Text>
                                        </Flex>
                                        <Flex align="center" mb={2}>
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    color={i < review.rating ? 'yellow.400' : 'gray.300'}
                                                />
                                            ))}
                                        </Flex>
                                        <Text>{review.comment}</Text>
                                    </Box>
                                ))}
                                <Button variant="outline" colorScheme="brand">
                                    Write a Review
                                </Button>
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

            {/* Related Products (simplified) */}
            <Box mt={12}>
                <Heading size="lg" mb={6}>
                    You May Also Like
                </Heading>
                <Text color="gray.600">
                    Related products feature would be implemented here with actual API data.
                </Text>
            </Box>
        </Container>
    )
}

export default ProductDetail