# ══════════════════════════════════════════════════════════════
#   Shree Durga Interior — Full Deployment Guide
#   Covers: Supabase · Vercel · AWS · cPanel · Hostinger VPS
# ══════════════════════════════════════════════════════════════

## PROJECT STRUCTURE
```
shreedurga/
├── frontend/               ← Static HTML/CSS/JS website
│   ├── index.html          ← Homepage
│   ├── services.html
│   ├── projects.html
│   └── contact.html
├── backend/                ← Node.js Express API
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── deployment/
    ├── supabase-schema.sql
    ├── vercel/vercel.json
    ├── aws/                ← AWS configs
    ├── cpanel/             ← cPanel configs
    └── hostinger/          ← VPS configs
```

═══════════════════════════════════════════════
## STEP 1 — SUPABASE (Database)  ~10 minutes
═══════════════════════════════════════════════

1. Go to https://supabase.com → Create account → New project
   - Name: shreedurga-interior
   - Database password: (save this!)
   - Region: ap-south-1 (Mumbai)

2. SQL Editor → New Query → paste supabase-schema.sql → Run

3. Settings → API → Copy:
   - Project URL       → SUPABASE_URL
   - anon/public key   → SUPABASE_ANON_KEY
   - service_role key  → SUPABASE_SERVICE_KEY

4. Authentication → Settings → disable Email confirmations (optional)

═══════════════════════════════════════════════
## STEP 2 — VERCEL (Recommended — Free + Fast)
═══════════════════════════════════════════════

### Prerequisites
- GitHub account with your project pushed
- Vercel account (free tier is enough)

### Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project root
cd shreedurga
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: shreedurga-interior
# - Directory: ./
# - Override settings? No
```

### Set Environment Variables in Vercel Dashboard
Dashboard → Project → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| SUPABASE_URL | https://xxx.supabase.co |
| SUPABASE_SERVICE_KEY | eyJ... |
| SMTP_HOST | smtp.gmail.com |
| SMTP_PORT | 587 |
| SMTP_USER | shreedurgainterior50@gmail.com |
| SMTP_PASS | your-gmail-app-password |
| NOTIFY_EMAIL | shreedurgainterior50@gmail.com |
| ADMIN_API_KEY | your-random-secret |
| NODE_ENV | production |
| ALLOWED_ORIGINS | https://shreedurgainterior.vercel.app |

### Custom Domain
1. Vercel Dashboard → Project → Settings → Domains
2. Add: shreedurgainterior.in
3. Copy the CNAME/A record shown
4. Go to your domain registrar → DNS → Add the record
5. Wait 5–30 minutes for propagation

### Auto-deploy on git push
```bash
git add . && git commit -m "deploy" && git push origin main
# Vercel auto-deploys on every push!
```

═══════════════════════════════════════════════
## STEP 3A — AWS EC2 (Self-hosted VPS)
═══════════════════════════════════════════════

### Launch EC2 Instance
1. AWS Console → EC2 → Launch Instance
   - Name: shreedurga-server
   - AMI: Ubuntu 22.04 LTS (free tier eligible)
   - Instance type: t2.micro (free tier) or t3.small (₹800/mo)
   - Key pair: Create new → download .pem file
   - Security Group: Allow ports 22, 80, 443, 3001

2. Allocate Elastic IP → Associate with instance

### Connect & Setup
```bash
# Connect via SSH
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_ELASTIC_IP

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot (SSL)
sudo apt install -y certbot python3-certbot-nginx

# Clone your repo
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/shreedurga-interior.git
cd shreedurga-interior

# Setup backend
cd backend
npm install --production
cp .env.example .env
nano .env   # Fill in your values

# Start with PM2
pm2 start server.js --name "shreedurga-api"
pm2 startup  # Follow the printed command
pm2 save
```

### Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/shreedurgainterior.in
```

Paste:
```nginx
server {
    listen 80;
    server_name shreedurgainterior.in www.shreedurgainterior.in;

    # Frontend static files
    root /var/www/shreedurga-interior/frontend;
    index index.html;

    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

```bash
sudo ln -s /etc/nginx/sites-available/shreedurgainterior.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL with Let's Encrypt (FREE)
sudo certbot --nginx -d shreedurgainterior.in -d www.shreedurgainterior.in
# Enter email, agree, and it auto-configures HTTPS!
```

### AWS S3 (Optional — for images/uploads)
```bash
# Install AWS CLI
sudo snap install aws-cli --classic
aws configure   # Enter your AWS keys

# Create bucket
aws s3 mb s3://shreedurga-media --region ap-south-1

