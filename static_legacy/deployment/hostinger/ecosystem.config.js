// PM2 Ecosystem Config — Shree Durga Interior
// Usage: pm2 start ecosystem.config.js --env production

module.exports = {
  apps: [
    {
      name: 'shreedurga-api',
      script: './backend/server.js',
      instances: 'max',           // Use all CPU cores
      exec_mode: 'cluster',       // Cluster mode for load balancing
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      // Auto-restart settings
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      restart_delay: 3000,

      // Logging
      log_file: '/var/log/pm2/shreedurga-combined.log',
      out_file: '/var/log/pm2/shreedurga-out.log',
      error_file: '/var/log/pm2/shreedurga-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 8000,
    }
  ],
  deploy: {
    production: {
      user: 'shreedurga',
      host: 'YOUR_VPS_IP',
      ref: 'origin/main',
      repo: 'https://github.com/YOUR_USERNAME/shreedurga-interior.git',
      path: '/var/www/shreedurga-interior',
      'pre-deploy-local': '',
      'post-deploy': 'cd backend && npm install --production && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install -y nodejs npm nginx',
    }
  }
};
