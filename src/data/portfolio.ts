export const siteName = "张宜琳作品集-产品经理";

export const profile = {
  name: "张宜琳",
  title: "产品经理 / 个人创作者",
  tagline: "造影为浪，执品成光",
  email: "1016962913@qq.com",
  phone: "15821186571",
  echoSlogan: "每一次快门，都是与世界的短暂共谋",
};

export const heroTags = [
  "AI工具落地",
  "0→1产品孵化",
  "多端产品经历",
] as const;

export const journeyIntro =
  "3年专注影像工具及用户产品实战经验，主导 **AI 板块**、垂类影像工具从 **0 到1** 孵化与 **百万日活** 产品核心迭代。兼顾 **B&C 端** 市场，独立完成多端（**Web/PC/APP**）需求调研及产品功能设计，具备丰富的 **MVP 落地** 与商业化初步验证经验。";

export const journeyHighlights = [
  { value: "3年", label: "影像产品经验" },
  { value: "10+", label: "AI 功能上线" },
  { value: "百万", label: "日活产品迭代" },
] as const;

export const screenTitles = {
  prologue: { title: "序", titleEn: "Prologue" },
  journey: { title: "产品旅程", titleEn: "Journey" },
  darkroom: { title: "摄影暗房", titleEn: "Darkroom" },
  echo: { title: "回声", titleEn: "Echo" },
} as const;

/** 工作经历展示顺序：左 → 右 小红书 · 萌动 · 美图 */
export const workExperiences = [
  {
    id: "xiaohongshu",
    company: "小红书科技有限公司",
    role: "效果产品经理（实习）",
    period: "2022.09-2023.03",
    color: "#e85d5d",
    bullets: [
      "累计上线**特效、滤镜40+**个，**模版50组+**，核心模板**日均点击量达5k+**，**总曝光超200万**。",
      "负责**TTS语音模型**产品化，推动核心音色主观评分从**7.2分**提升至**9.1分**。",
    ],
  },
  {
    id: "mengdong",
    company: "广州萌动信息科技有限公司",
    role: "c端产品经理",
    period: "2023.05-2025.04",
    color: "#6b8f71",
    bullets: [
      "负责核心影像产品增长，推动**日活跃用户突破100万**，**DAU提升15%**，**使用时长增长20%**。",
      "从**0到1**孵化**\"面包拼图\"**APP，**半年内DAU从0增长至5万**，验证**商业化闭环**。",
    ],
  },
  {
    id: "meitu",
    company: "厦门美图之家科技有限公司",
    role: "影像产品经理",
    period: "2025.05-2026.01",
    color: "#c47b5a",
    bullets: [
      "主导美图云修**【AI工具箱】**从**0到1**落地，推动**10+**个AI功能上线，完善**AI能力矩阵**。",
      "独立负责**Web端AI工作台**与**海外官网**搭建，**3个月**内实现**活跃用户突破4万**。",
      "高效交付PC客户端**【联机拍摄】**MVP版本，协调资源确保功能**如期上线**。",
    ],
  },
] as const;

export const projectCards = [
  {
    id: "meitu-toolbox",
    title: "美图云修AI工具箱从0到1落地项目",
    role: "项目负责人",
    period: "2025.09-2025.11",
    color: "#8b6b4a",
    bullets: [
      "独立完成**产品规划**与**功能设计**，梳理**10+ AI功能**优先级，协同**算法/研发**团队推进落地。",
      "**3个月**内推动**客户端**及**Web端**从**0到1**上线，AI功能**日均使用次数达8000+**。",
      "项目成果：带动产品**付费咨询量提升35%**，**用户满意度8+分**，成为**核心引流模块**。",
    ],
  },
  {
    id: "xhs-template",
    title: "小红书平台模版全流程管理",
    role: "效果产品经理",
    period: "2022.10-2023.01",
    color: "#7a5c8f",
    bullets: [
      "深度参与**AI图文/视频模版**策划、**热点挖掘**、**算法跟进**及**效果验收**全流程。",
      "独立完成**3款以上AI爆款模版**策划及上线，累计管理**模版50组+**，验收**算法效果10+次**。",
      "项目成果：累计**模版曝光超200万次**，有效**降低UGC创作门槛**，提升**社区内容调性**。",
    ],
  },
] as const;

export const photography = {
  account: "只只爱摄影",
  stats: { likes: "2k+", monetization: "5w+" },
  studio: "60组+ 个人写真 / 毕业写真，多位 KOL 摄影主题合作",
  works: [
    {
      id: "w1",
      title: "春日序曲",
      src: "/photos/photo-1.png",
      alt: "春日序曲",
      width: 1200,
      height: 900,
    },
    {
      id: "w2",
      title: "镜中诗篇",
      src: "/photos/photo-2.png",
      alt: "镜中诗篇",
      width: 1200,
      height: 900,
    },
    {
      id: "w3",
      title: "夜色玫瑰",
      src: "/photos/photo-3.png",
      alt: "夜色玫瑰",
      width: 1200,
      height: 900,
    },
    {
      id: "w4",
      title: "游园漫步",
      src: "/photos/photo-4.png",
      alt: "游园漫步",
      width: 1200,
      height: 900,
    },
    {
      id: "w5",
      title: "云间寄语",
      src: "/photos/photo-5.png",
      alt: "云间寄语",
      width: 1200,
      height: 900,
    },
    {
      id: "w6",
      title: "暮色海岸",
      src: "/photos/photo-6.png",
      alt: "暮色海岸",
      width: 1200,
      height: 900,
    },
    {
      id: "w7",
      title: "走廊气球",
      src: "/photos/photo-7.png",
      alt: "走廊气球",
      width: 1200,
      height: 900,
    },
    {
      id: "w8",
      title: "林间碎光",
      src: "/photos/photo-8.png",
      alt: "林间碎光",
      width: 1200,
      height: 900,
    },
    {
      id: "w9",
      title: "午后小憩",
      src: "/photos/photo-9.png",
      alt: "午后小憩",
      width: 1200,
      height: 900,
    },
  ],
  videos: [
    {
      id: "v-taopao",
      title: "逃跑是最完美的解法吗",
      poster: "/videos/poster-taopao.png",
      src: "/videos/taopao-zuiwanmei-jiefa-720p.mp4",
      featured: true,
    },
  ],
};

export const contactMethods = [
  {
    id: "email",
    label: "邮箱",
    value: "1016962913@qq.com",
    copyText: "1016962913@qq.com",
  },
  {
    id: "wechat",
    label: "微信",
    value: "YL-0805",
    copyText: "YL-0805",
  },
  {
    id: "xiaohongshu",
    label: "小红书",
    value: "@只只爱摄影",
    copyText: "@只只爱摄影",
  },
  {
    id: "gongzhonghao",
    label: "公众号",
    value: "@一只小只",
    copyText: "@一只小只",
  },
] as const;

export const screens = [
  { id: "prologue", label: "序", shortLabel: "序" },
  { id: "journey", label: "产品旅程", shortLabel: "旅程" },
  { id: "darkroom", label: "摄影暗房", shortLabel: "暗房" },
  { id: "echo", label: "回声", shortLabel: "回声" },
] as const;
