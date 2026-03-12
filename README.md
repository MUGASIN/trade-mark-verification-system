
4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Trademarks
- POST /api/trademarks - Submit new trademark
- GET /api/trademarks/my-trademarks - Get user's trademarks
- GET /api/trademarks/all - Get all trademarks (admin only)
- PATCH /api/trademarks/:id/status - Update trademark status (admin only)

