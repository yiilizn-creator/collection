#!/bin/bash
# 推送代码到 GitHub（需先在 github.com 创建空仓库 yilin-collection）
set -e
cd "$(dirname "$0")/.."

if [ -z "$1" ]; then
  echo "用法: bash scripts/push-github.sh 你的GitHub用户名"
  echo "示例: bash scripts/push-github.sh zhangyilin"
  exit 1
fi

USER="$1"
REMOTE="https://github.com/${USER}/yilin-collection.git"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi

echo "→ 推送到 $REMOTE"
git push -u origin main

echo ""
echo "✓ 推送完成"
echo "  1. 打开 https://github.com/${USER}/yilin-collection/settings/pages"
echo "  2. Source 选择 GitHub Actions"
echo "  3. 访问 https://${USER}.github.io/yilin-collection/"
