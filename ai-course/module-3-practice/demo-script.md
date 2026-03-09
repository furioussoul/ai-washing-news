# 30秒短视频 Demo 脚本：AI TEAM 自动化协作展示

**主题**：从一句话需求到“转盘抽奖网页”的丝滑诞生
**目标**：展示 3 个 Agent 如何自动流转、各司其职。

---

## 视频时间轴 (30s)

### 00:00 - 00:05 | 需求录入 (USER)
*   **画面**：AI TEAM 看板界面，点击“创建任务”。
*   **动作**：用户输入：“帮我做一个简单的抽奖网页，中奖时要有五彩纸屑特效。”
*   **字幕**：[一句话需求]

### 00:05 - 00:12 | 需求深化 (REQUIREMENTS_ANALYST)
*   **画面**：任务自动分配给 `REQUIREMENTS_ANALYST`。
*   **AI 输出片段**：
    ```markdown
    ### 功能定义
    1. 输入框：支持批量输入参与者姓名（换行分隔）。
    2. 随机滚动：点击“开始”后名字快速切换。
    3. 视觉反馈：中奖时触发 Canvas-Confetti 动画。
    ```
*   **字幕**：[Agent 1: 需求分析师] 正在拆解功能点...

### 00:12 - 00:20 | 架构设计 (ARCHITECT)
*   **画面**：任务流转至 `ARCHITECT`。
*   **AI 输出片段**：
    ```markdown
    ### 技术栈
    - 框架: 原生 HTML5 / Tailwind CSS
    - 依赖: https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0
    - 文件: index.html (单文件闭环)
    ```
*   **字幕**：[Agent 2: 架构师] 选定技术方案。

### 00:20 - 00:28 | 代码实现 (DEVELOPER)
*   **画面**：任务流转至 `DEVELOPER`，代码编辑器窗口快速闪过。
*   **AI 输出片段**：
    ```javascript
    const pickWinner = () => {
      const names = input.value.split('\n').filter(n => n.trim());
      const winner = names[Math.floor(Math.random() * names.length)];
      confetti({ particleCount: 150, spread: 70 });
      alert(`恭喜: ${winner}!`);
    };
    ```
*   **字幕**：[Agent 3: 开发工程师] 核心逻辑已生成。

### 00:28 - 00:30 | 成果展示 (FINISH)
*   **画面**：切回浏览器，点击“抽奖”，屏幕炸开五彩纸屑。
*   **字幕**：[AI TEAM] 30秒，从创意到交付。

---

## 录屏素材建议
1. **看板状态切换**：使用快进处理 `TODO -> IN_PROGRESS -> DONE` 的拖拽感。
2. **代码高亮**：开发者输出代码时，使用带有语法高亮的编辑器界面（如 VS Code 风格）。
3. **特效展示**：Confetti 效果要占满全屏，增加视觉冲击力。
