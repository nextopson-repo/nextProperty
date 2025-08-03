# EC2 Deployment Guide for NextProperty

This guide will help you deploy your NextProperty fullstack application on Amazon EC2.

## ✅ Fixed Issues
- **Path-to-regexp Error**: Fixed the TypeError by replacing the problematic `app.get('*')` route with middleware approach
- **Express 5 Compatibility**: Updated route handling to work with Express 5.1.0

## Prerequisites
- AWS EC2 instance (Ubuntu 20.04 or later recommended)
- Domain name (optional but recommended)
- MongoDB Atlas cluster (or self-hosted MongoDB)

## Step 1: EC2 Instance Setup

### Launch EC2 Instance
1. Launch Ubuntu 20.04 LTS instance
2. Configure Security Group:
   - SSH (Port 22) - Your IP
   - HTTP (Port 80) - 0.0.0.0/0
   - HTTPS (Port 443) - 0.0.0.0/0
   - Custom TCP (Port 8000) - 0.0.0.0/0 (for development)

### Connect to Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

## Step 2: Install Dependencies

### Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js and npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Install Nginx (for reverse proxy)
```bash
sudo apt install nginx -y
```

## Step 3: Deploy Application

### Clone Repository
```bash
cd /home/ubuntu
git clone your-repository-url nextproperty
cd nextproperty
```

### Install Dependencies
```bash
npm run install-all
```

### Build Application
```bash
npm run build-all
```

### Create Environment File
```bash
cd Backend
cp .env.example .env
# Edit .env with your production values
nano .env
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=8000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Step 4: Configure PM2

### Create PM2 Ecosystem File
```bash
cd /home/ubuntu/nextproperty
nano ecosystem.config.js
```

Add this content:
```javascript
module.exports = {
  apps: [{
    name: 'nextproperty',
    script: './Backend/index.js',
    cwd: '/home/ubuntu/nextproperty',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8000
    }
  }]
};
```

### Start Application with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 5: Configure Nginx

### Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/nextproperty
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/nextproperty /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 6: SSL Certificate (Optional but Recommended)

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 7: Update Scripts

### Add Update Script
```bash
nano /home/ubuntu/nextproperty/update.sh
```

Add this content:
```bash
#!/bin/bash
cd /home/ubuntu/nextproperty
git pull origin main
npm run install-all
npm run build-all
pm2 restart nextproperty
```

Make it executable:
```bash
chmod +x update.sh
```

## Step 8: Monitoring and Logs

### PM2 Commands
```bash
pm2 status          # Check application status
pm2 logs nextproperty  # View logs
pm2 restart nextproperty  # Restart application
pm2 stop nextproperty   # Stop application
pm2 delete nextproperty # Remove from PM2
```

### Nginx Commands
```bash
sudo systemctl status nginx  # Check nginx status
sudo nginx -t               # Test nginx configuration
sudo systemctl restart nginx # Restart nginx
```

## Step 9: File Structure After Deployment

```
/home/ubuntu/nextproperty/
├── Backend/
│   ├── dist/           # React build output
│   ├── index.js        # Express server
│   ├── .env           # Environment variables
│   └── ...
├── frontend/
│   ├── dist/          # Original build
│   └── ...
├── ecosystem.config.js # PM2 configuration
├── update.sh          # Update script
└── package.json
```

## Troubleshooting

### Check Application Status
```bash
pm2 status
pm2 logs nextproperty
```

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Check Port Usage
```bash
sudo netstat -tlnp | grep :8000
sudo netstat -tlnp | grep :80
```

### Restart Everything
```bash
pm2 restart all
sudo systemctl restart nginx
```

## Security Considerations

1. **Firewall**: Configure UFW to only allow necessary ports
2. **SSH**: Use key-based authentication only
3. **Updates**: Regularly update your system
4. **Backups**: Set up automated backups
5. **Monitoring**: Set up monitoring and alerting

## Performance Optimization

1. **PM2 Clustering**: Use multiple instances for better performance
2. **Nginx Caching**: Configure caching for static assets
3. **CDN**: Use CloudFront or similar for global distribution
4. **Database**: Use MongoDB Atlas for managed database
5. **Monitoring**: Set up monitoring with PM2 Plus or similar

## Update Process

To update your application:
```bash
cd /home/ubuntu/nextproperty
./update.sh
```

This will:
1. Pull latest changes from git
2. Install dependencies
3. Build the application
4. Restart the PM2 process

## Technical Notes

- **Express 5 Compatibility**: The backend uses Express 5.1.0 with middleware-based route handling
- **Static File Serving**: React build files are served from `Backend/dist/`
- **API Routes**: All API endpoints are prefixed with `/api`
- **Client-side Routing**: React Router handles client-side routing with fallback to `index.html` 