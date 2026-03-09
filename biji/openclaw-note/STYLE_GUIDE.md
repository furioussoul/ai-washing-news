# 抖音原生感笔记设计规范 (Human-like Note Style)

本套设计旨在消除“AI生成感”，模拟真实博主在手机上（如剪映、小红书、黄油相机）手工拼贴的效果。以下是核心复刻流程和设计参数：

## 1. 核心视觉参数 (Core Parameters)

| 元素 | 参数值 | 说明 |
| :--- | :--- | :--- |
| **背景色** | `#FEF9F2` | 暖米色，比纯白更有温度 |
| **背景纹理** | `40px` 网格 | 模拟纸张或设计画布感 |
| **主高亮色** | `#4ADE80` (青柠绿) | 极具冲击力的荧光感 |
| **字体** | `PingFang SC` 粗体 | 社交媒体主流原生字体 |
| **个人信息** | 居左置顶 | 模拟社交平台截图/原生入口位置 |

## 2. 营造“活人感”的核心技巧 (Human-Touch Logic)

### A. 打破完美对齐 (The 1-Degree Rule)
*   **做法**：对核心装饰元素（高亮底色、图片容器、标签）进行 `rotate(-1deg)` 或 `rotate(1deg)` 的微调。
*   **原理**：完美对齐是机器的特征，微小的倾斜能模拟手动摆放的痕迹。

### B. 荧光笔涂鸦底色 (Highlighter Effect)
*   **做法**：不要使用标准的 `padding` 背景，而是使用一个 `Absolute` 容器。
*   **代码参考**：
    ```css
    borderRadius: '60% 40% 50% 45% / 10% 15% 12% 10%'; /* 模拟不规则手涂边缘 */
    transform: 'skewX(-5deg)'; /* 模拟涂抹时的受力倾斜 */
    ```

### C. 图片“贴纸化”处理 (Sticker Treatment)
*   **做法**：给核心图片增加 `15px` 的纯白描边 (`border`)，并搭配大扩散、低透明度的投影 (`boxShadow`)。
*   **视觉效果**：图片看起来像是一张物理照片贴在纸上。

### D. 手写感标注 (Hand-drawn Annotations)
*   **做法**：在严谨的排版旁，加入一个小号、高饱和度的标签（如 `#FFD700` 金黄色），并配合 Emoji 和口语化文案。
*   **文案建议**：使用“真·保姆级”、“不骗人”、“评论区扣1”等活人语境。

## 3. 复用组件结构 (Component Architecture)

### 封面图 (Cover Note)
- **Top**: Avatar + ID (置顶，建立信任感)
- **Middle**: 主标题 (荧光高亮 + 巨大字号) + 备注标签
- **Center**: 贴纸化图片 (带白边，微旋转)
- **Bottom**: 互动暗示 (模拟话题标签、点赞、评论数，降低广告感)

### 互动图 (Follow Note)
- **Center**: 痛点/价值点列表 (带波浪下划线装饰)
- **CTA**: 底部巨大的黑色药丸按钮 (`borderRadius: 100`) + 漂浮的 ✨ 贴纸装饰。

## 4. 渲染指令 (Render Command)

在 `biji/openclaw-note` 目录下执行：
```bash
npx remotion still src/index.tsx OpenclawNote out/cover.jpg --overwrite
npx remotion still src/index.tsx FollowNote out/follow.jpg --overwrite
```
