#!/bin/bash
# 一键创建 GitHub 仓库并推送（需先 gh auth login）
set -e
cd "$(dirname "$0")/.."

GH="/tmp/gh-extract/gh_2.63.2_macOS_arm64/bin/gh"
if [ ! -x "$GH" ]; then
  echo "未找到 gh CLI，请先运行: curl -sL https://github.com/cli/cli/releases/download/v2.63.2/gh_2.63.2_macOS_arm64.zip -o /tmp/gh.zip && unzip -qo /tmp/gh.zip -d /tmp/gh-extract"
  exit 1
fi

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "请先登录 GitHub："
  echo "  $GH auth login --web"
  exit 1
fi

USER=$("$GH" api user -q .login)
REPO="yilin-collection"

if "$GH" repo view "${USER}/${REPO}" >/dev/null 2>&1; then
  echo "→ 仓库已存在: https://github.com/${USER}/${REPO}"
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/${USER}/${REPO}.git"
  git push -u origin main
else
  echo "→ 创建仓库 ${USER}/${REPO} 并推送..."
  "$GH" repo create "$REPO" --public --source=. --remote=origin --push
fi

echo ""
echo "✓ 代码已推送"
echo "→ 开启 Pages: https://github.com/${USER}/${REPO}/settings/pages"
echo "  Source 选择 GitHub Actions"
echo ""
echo "→ 部署完成后访问: https://${USER}.github.io/${REPO}/"
