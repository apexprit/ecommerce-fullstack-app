import {
    Box,
    Container,
    Heading,
    Text,
    Grid,
    GridItem,
    Card,
    CardBody,
    CardHeader,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Flex,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Avatar,
    Progress,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react'
import {
    FaShoppingCart,
    FaDollarSign,
    FaUsers,
    FaChartLine,
    FaBoxOpen,
    FaClock,
} from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

const Dashboard = () => {
    const cardBg = useColorModeValue('white', 'gray.800')

    // Mock data
    const stats = [
        {
            label: 'Total Revenue',
            value: '$24,580',
            change: '+12.5%',
            icon: FaDollarSign,
            color: 'green.500',
        },
        {
            label: 'Orders',
            value: '1,248',
            change: '+8.2%',
            icon: FaShoppingCart,
            color: 'blue.500',
        },
        {
            label: 'Customers',
            value: '5,342',
            change: '+3.7%',
            icon: FaUsers,
            color: 'purple.500',
        },
        {
            label: 'Products',
            value: '342',
            change: '-1.2%',
            icon: FaBoxOpen,
            color: 'orange.500',
        },
    ]

    const recentOrders = [
        { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', amount: '$249.99', status: 'Delivered' },
        { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-14', amount: '$149.99', status: 'Processing' },
        { id: 'ORD-003', customer: 'Robert Johnson', date: '2024-01-13', amount: '$899.99', status: 'Shipped' },
        { id: 'ORD-004', customer: 'Emily Davis', date: '2024-01-12', amount: '$49.99', status: 'Pending' },
        { id: 'ORD-005', customer: 'Michael Brown', date: '2024-01-11', amount: '$199.99', status: 'Delivered' },
    ]

    const topProducts = [
        { name: 'Premium Laptop', sales: 142, revenue: '$170,400' },
        { name: 'Wireless Headphones', sales: 89, revenue: '$16,020' },
        { name: 'Smart Watch', sales: 67, revenue: '$16,750' },
        { name: 'Desk Chair', sales: 45, revenue: '$15,750' },
        { name: 'Coffee Maker', sales: 38, revenue: '$4,940' },
    ]

    return (
        <Container maxW="container.xl" py={8}>
            <Flex justify="space-between" align="center" mb={8}>
                <Box>
                    <Heading size="lg">Dashboard</Heading>
                    <Text color="gray.600">Welcome back! Here's what's happening today.</Text>
                </Box>
                <Button colorScheme="brand" leftIcon={<FaChartLine />}>
                    Generate Report
                </Button>
            </Flex>

            {/* Stats Cards */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mb={8}>
                {stats.map((stat, idx) => (
                    <GridItem key={idx}>
                        <Card bg={cardBg} variant="outline">
                            <CardBody>
                                <Flex justify="space-between" align="center">
                                    <Box>
                                        <Stat>
                                            <StatLabel color="gray.600">{stat.label}</StatLabel>
                                            <StatNumber fontSize="2xl">{stat.value}</StatNumber>
                                            <StatHelpText>
                                                <StatArrow type={stat.change.startsWith('+') ? 'increase' : 'decrease'} />
                                                {stat.change}
                                            </StatHelpText>
                                        </Stat>
                                    </Box>
                                    <Icon as={stat.icon} boxSize={10} color={stat.color} />
                                </Flex>
                            </CardBody>
                        </Card>
                    </GridItem>
                ))}
            </Grid>

            <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
                {/* Recent Orders */}
                <GridItem>
                    <Card variant="outline">
                        <CardHeader>
                            <Heading size="md">Recent Orders</Heading>
                        </CardHeader>
                        <CardBody>
                            <Box overflowX="auto">
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Order ID</Th>
                                            <Th>Customer</Th>
                                            <Th>Date</Th>
                                            <Th>Amount</Th>
                                            <Th>Status</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {recentOrders.map((order) => (
                                            <Tr key={order.id}>
                                                <Td fontWeight="medium">{order.id}</Td>
                                                <Td>{order.customer}</Td>
                                                <Td>{order.date}</Td>
                                                <Td fontWeight="bold">{order.amount}</Td>
                                                <Td>
                                                    <Badge
                                                        colorScheme={
                                                            order.status === 'Delivered'
                                                                ? 'green'
                                                                : order.status === 'Shipped'
                                                                    ? 'blue'
                                                                    : order.status === 'Processing'
                                                                        ? 'orange'
                                                                        : 'gray'
                                                        }
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                            <Button variant="link" colorScheme="brand" mt={4} as={RouterLink} to="/orders">
                                View all orders →
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>

                {/* Top Products */}
                <GridItem>
                    <Card variant="outline">
                        <CardHeader>
                            <Heading size="md">Top Products</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack spacing={4}>
                                {topProducts.map((product, idx) => (
                                    <Flex key={idx} justify="space-between" align="center">
                                        <Box>
                                            <Text fontWeight="medium">{product.name}</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                {product.sales} sales
                                            </Text>
                                        </Box>
                                        <Text fontWeight="bold">{product.revenue}</Text>
                                    </Flex>
                                ))}
                            </Stack>
                            <Button variant="link" colorScheme="brand" mt={4} as={RouterLink} to="/products">
                                View all products →
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>

            {/* Activity & Progress */}
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8} mt={8}>
                <GridItem>
                    <Card variant="outline">
                        <CardHeader>
                            <Heading size="md">Monthly Sales Goal</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack spacing={4}>
                                <Flex justify="space-between">
                                    <Text fontWeight="medium">Target: $50,000</Text>
                                    <Text fontWeight="bold">$32,450 (65%)</Text>
                                </Flex>
                                <Progress value={65} size="lg" colorScheme="brand" borderRadius="full" />
                                <Text fontSize="sm" color="gray.600">
                                    <Icon as={FaClock} mr={2} />
                                    15 days remaining to reach goal
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem>
                    <Card variant="outline">
                        <CardHeader>
                            <Heading size="md">Recent Customers</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack spacing={4}>
                                {['John Doe', 'Jane Smith', 'Alex Johnson', 'Sam Wilson'].map((name, idx) => (
                                    <Flex key={idx} align="center" gap={3}>
                                        <Avatar name={name} size="sm" />
                                        <Box>
                                            <Text fontWeight="medium">{name}</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                Joined {10 - idx * 2} days ago
                                            </Text>
                                        </Box>
                                        <Button size="sm" ml="auto" variant="outline">
                                            View
                                        </Button>
                                    </Flex>
                                ))}
                            </Stack>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Dashboard