import {
    Box,
    Container,
    Heading,
    Text,
    Grid,
    GridItem,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    Card,
    CardBody,
    CardFooter,
    Stack,
    Divider,
    Alert,
    AlertIcon,
    Radio,
    RadioGroup,
    Flex,
    useToast,
    Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { orderService } from '../services/api'

const Checkout = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const { items, clearCart, calculateSummary } = useCartStore()
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('credit_card')

    // Form states
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
    })

    const summary = calculateSummary()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false)
            toast({
                title: 'Order placed successfully!',
                description: 'Your order has been confirmed. You will receive an email shortly.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            clearCart()
            navigate('/orders/success')
        }, 2000)
    }

    if (items.length === 0) {
        return (
            <Container maxW="container.xl" py={12}>
                <Box textAlign="center" py={10}>
                    <Heading size="lg" mb={4}>
                        Your cart is empty
                    </Heading>
                    <Text color="gray.600" mb={6}>
                        Add some products to your cart before checking out.
                    </Text>
                    <Button as="a" href="/products" colorScheme="brand" size="lg">
                        Browse Products
                    </Button>
                </Box>
            </Container>
        )
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Heading mb={2}>Checkout</Heading>
            <Text color="gray.600" mb={8}>
                Complete your purchase securely
            </Text>

            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
                {/* Left Column: Forms */}
                <GridItem>
                    <form onSubmit={handleSubmit}>
                        {/* Contact Information */}
                        <Card variant="outline" mb={6}>
                            <CardBody>
                                <Heading size="md" mb={4}>
                                    Contact Information
                                </Heading>
                                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                                    <FormControl isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="John"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Doe"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Email Address</FormLabel>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </FormControl>
                                </Grid>
                            </CardBody>
                        </Card>

                        {/* Shipping Address */}
                        <Card variant="outline" mb={6}>
                            <CardBody>
                                <Heading size="md" mb={4}>
                                    Shipping Address
                                </Heading>
                                <FormControl isRequired mb={4}>
                                    <FormLabel>Street Address</FormLabel>
                                    <Input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Main St"
                                    />
                                </FormControl>
                                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4}>
                                    <FormControl isRequired>
                                        <FormLabel>City</FormLabel>
                                        <Input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="New York"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>State</FormLabel>
                                        <Input
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder="NY"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>ZIP Code</FormLabel>
                                        <Input
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="10001"
                                        />
                                    </FormControl>
                                </Grid>
                                <FormControl isRequired mt={4}>
                                    <FormLabel>Country</FormLabel>
                                    <Select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                    >
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="AU">Australia</option>
                                        <option value="IN">India</option>
                                    </Select>
                                </FormControl>
                            </CardBody>
                        </Card>

                        {/* Payment Method */}
                        <Card variant="outline" mb={6}>
                            <CardBody>
                                <Heading size="md" mb={4}>
                                    Payment Method
                                </Heading>
                                <RadioGroup
                                    value={paymentMethod}
                                    onChange={setPaymentMethod}
                                    mb={6}
                                >
                                    <Stack direction="column" spacing={4}>
                                        <Radio value="credit_card">Credit / Debit Card</Radio>
                                        <Radio value="paypal">PayPal</Radio>
                                        <Radio value="apple_pay">Apple Pay</Radio>
                                        <Radio value="bank_transfer">Bank Transfer</Radio>
                                    </Stack>
                                </RadioGroup>

                                {paymentMethod === 'credit_card' && (
                                    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                                        <FormControl isRequired>
                                            <FormLabel>Card Number</FormLabel>
                                            <Input
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Expiry Date</FormLabel>
                                            <Input
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>CVC</FormLabel>
                                            <Input
                                                name="cardCvc"
                                                value={formData.cardCvc}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                            />
                                        </FormControl>
                                    </Grid>
                                )}

                                {paymentMethod === 'paypal' && (
                                    <Alert status="info">
                                        <AlertIcon />
                                        You will be redirected to PayPal to complete your payment.
                                    </Alert>
                                )}
                            </CardBody>
                        </Card>

                        <Flex justify="space-between">
                            <Button
                                variant="outline"
                                colorScheme="brand"
                                onClick={() => navigate('/cart')}
                            >
                                ← Back to Cart
                            </Button>
                            <Button
                                type="submit"
                                colorScheme="brand"
                                size="lg"
                                isLoading={isProcessing}
                                loadingText="Processing..."
                            >
                                Place Order
                            </Button>
                        </Flex>
                    </form>
                </GridItem>

                {/* Right Column: Order Summary */}
                <GridItem>
                    <Card variant="outline" position="sticky" top="24">
                        <CardBody>
                            <Heading size="md" mb={4}>
                                Order Summary
                            </Heading>

                            {/* Order Items */}
                            <Stack spacing={3} mb={4}>
                                {items.slice(0, 3).map((item) => (
                                    <Flex key={item.product._id} justify="space-between">
                                        <Box>
                                            <Text fontWeight="medium">{item.product.name}</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                                            </Text>
                                        </Box>
                                        <Text fontWeight="bold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Text>
                                    </Flex>
                                ))}
                                {items.length > 3 && (
                                    <Text color="gray.600" fontSize="sm">
                                        + {items.length - 3} more items
                                    </Text>
                                )}
                            </Stack>

                            <Divider mb={4} />

                            {/* Price Breakdown */}
                            <Stack spacing={3}>
                                <Flex justify="space-between">
                                    <Text>Subtotal</Text>
                                    <Text fontWeight="medium">${summary.subtotal.toFixed(2)}</Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text>Shipping</Text>
                                    <Text fontWeight="medium">
                                        {summary.shipping === 0 ? 'FREE' : `$${summary.shipping.toFixed(2)}`}
                                    </Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text>Tax (10%)</Text>
                                    <Text fontWeight="medium">${summary.tax.toFixed(2)}</Text>
                                </Flex>
                                <Divider />
                                <Flex justify="space-between" fontSize="lg">
                                    <Text fontWeight="bold">Total</Text>
                                    <Text fontWeight="bold" color="brand.600">
                                        ${summary.total.toFixed(2)}
                                    </Text>
                                </Flex>
                            </Stack>
                        </CardBody>

                        <CardFooter>
                            <Alert status="info" fontSize="sm">
                                <AlertIcon />
                                Your personal data will be used to process your order and support your experience.
                            </Alert>
                        </CardFooter>
                    </Card>

                    {/* Security Badges */}
                    <Card variant="outline" mt={4}>
                        <CardBody>
                            <Heading size="sm" mb={3}>
                                Secure Checkout
                            </Heading>
                            <Text fontSize="sm" color="gray.600" mb={3}>
                                <Flex align="center" gap={2}>
                                    <Box w={3} h={3} borderRadius="full" bg="green.500" />
                                    All transactions are secure and encrypted
                                </Flex>
                                <Flex align="center" gap={2} mt={2}>
                                    <Box w={3} h={3} borderRadius="full" bg="green.500" />
                                    We never store your credit card details
                                </Flex>
                            </Text>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Checkout