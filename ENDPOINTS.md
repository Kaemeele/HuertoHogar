## API Endpoints

| Method | URL | Description | Success Codes | Error Codes |
|--------|-----|-------------|---------------|------------|
| GET | `/api/products` | Retrieve all products | 200 | 500 |
| GET | `/api/products/{id}` | Retrieve a single product by ID | 200, 404 | 500 |
| POST | `/api/products` | Create a new product | 201 | 400, 409, 500 |
| PUT | `/api/products/{id}` | Update an existing product | 200 | 400, 404, 500 |
| DELETE | `/api/products/{id}` | Delete a product | 204 | 404, 500 |
| POST | `/api/auth/login` | Authenticate user and obtain JWT | 200 | 401, 403 |
| GET | `/api/orders` | List all orders (admin only) | 200 | 401, 403 |
| POST | `/api/orders` | Create a new order | 201 | 400, 401, 403 |
| GET | `/api/orders/{id}` | Get order details | 200, 404 | 401, 403 |
| PUT | `/api/orders/{id}` | Update order status | 200 | 400, 404, 401, 403 |
| DELETE | `/api/orders/{id}` | Cancel order | 204 | 404, 401, 403 |

*All endpoints are prefixed with `/api` and are served by the Spring Boot backend running on port **8080**. The frontend proxies these calls via the Nginx configuration.*