# Set public read policy
aws s3api put-bucket-policy --bucket shreedurga-media --policy '{
  "Statement":[{"Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::shreedurga-media/*"}]
}'
```

═══════════════════════════════════════════════
## STEP 3B — cPANEL HOSTING
═══════════════════════════════════════════════

### Upload Frontend Files
1. cPanel → File Manager → public_html
2. Delete default files
3. Upload ALL files from /frontend/ folder:
   - index.html
   - services.html
   - projects.html
   - contact.html
   - (any CSS/JS/images in subfolders)

### Backend via Node.js App (cPanel NodeJS Selector)
1. cPanel → Software → Node.js (NodeJS Selector)
2. Create Application:
   - Node version: 20.x
   - App mode: Production
   - App root: /home/USERNAME/nodeapp
   - App URL: api.shreedurgainterior.in  (or /api/)
   - Startup file: server.js

3. Upload backend files to: /home/USERNAME/nodeapp/
   - server.js
   - package.json
   - .env (fill your values)

4. In Node.js App panel → NPM Install → Start

5. Setup .htaccess to proxy /api/ to Node:
```apache
# /public_html/.htaccess
RewriteEngine On
RewriteBase /

# Proxy API to Node.js
RewriteCond %{REQUEST_URI} ^/api
RewriteRule ^api/(.*)$ http://localhost:PORT/api/$1 [P,L]

# HTML pages
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.+)\.html$ $1.html [L]

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

### SSL on cPanel
1. cPanel → Security → SSL/TLS
2. Let's Encrypt (usually available as AutoSSL or via "Let's Encrypt SSL")
3. Click Install → select your domain → Install

═══════════════════════════════════════════════
## STEP 3C — HOSTINGER VPS
═══════════════════════════════════════════════

### Initial Setup
```bash
# Connect to VPS
ssh root@YOUR_VPS_IP

# Create non-root user
adduser shreedurga
usermod -aG sudo shreedurga
su - shreedurga

# Install essentials
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl certbot python3-certbot-nginx

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Configure UFW firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Deploy Application
```bash
# Clone project
sudo mkdir -p /var/www && cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/shreedurga-interior.git
sudo chown -R shreedurga:shreedurga shreedurga-interior

# Setup backend
cd shreedurga-interior/backend
npm install --production
cp .env.example .env && nano .env  # Fill values

# Start with PM2
pm2 start server.js --name shreedurga-api
pm2 startup systemd -u shreedurga --hp /home/shreedurga
pm2 save
```

### Nginx config (same as AWS above — paste same config)
```bash
sudo nano /etc/nginx/sites-available/shreedurgainterior.in
# Paste the nginx config from the AWS section above
sudo ln -s /etc/nginx/sites-available/shreedurgainterior.in /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d shreedurgainterior.in -d www.shreedurgainterior.in
```

### Auto-update script
```bash
cat > /home/shreedurga/deploy.sh << 'EOF'
#!/bin/bash
echo "🚀 Deploying Shree Durga Interior..."
cd /var/www/shreedurga-interior
git pull origin main
cd backend && npm install --production
pm2 reload shreedurga-api
echo "✅ Deployment complete!"
EOF
chmod +x /home/shreedurga/deploy.sh
```

### DNS Setup (Point domain to VPS)
In your domain registrar (e.g. GoDaddy, Namecheap, Hostinger):
- A record: @ → YOUR_VPS_IP
- A record: www → YOUR_VPS_IP
- CNAME: api → shreedurgainterior.in (optional)

═══════════════════════════════════════════════
## STEP 4 — GMAIL APP PASSWORD (for emails)
═══════════════════════════════════════════════

1. Go to myaccount.google.com
2. Security → 2-Step Verification → Enable
3. Security → App passwords
4. App: Mail · Device: Other → "ShreedurgaInterior Server"
5. Copy the 16-character password → paste as SMTP_PASS in .env

═══════════════════════════════════════════════
## STEP 5 — DNS RECORDS SUMMARY
═══════════════════════════════════════════════

| Type  | Name  | Value                          | TTL   |
|-------|-------|--------------------------------|-------|
| A     | @     | YOUR_SERVER_IP                 | 3600  |
| A     | www   | YOUR_SERVER_IP                 | 3600  |
| MX    | @     | aspmx.l.google.com (priority 1)| 3600  |
| TXT   | @     | v=spf1 include:_spf.google.com ~all | 3600 |

═══════════════════════════════════════════════
## PLATFORM COMPARISON
═══════════════════════════════════════════════

| Platform      | Cost/mo | Setup Time | Best For          |
|---------------|---------|------------|-------------------|
| Vercel        | FREE    | 15 min     | Quick launch ✅   |
| Hostinger VPS | ₹400    | 45 min     | Budget + control  |
| AWS EC2       | ₹600+   | 60 min     | Scalability       |
| cPanel        | ₹200    | 30 min     | Shared hosting    |

### RECOMMENDED ORDER:
1. ✅ Start with Vercel (free, fast, zero maintenance)
2. 🗄️ Add Supabase for database (free tier: 500MB, 50k rows)
3. 📧 Gmail App Password for email notifications
4. 🌐 Point custom domain → Done!

═══════════════════════════════════════════════
## QUICK START (Fastest path to live)
═══════════════════════════════════════════════

```bash
# 1. Create GitHub repo and push code
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/YOUR/shreedurga-interior.git
git push -u origin main

# 2. Deploy to Vercel (2 minutes)
npx vercel --prod

# 3. Add env variables in Vercel dashboard

# 4. Add custom domain in Vercel dashboard

# 5. Point DNS → Done! 🎉
```

Support: For any deployment issues, the Vercel/Supabase documentation
is excellent. Start there before trying AWS/VPS approaches.
