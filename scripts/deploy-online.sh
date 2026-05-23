#!/bin/bash
# 张宜琳作品集 — 从零部署到 Vercel（长期线上地址）
# 目标：https://yilin-collection.vercel.app
set -e

PROJECT="/Users/zhangyilin/.cursor/projects/empty-window/entity-tales-portfolio"
NODE_BIN="/tmp/node-v20.18.0-darwin-arm64/bin"

export PATH="$NODE_BIN:$PATH"
cd "$PROJECT"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 1/4 检查 Node"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ! command -v node >/dev/null 2>&1; then
  echo "❌ 未找到 Node。请先安装 Node 20+，或确认路径："
  echo "   $NODE_BIN/node"
  exit 1
fi
echo "✓ Node $(node -v)  npm $(npm -v)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 2/4 安装依赖"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm install

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 3/4 构建静态站点"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run build
echo "✓ 构建完成，输出目录：out/"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " 4/4 部署到 Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "若首次部署，终端会显示验证码，请打开："
echo "  https://vercel.com/oauth/device"
echo "用 GitHub 或邮箱登录并授权（仅首次需要）。"
echo ""

npx vercel@latest deploy --prod --yes --name yilin-collection

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ 部署完成"
echo "  正式地址：https://yilin-collection.vercel.app"
echo "  若名称被占用，以终端输出的 Production URL 为准"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
