# B2B E-Commerce Platform

A modern, scalable e-commerce platform for B2B services built with React, Node.js, and MongoDB.

## Architecture Overview

This project follows a modern microservices-inspired architecture with clear separation of concerns:

```
├── frontend/          # React 18 + Vite + Chakra UI
├── backend/           # Node.js + Express + MongoDB
└── architecture.md    # Detailed architecture documentation
```

## Features

### Backend
- **RESTful API** with proper HTTP status codes
- **JWT Authentication** with social login (Google, Facebook)
- **MongoDB** with Mongoose ODM
- **Rate limiting** and security headers
- **Input validation** and error handling
- **Pagination**, filtering, and sorting
- **Order management** with status tracking

### Frontend
- **Responsive design** with mobile-first approach
- **Chakra UI** component library
- **React Query** for data fetching and caching
- **React Router** for navigation
- **State management** with Zustand (ready to implement)
- **Cart functionality** with local storage
- **API service layer** with interceptors

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- Chakra UI (component library)
- React Query (data fetching)
- React Router (navigation)
- Axios (HTTP client)

### Backend
- Node.js 20
- Express.js
- MongoDB with Mongoose
- Passport.js (authentication)
- JWT (JSON Web Tokens)
- Bcrypt (password hashing)

### Database
- MongoDB Atlas (cloud) or local MongoDB
- Collections: Users, Products, Orders

## Getting Started

### Prerequisites
- Node.js 18 or higher
- MongoDB 6.0 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**
   - Update `backend/.env` with your MongoDB connection string
   - Configure OAuth credentials for social login

### Running the Application

1. Start MongoDB (if using local):
   ```bash
   mongod
   ```

2. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```

3. Start frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: Available in `architecture.md`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/facebook` - Facebook OAuth
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products with pagination
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get categories
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/stats/summary` - Get order statistics

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  socialId: String,
  provider: ['local', 'google', 'facebook'],
  company: Object,
  role: ['customer', 'admin'],
  isActive: Boolean
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  images: Array,
  features: Array,
  isActive: Boolean,
  isFeatured: Boolean
}
```

### Order Model
```javascript
{
  orderNumber: String (unique),
  user: ObjectId (ref: User),
  items: Array of products,
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: ['pending', 'confirmed', 'processing', 'shipped', 'delivered'],
  shippingAddress: Object,
  payment: Object
}
```

## Responsive Design Approach

The frontend follows a mobile-first responsive design strategy:

1. **Breakpoints** (Chakra UI defaults):
   - Base: 0px (mobile)
   - Sm: 480px (large mobile)
   - Md: 768px (tablet)
   - Lg: 992px (desktop)
   - Xl: 1280px (large desktop)

2. **Component Patterns**:
   - Flexbox for layout
   - Grid for product listings
   - `useBreakpointValue` for conditional rendering
   - Responsive images with `srcset`

3. **Touch Optimization**:
   - Minimum 48x48px interactive elements
   - Adequate spacing for touch targets
   - Mobile-friendly navigation

## Deployment

### Backend Deployment
1. Set environment variables in production
2. Use PM2 or Docker for process management
3. Enable CORS for your domain
4. Use MongoDB Atlas for cloud database

### Frontend Deployment
1. Build with `npm run build`
2. Deploy to Vercel, Netlify, or any static host
3. Configure API proxy if needed

### Docker Deployment
```dockerfile
# Example Dockerfile for backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Project Structure Details

### Frontend Structure
```
frontend/
├── src/
│   ├── assets/        # Images, fonts, static files
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── styles/        # Global styles and theme
│   ├── App.jsx        # Main app component
│   └── index.jsx      # Entry point
├── public/            # Public assets
└── package.json
```

### Backend Structure
```
backend/
├── config/            # Configuration files
├── controllers/       # Business logic (auth, products, orders)
├── models/           # MongoDB schemas (User, Product, Order)
├── routes/           # API routes with validation middleware
├── middleware/       # Custom middleware (validation, error handling)
├── utils/            # Utility functions
├── server.js         # Entry point with MongoDB connection
└── package.json
```

**Controllers**: Implement CRUD operations for User, Product, and Order models with proper error handling.

**Validation**: Request validation using Joi schema validation for all incoming data (auth, products, orders).

**Database Connection**: MongoDB with retry logic and connection event handling.

**Error Handling**: Centralized error middleware with appropriate HTTP status codes.

## Performance Considerations

1. **Database Indexing**: Critical fields are indexed for performance
2. **API Pagination**: All list endpoints support pagination
3. **Caching**: React Query provides client-side caching
4. **Image Optimization**: Responsive images with multiple sizes
5. **Code Splitting**: Vite automatically splits code chunks

## Security Features

1. **Authentication**: JWT with refresh token pattern
2. **Authorization**: Role-based access control
3. **Input Validation**: Request validation middleware
4. **Rate Limiting**: Prevents brute force attacks
5. **Security Headers**: Helmet.js for HTTP headers
6. **Password Hashing**: Bcrypt with salt rounds

## Monitoring & Logging

1. **Error Tracking**: Centralized error handling
2. **Request Logging**: Morgan for HTTP request logging
3. **Performance Monitoring**: Ready for New Relic integration
4. **Health Checks**: `/health` endpoint for monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes with descriptive messages
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@example.com or create an issue in the repository.