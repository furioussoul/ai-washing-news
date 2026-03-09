# 小红书爆款抓取技能 (XHS Crawler Skill)

## 🌟 技能说明
本技能专门用于从小红书网页端抓取指定关键词的爆款笔记。通过接管用户真实的 Chrome 浏览器，可以完美绕过复杂的登录校验和反爬措施。

## 🛠 核心功能
1. **浏览器接管**：自动连接到 `127.0.0.1:9222` 的调试窗口。
2. **智能搜索**：支持指定关键词搜索（默认 `openclaw`）。
3. **内容抓取**：自动点击笔记、解析标题、正文文本。
4. **素材下载**：高清图片自动下载到本地 `data/` 目录。
5. **异常处理**：支持 Escape 键关闭弹窗，处理 DOM 变动。

## 🚀 如何使用
### 1. 启动调试浏览器 (核心步骤)
在终端执行以下命令（macOS 示例）：
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir="/tmp/chrome-ai-team"
```
并在打开的窗口中完成小红书登录。

### 2. 执行抓取
```bash
bun run crawler.ts
```

## 📂 结果存放
抓取到的素材会保存在 `data/note_[编号]` 目录下。
- `content.txt`: 笔记文字内容。
- `image_n.jpg`: 笔记配图。
