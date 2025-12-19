/**
 * dev0(Node runtime)에서 PM2로 Next.js를 운영하기 위한 기본 설정.
 *
 * 사용 예:
 *   pm2 start ecosystem.config.cjs
 *   pm2 save
 *   pm2 restart zikim-dev0
 *
 * 주의:
 * - 서버에서 `npm ci && npm run build` 후 실행하세요.
 * - 환경변수는 pm2 ecosystem의 env_* 또는 서버 환경에 맞게 주입하세요.
 */
module.exports = {
  apps: [
    {
      name: "zikim-dev0",
      cwd: ".",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        // NEXT_PUBLIC_* 등 필요한 env가 있으면 여기에 추가
      },
    },
  ],
};


