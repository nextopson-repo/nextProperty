# NextProperty - Full Stack Property Management Application

A modern property management application built with React (Frontend) and Node.js (Backend).

## 🚀 Quick Start

### Prerequisites
- Node.js (>= 18.0.0)
- npm (>= 8.0.0)
- MongoDB (local or Atlas)

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the Backend directory
   - Update MongoDB URI and other configurations

### Running the Application

#### Option 1: Run Both Services Together (Recommended)
```bash
npm run dev
```

This will start:
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:5173

#### Option 2: Run Services Individually
```bash
# Backend only
npm run backend

# Frontend only
npm run frontend
```

## 📁 Project Structure

```
nextProperty/
├── Backend/           # Node.js API Server
│   ├── config/       # Database configuration
│   ├── controller/   # API controllers
│   ├── middleware/   # Custom middleware
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   └── index.js      # Server entry point
├── frontend/         # React Application
│   ├── src/          # React source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
└── package.json      # Root package.json (manages both services)
```

## 🔧 Available Scripts

### Root Level (Project Root)
- `npm run dev` - Start both Backend and Frontend
- `npm run backend` - Start Backend only
- `npm run frontend` - Start Frontend only
- `npm run install-all` - Install dependencies for all services
- `npm run build` - Build Frontend for production

### Backend Scripts
- `npm run start` - Start Backend server

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 API Endpoints

### Base URL: http://localhost:8000/api

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

#### Properties
- `GET /properties` - Get all properties
- `POST /properties` - Create new property
- `GET /properties/:id` - Get property by ID
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

#### Contact
- `POST /contact` - Submit contact form

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Image upload
- **Multer** - File handling

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Framer Motion** - Animations

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nextproperty
JWT_SECRET=your-jwt-secret
ADMIN_EMAIL=admin@nextproperty.com
ADMIN_PASSWORD=admin123
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

## 🚀 Deployment

### Frontend (Vercel)
1. Build the frontend: `npm run build`
2. Deploy to Vercel or your preferred platform

### Backend (Render/Railway)
1. Set environment variables
2. Deploy to your preferred platform

## 📝 License

ISC License

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request