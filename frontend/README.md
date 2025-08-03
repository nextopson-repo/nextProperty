# NextProperty Frontend

A modern React application for property management built with Vite, Tailwind CSS, and React Router.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

## 🌐 Deployment

### EC2 Deployment
1. **Clone/Upload** the project to your EC2 instance
2. **Install dependencies**: `npm install`
3. **Configure environment**: Update `.env` with your EC2 backend URL
4. **Build**: `npm run build:prod`
5. **Deploy**: `npm run start` or use `./deploy.sh`

### Environment Variables
Create a `.env` file with:
```env
VITE_API_BASE_URL=http://your-ec2-ip:8000/api
VITE_APP_NAME=NextProperty
VITE_APP_VERSION=1.0.0
```

## 📁 Project Structure

```
src/
├── api/           # API configuration and calls
├── components/    # Reusable React components
├── pages/         # Page components
├── config/        # Configuration files
└── assets/        # Static assets
```

## 🔧 Configuration

### API Configuration
- **Development**: `http://localhost:8000/api`
- **Production**: `http://your-ec2-ip:8000/api`

### Build Optimization
- **Code splitting**: Vendor and router chunks
- **Source maps**: Disabled in production
- **Compression**: Gzip enabled

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production optimizations
- `npm run start` - Start production server
- `npm run preview` - Preview production build

## 📦 Dependencies

- **React 19** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 🔒 Security

- Environment variables for API configuration
- CORS handling in backend
- JWT token authentication
- Secure file uploads

## 📚 Documentation

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
