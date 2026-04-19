import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Button,
    Stack,
    Checkbox,
    CheckboxGroup,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Card,
    CardBody,
    CardFooter,
    Image,
    Badge,
    Flex,
    Spinner,
    Alert,
    AlertIcon,
    useBreakpointValue,
    SimpleGrid,
} from '@chakra-ui/react'
import { SearchIcon, StarIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { productService } from '../services/api'
import { Link as RouterLink } from 'react-router-dom'

const Products = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [sortBy, setSortBy] = useState('featured')

    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 })

    // Fetch products
    const {
        data: products = [],
        isLoading,
        error,
        refetch,
    } = useQuery(
        ['products', { search, category, priceRange, sortBy }],
        () =>
            productService.getAll({
                search,
                category: category || undefined,
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                sort: sortBy,
            }),
        {
            keepPreviousData: true,
        }
    )

    // Fetch categories
    const { data: categories = [] } = useQuery('categories', () =>
        productService.getCategories()
    )

    // Handle filter changes
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handlePriceChange = (value) => {
        setPriceRange(value)
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value)
    }

    const handleClearFilters = () => {
        setSearch('')
        setCategory('')
        setPriceRange([0, 1000])
        setSelectedCategories([])
        setSortBy('featured')
    }

    // Mock data for demo if API fails
    const mockProducts = [
        {
            _id: '1',
            name: 'Premium Laptop',
            description: 'High-performance laptop with 16GB RAM',
            price: 1299.99,
            discountedPrice: 1199.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.5,
            stock: 15,
        },
        {
            _id: '2',
            name: 'Wireless Headphones',
            description: 'Noise-cancelling over-ear headphones',
            price: 199.99,
            discountedPrice: 179.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.2,
            stock: 30,
        },
        {
            _id: '3',
            name: 'Smart Watch',
            description: 'Fitness tracker with heart rate monitor',
            price: 299.99,
            discountedPrice: 249.99,
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.7,
            stock: 10,
        },
        {
            _id: '4',
            name: 'Desk Chair',
            description: 'Ergonomic office chair with lumbar support',
            price: 399.99,
            discountedPrice: 349.99,
            category: 'Furniture',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.3,
            stock: 8,
        },
        {
            _id: '5',
            name: 'Coffee Maker',
            description: 'Programmable coffee machine with grinder',
            price: 149.99,
            discountedPrice: 129.99,
            category: 'Home Appliances',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.0,
            stock: 25,
        },
        {
            _id: '6',
            name: 'Yoga Mat',
            description: 'Non-slip eco-friendly yoga mat',
            price: 34.99,
            discountedPrice: 29.99,
            category: 'Fitness',
            image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.8,
            stock: 50,
        },
    ]

    const displayProducts = products.length > 0 ? products : mockProducts

    return (
        <Container maxW="container.xl" py={8}>
            <Heading mb={2}>Our Products</Heading>
            <Text color="gray.600" mb={8}>
                Discover amazing products at great prices
            </Text>

            <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8}>
                {/* Filters Sidebar */}
                <GridItem>
                    <Box
                        p={6}
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="gray.200"
                        position="sticky"
                        top="24"
                    >
                        <Heading size="md" mb={4}>
                            Filters
                        </Heading>

                        {/* Search */}
                        <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>
                                Search
                            </Text>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <SearchIcon color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </InputGroup>
                        </Box>

                        {/* Categories */}
                        <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>
                                Category
                            </Text>
                            <Select
                                placeholder="All categories"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                {categories.map((cat) => (
                                    <option key={cat._id || cat} value={cat._id || cat}>
                                        {cat.name || cat}
                                    </option>
                                ))}
                            </Select>
                        </Box>

                        {/* Price Range */}
                        <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>
                                Price Range: ${priceRange[0]} - ${priceRange[1]}
                            </Text>
                            <RangeSlider
                                aria-label={['min', 'max']}
                                defaultValue={[0, 1000]}
                                min={0}
                                max={2000}
                                step={10}
                                value={priceRange}
                                onChange={handlePriceChange}
                            >
                                <RangeSliderTrack>
                                    <RangeSliderFilledTrack />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                                <RangeSliderThumb index={1} />
                            </RangeSlider>
                            <Flex justify="space-between" mt={2}>
                                <Text fontSize="sm">$0</Text>
                                <Text fontSize="sm">$2000</Text>
                            </Flex>
                        </Box>

                        {/* Sort */}
                        <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>
                                Sort By
                            </Text>
                            <Select value={sortBy} onChange={handleSortChange}>
                                <option value="featured">Featured</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="rating">Rating</option>
                                <option value="newest">Newest</option>
                            </Select>
                        </Box>

                        <Button
                            colorScheme="brand"
                            variant="outline"
                            width="full"
                            onClick={handleClearFilters}
                        >
                            Clear Filters
                        </Button>
                    </Box>
                </GridItem>

                {/* Products Grid */}
                <GridItem>
                    {isLoading ? (
                        <Flex justify="center" align="center" h="300px">
                            <Spinner size="xl" color="brand.500" />
                        </Flex>
                    ) : error ? (
                        <Alert status="error" mb={4}>
                            <AlertIcon />
                            Failed to load products. Showing demo data.
                        </Alert>
                    ) : null}

                    <SimpleGrid columns={gridColumns} spacing={6}>
                        {displayProducts.map((product) => (
                            <Card
                                key={product._id}
                                overflow="hidden"
                                variant="outline"
                                _hover={{
                                    transform: 'translateY(-4px)',
                                    boxShadow: 'lg',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <Box position="relative">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        height="200px"
                                        width="100%"
                                        objectFit="cover"
                                    />
                                    {product.discountedPrice && (
                                        <Badge
                                            position="absolute"
                                            top={2}
                                            right={2}
                                            colorScheme="green"
                                            borderRadius="full"
                                            px={2}
                                        >
                                            Save ${(product.price - product.discountedPrice).toFixed(2)}
                                        </Badge>
                                    )}
                                    {product.stock < 10 && (
                                        <Badge
                                            position="absolute"
                                            top={2}
                                            left={2}
                                            colorScheme="red"
                                            borderRadius="full"
                                            px={2}
                                        >
                                            Low Stock
                                        </Badge>
                                    )}
                                </Box>

                                <CardBody>
                                    <Stack spacing={2}>
                                        <Flex justify="space-between" align="start">
                                            <Heading size="md">{product.name}</Heading>
                                            <Badge colorScheme="brand">
                                                {product.category}
                                            </Badge>
                                        </Flex>
                                        <Text color="gray.600" fontSize="sm" noOfLines={2}>
                                            {product.description}
                                        </Text>
                                        <Flex align="center">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    color={
                                                        i < Math.floor(product.rating)
                                                            ? 'yellow.400'
                                                            : 'gray.300'
                                                    }
                                                />
                                            ))}
                                            <Text ml={2} fontSize="sm">
                                                ({product.rating})
                                            </Text>
                                        </Flex>
                                        <Flex align="center" justify="space-between">
                                            <Box>
                                                {product.discountedPrice ? (
                                                    <>
                                                        <Text
                                                            as="span"
                                                            fontSize="xl"
                                                            fontWeight="bold"
                                                            color="brand.600"
                                                        >
                                                            ${product.discountedPrice.toFixed(2)}
                                                        </Text>
                                                        <Text
                                                            as="span"
                                                            ml={2}
                                                            fontSize="sm"
                                                            color="gray.500"
                                                            textDecoration="line-through"
                                                        >
                                                            ${product.price.toFixed(2)}
                                                        </Text>
                                                    </>
                                                ) : (
                                                    <Text
                                                        fontSize="xl"
                                                        fontWeight="bold"
                                                        color="brand.600"
                                                    >
                                                        ${product.price.toFixed(2)}
                                                    </Text>
                                                )}
                                            </Box>
                                            <Text fontSize="sm" color="gray.500">
                                                {product.stock} in stock
                                            </Text>
                                        </Flex>
                                    </Stack>
                                </CardBody>

                                <CardFooter pt={0}>
                                    <Button
                                        as={RouterLink}
                                        to={`/products/${product._id}`}
                                        colorScheme="brand"
                                        size="md"
                                        width="full"
                                    >
                                        View Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </SimpleGrid>

                    {displayProducts.length === 0 && !isLoading && (
                        <Box textAlign="center" py={10}>
                            <Heading size="md" mb={2}>
                                No products found
                            </Heading>
                            <Text color="gray.600">
                                Try adjusting your filters or search term
                            </Text>
                        </Box>
                    )}
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Products