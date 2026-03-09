# Remotion 海报/笔记生成全闭环技能手册

## 核心定位
使用 React + Remotion 快速生成符合社交媒体（小红书/抖音）审美的高质量静态配图。

## 避坑指南（必读）
1. **样式方案**：渲染静态图时，务必使用 **Inline Styles (内联样式)**。不要依赖 Tailwind CSS 编译，否则在某些 Headless 环境下会导致样式丢失（黑屏/无字）。
2. **图片加载**：
    - 必须使用 Remotion 的 `<Img />` 组件。
    - 必须使用 `staticFile("filename.jpg")` 引用 `public/` 下的资产。
    - 必须配合 `delayRender` 和 `continueRender` 钩子，确保图片加载完成后再进行帧捕获。
3. **文件后缀**：入口文件必须是 `.tsx` 以支持 JSX，否则 esbuild 会报错。

## UI 规范
- **抖音网感风格**：
  - 背景：`linear-gradient(135deg, #7da2ff 0%, #a287ff 100%)`
  - 容器：纯黑 `#000000`，圆角 `80px`。
  - 高亮色：`#4da6ff` (加粗)。
  - 字体：`-apple-system` 系统默认黑体。
- **小红书大字报风格**：
  - 背景：纯白 `#ffffff`。
  - 装饰：顶部渐变条，两侧浅灰色大引号。

## 闭环执行指令

### 场景 A：生产文案大字报 (DouyinNote)
适用于标题+正文+高亮词的场景（如 P1, P4, P5）。
```bash
npx remotion still 源码/index.tsx DouyinNote 发布物/日期_平台/px.jpg --props '{"title": "标题", "content": "正文\n换行", "highlights": ["高亮词"]}' --overwrite
```

### 场景 B：标准化原始图片 (ImageWrapper)
适用于将非 3:4 图片（如 P2, P3）嵌入标准画布。
1. 将图片存入 `public/`。
2. 执行指令：
```bash
npx remotion still 源码/index.tsx ImageWrapper 发布物/日期_平台/px.jpg --props '{"src": "图片文件名.png"}' --overwrite
```

## 模板组件逻辑 (源码/index.tsx)
- **DouyinNote**: 自动关键词染色，默认使用 `public/jojo.jpg` 头像。
- **ImageWrapper**: 自动为素材添加蓝紫渐变底色和圆角黑框，确保视觉一致性。

