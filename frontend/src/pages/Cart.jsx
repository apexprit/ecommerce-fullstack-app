import {
    Box,
    Container,
    Heading,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Stack,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Alert,
    AlertIcon,
    useBreakpointValue,
    IconButton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { DeleteIcon, AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useState } from 'react'

const Cart = () => {
    const {
        items,
        itemCount,
        total,
        removeItem,
        updateQuantity,
        clearCart,
        calculateSummary,
    } = useCartStore()

    const [couponCode, setCouponCode] = useState('')
    const [couponApplied, setCouponApplied] = useState(false)

    const isMobile = useBreakpointValue({ base: true, md: false })
    const summary = calculateSummary()

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return
        updateQuantity(productId, newQuantity)
    }

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === 'SAVE10') {
            setCouponApplied(true)
            // In a real app, you would apply discount to summary
        } else {
            setCouponApplied(false)
            // Show error
        }
    }

    const handleRemoveItem = (productId) => {
        removeItem(productId)
    }

    if (items.length === 0) {
        return (
            <Container maxW="container.xl" py={12}>
                <Box textAlign="center" py={10}>
                    <Heading size="lg" mb={4}>
                        Your cart is empty
                    </Heading>
                    <Text color="gray.600" mb={6}>
                        Add some products to your cart and they will appear here.
                    </Text>
                    <Button as={RouterLink} to="/products" colorScheme="brand" size="lg">
                        Browse Products
                    </Button>
                </Box>
            </Container>
        )
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Heading mb={2}>Shopping Cart</Heading>
            <Text color="gray.600" mb={8}>
                You have {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
            </Text>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
                {/* Cart Items */}
                <Box flex={2}>
                    {isMobile ? (
                        <Stack spacing={6}>
                            {items.map((item) => (
                                <Card key={item.product._id} variant="outline">
                                    <CardBody>
                                        <Flex gap={4}>
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                width="100px"
                                                height="100px"
                                                objectFit="cover"
                                                borderRadius="md"
                                            />
                                            <Box flex={1}>
                                                <Heading size="sm" mb={1}>
                                                    {item.product.name}
                                                </Heading>
                                                <Text color="gray.600" fontSize="sm" mb={2}>
                                                    {item.product.category}
                                                </Text>
                                                <Text fontWeight="bold" color="brand.600">
                                                    ${item.price.toFixed(2)}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </CardBody>
                                    <CardFooter pt={0}>
                                        <Flex justify="space-between" align="center" width="full">
                                            <NumberInput
                                                size="sm"
                                                maxW={24}
                                                value={item.quantity}
                                                min={1}
                                                onChange={(value) =>
                                                    handleQuantityChange(item.product._id, parseInt(value))
                                                }
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                            <Text fontWeight="bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Text>
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                size="sm"
                                                colorScheme="red"
                                                variant="ghost"
                                                onClick={() => handleRemoveItem(item.product._id)}
                                                aria-label="Remove item"
                                            />
                                        </Flex>
                                    </CardFooter>
                                </Card>
                            ))}
                        </Stack>
                    ) : (
                        <Box overflowX="auto">
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Product</Th>
                                        <Th>Price</Th>
                                        <Th>Quantity</Th>
                                        <Th>Total</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {items.map((item) => (
                                        <Tr key={item.product._id}>
                                            <Td>
                                                <Flex align="center" gap={4}>
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        width="80px"
                                                        height="80px"
                                                        objectFit="cover"
                                                        borderRadius="md"
                                                    />
                                                    <Box>
                                                        <Heading size="sm">{item.product.name}</Heading>
                                                        <Text color="gray.600" fontSize="sm">
                                                            {item.product.category}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            </Td>
                                            <Td fontWeight="bold">${item.price.toFixed(2)}</Td>
                                            <Td>
                                                <NumberInput
                                                    size="sm"
                                                    maxW={24}
                                                    value={item.quantity}
                                                    min={1}
                                                    onChange={(value) =>
                                                        handleQuantityChange(item.product._id, parseInt(value))
                                                    }
                                                >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                            <Td fontWeight="bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Td>
                                            <Td>
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    size="sm"
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    onClick={() => handleRemoveItem(item.product._id)}
                                                    aria-label="Remove item"
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    )}

                    <Flex justify="space-between" mt={8}>
                        <Button
                            as={RouterLink}
                            to="/products"
                            variant="outline"
                            colorScheme="brand"
                        >
                            Continue Shopping
                        </Button>
                        <Button
                            variant="outline"
                            colorScheme="red"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </Button>
                    </Flex>
                </Box>

                {/* Order Summary */}
                <Box flex={1}>
                    <Card variant="outline">
                        <CardBody>
                            <Heading size="md" mb={4}>
                                Order Summary
                            </Heading>

                            <Stack spacing={4}>
                                <Flex justify="space-between">
                                    <Text>Subtotal</Text>
                                    <Text fontWeight="bold">${summary.subtotal.toFixed(2)}</Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text>Shipping</Text>
                                    <Text fontWeight="bold">
                                        {summary.shipping === 0 ? 'FREE' : `$${summary.shipping.toFixed(2)}`}
                                    </Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text>Tax (10%)</Text>
                                    <Text fontWeight="bold">${summary.tax.toFixed(2)}</Text>
                                </Flex>

                                {couponApplied && (
                                    <Flex justify="space-between" color="green.600">
                                        <Text>Coupon Discount (10%)</Text>
                                        <Text fontWeight="bold">-${(summary.subtotal * 0.1).toFixed(2)}</Text>
                                    </Flex>
                                )}

                                <Divider />

                                <Flex justify="space-between" fontSize="lg">
                                    <Text fontWeight="bold">Total</Text>
                                    <Text fontWeight="bold" color="brand.600">
                                        ${couponApplied
                                            ? (summary.total - summary.subtotal * 0.1).toFixed(2)
                                            : summary.total.toFixed(2)}
                                    </Text>
                                </Flex>
                            </Stack>

                            {/* Coupon Code */}
                            <Box mt={6}>
                                <Text fontWeight="medium" mb={2}>
                                    Coupon Code
                                </Text>
                                <InputGroup>
                                    <Input
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleApplyCoupon}
                                            colorScheme="brand"
                                        >
                                            Apply
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {couponCode && !couponApplied && (
                                    <Text fontSize="sm" color="red.500" mt={2}>
                                        Invalid coupon code. Try "SAVE10"
                                    </Text>
                                )}
                                {couponApplied && (
                                    <Alert status="success" mt={2} size="sm">
                                        <AlertIcon />
                                        Coupon applied successfully!
                                    </Alert>
                                )}
                            </Box>
                        </CardBody>

                        <CardFooter>
                            <Button
                                as={RouterLink}
                                to="/checkout"
                                colorScheme="brand"
                                size="lg"
                                width="full"
                            >
                                Proceed to Checkout
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Additional Info */}
                    <Card variant="outline" mt={4}>
                        <CardBody>
                            <Heading size="sm" mb={2}>
                                Secure Checkout
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                                Your payment information is encrypted and secure. We never store your credit card details.
                            </Text>
                        </CardBody>
                    </Card>
                </Box>
            </Flex>
        </Container>
    )
}

export default Cart