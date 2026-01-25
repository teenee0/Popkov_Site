module.exports = {
  apps: [{
    name: 'nextjs-qwertysb',
    script: './server.js',
    cwd: '/home/q/qwertysb/qwertysb.beget.tech/popkov_site',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    kill_timeout: 5000,
    listen_timeout: 10000,
    wait_ready: true,
    env: {
      NODE_ENV: 'production',
      PORT: 4000,
      HOST: '127.0.0.1'
    }
  }]
}
