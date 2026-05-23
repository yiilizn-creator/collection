#!/bin/bash
# 构建并生成公网预览链接（需保持终端运行）
set -e
cd "$(dirname "$0")/.."

echo "→ 构建静态站点..."
npm run build

echo "→ 启动本地服务 http://localhost:3456"
npx --yes serve@14 out -l 3456 &
SERVE_PID=$!
sleep 2

echo "→ 创建 Cloudflare 公网隧道..."
if command -v cloudflared >/dev/null 2>&1; then
  CF=cloudflared
elif [ -x /tmp/cloudflared ]; then
  CF=/tmp/cloudflared
else
  echo "请先安装 cloudflared: brew install cloudflared"
  kill $SERVE_PID 2>/dev/null
  exit 1
fi

$CF tunnel --url http://localhost:3456
kill $SERVE_PID 2>/dev/null
