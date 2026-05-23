# 张宜琳作品集-产品经理

拟态物理风格四屏个人作品集（Next.js 14 + Framer Motion）。

## 四屏

| 屏 | 组件 | 内容 |
|---|---|---|
| 序 | `Screen1_Hero` | 头像、打字机标语、标签胶囊、视差背景 |
| 历 | `Screen2_Timeline` | 3 段工作 + 2 个重点项目，可拖拽展开 |
| 影 | `Screen3_Photography` | 只只爱摄影、作品网格、工作室经历 |
| 联 | `Screen4_Contact` | 邮箱复制、社交入口 |

## 运行

```bash
npm install
npm run dev          # 开发模式 http://localhost:3000
npm run preview      # 静态构建 + 本地预览 http://localhost:3456
bash scripts/share.sh  # 构建并生成公网链接（临时）
```

## 在线预览（目标地址）

**临时预览（几小时内有效，需保持电脑不睡眠）：** https://riverside-principle-melbourne-patrol.trycloudflare.com

**正式地址（部署后）：** https://yilin-collection.vercel.app

首次部署需在终端完成 Vercel 登录（仅一次）：

```bash
npm run deploy:vercel
# 终端会显示 https://vercel.com/oauth/device 与验证码，浏览器登录后即可发布
```

> 项目已配置 Vercel 项目名为 `yilin-collection`。若该名称已被占用，控制台里可改名或改用 `yilin-collection-你的名字.vercel.app`。

## 自定义

- 文案与经历：`src/data/portfolio.ts`
- 替换头像/摄影作品：将占位渐变换为 `next/image` 真实路径

## 彩蛋

右上角 📷 开启 Web Audio 快门音效（点击按钮/拖拽释放）。
