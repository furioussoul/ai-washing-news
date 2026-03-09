# 第7课：第一个自动化任务实战

> 课程模块：工具上手 | 预计时长：90分钟

---

## 一、课程导入

### 学了这么多，该动手了

前几节课，你学会了：
- AI TEAM的核心概念
- 看板式任务管理
- 多Agent协同
- 自动化工作流

**现在，让我们做一个完整的实战项目。**

---

### 项目目标

用AI TEAM开发一个**待办事项App（Todo List）**：

- 前端：简单的网页界面
- 后端：RESTful API
- 数据库：存储待办事项
- 测试：基本的单元测试

**预计时间：2小时**

---

## 二、实战步骤

### Step 1：创建项目Board

在AI TEAM中创建新的Board：

```
Board名称：Todo List App

看板列设置：
1. Backlog（待办）
2. Ready（准备开始）
3. In Progress（进行中）
4. Review（待审核）
5. Done（已完成）

Agent设置：
- Architect：负责技术设计
- Developer：负责编码
- Tester：负责测试
- Reviewer：负责代码审查
```

**【截图位置：AI TEAM创建Board界面】**

---

### Step 2：拆解任务

将项目拆解为以下Task：

```
Task 1: 技术设计
- 标题：设计Todo List技术架构
- 分配给：Architect Agent
- 验收标准：输出技术设计文档

Task 2: 数据库设计
- 标题：设计数据库表结构
- 分配给：Developer Agent
- 依赖：Task 1
- 验收标准：创建SQL脚本

Task 3: 后端API开发
- 标题：实现Todo CRUD API
- 分配给：Developer Agent
- 依赖：Task 2
- 验收标准：API可正常调用

Task 4: 前端开发
- 标题：实现Web界面
- 分配给：Developer Agent
- 依赖：Task 3
- 验收标准：界面可正常操作

Task 5: 单元测试
- 标题：编写API单元测试
- 分配给：Tester Agent
- 依赖：Task 3
- 验收标准：测试覆盖率>80%

Task 6: 代码审查
- 标题：审查所有代码
- 分配给：Reviewer Agent
- 依赖：Task 5
- 验收标准：无重大问题
```

**【截图位置：AI TEAM任务列表界面】**

---

### Step 3：设置自动化工作流

创建工作流：

```yaml
工作流1：开发完成自动测试
触发：Task 3 状态变为 Done
动作：创建 Task 5

工作流2：测试完成自动审查
触发：Task 5 状态变为 Done
动作：创建 Task 6
```

**【截图位置：AI TEAM工作流设置界面】**

---

### Step 4：执行Task 1 - 技术设计

**Prompt示例：**

```
设计一个Todo List App的技术架构：

需求：
1. 用户可以创建、查看、编辑、删除待办事项
2. 每个待办事项包含：标题、描述、状态、创建时间
3. 前端是Web界面，后端是RESTful API

请输出：
1. 技术栈选择（前端、后端、数据库）
2. 系统架构图
3. API设计
4. 数据库表结构
```

**预期输出：**

```
技术栈：
- 前端：HTML + CSS + JavaScript（或React）
- 后端：Node.js + Express
- 数据库：SQLite（简单起见）

API设计：
- GET /api/todos - 获取所有待办事项
- GET /api/todos/:id - 获取单个待办事项
- POST /api/todos - 创建待办事项
- PUT /api/todos/:id - 更新待办事项
- DELETE /api/todos/:id - 删除待办事项

数据库表：
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**【截图位置：Architect Agent输出界面】**

---

### Step 5：执行Task 2 - 数据库设计

根据技术设计，创建数据库脚本。

**【截图位置：数据库创建过程】**

---

### Step 6：执行Task 3 - 后端API开发

**Prompt示例：**

```
基于以下技术设计，实现Todo List的后端API：

技术栈：Node.js + Express + SQLite

API设计：
- GET /api/todos - 获取所有待办事项
- GET /api/todos/:id - 获取单个待办事项
- POST /api/todos - 创建待办事项
- PUT /api/todos/:id - 更新待办事项
- DELETE /api/todos/:id - 删除待办事项

数据库表结构：
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

请输出完整的项目代码，包括：
1. package.json
2. server.js
3. 数据库初始化脚本
4. API路由实现
```

**【截图位置：Developer Agent生成代码界面】**

---

### Step 7：执行Task 4 - 前端开发

**Prompt示例：**

```
创建一个Todo List的前端界面：

要求：
1. 显示所有待办事项列表
2. 可以添加新的待办事项
3. 可以编辑已有的待办事项
4. 可以删除待办事项
5. 可以标记待办事项为完成

技术栈：HTML + CSS + JavaScript
后端API地址：http://localhost:3000/api/todos

请输出：
1. index.html
2. styles.css
3. app.js
```

**【截图位置：前端界面效果】**

---

### Step 8：执行Task 5 - 单元测试

**Prompt示例：**

```
为Todo List API编写单元测试：

测试框架：Jest
API地址：http://localhost:3000/api/todos

测试用例：
1. 获取所有待办事项
2. 创建新待办事项
3. 更新待办事项
4. 删除待办事项
5. 边界条件测试

请输出完整的测试代码。
```

**【截图位置：测试运行结果】**

---

### Step 9：执行Task 6 - 代码审查

**Prompt示例：**

```
审查以下Todo List项目的代码：

审查维度：
1. 代码质量
2. 安全性
3. 性能
4. 可维护性
5. 最佳实践

请列出发现的问题和改进建议。
```

**【截图位置：Reviewer Agent审查结果】**

---

### Step 10：验收与部署

确认所有Task状态为Done后：

1. 运行所有测试
2. 启动后端服务
3. 打开前端界面
4. 验证所有功能正常

**【截图位置：最终效果展示】**

---

## 三、常见问题与解决方案

### 问题1：API无法启动

**原因**：端口被占用或依赖未安装

**解决**：
```bash
# 检查端口
lsof -i :3000

# 安装依赖
npm install

# 启动服务
npm start
```

### 问题2：前端无法连接后端

**原因**：CORS问题或API地址错误

**解决**：
```javascript
// 在server.js中添加CORS支持
const cors = require('cors');
app.use(cors());
```

### 问题3：测试失败

**原因**：数据库状态或API响应格式问题

**解决**：检查测试数据，确保每个测试用例独立

---

## 四、小结与作业

### 本节要点

1. 完整体验了AI TEAM的开发流程
2. 学会了如何用AI生成代码
3. 理解了任务拆解和协作的重要性

### 作业

1. 完成Todo List项目，确保所有功能正常
2. 添加一个新功能：待办事项分类
3. 记录你的开发过程和遇到的问题

---

## 五、B站视频脚本框架

### 视频时长：30-40分钟

| 时间段 | 内容 | 形式 |
|-------|------|------|
| 0:00-3:00 | 开场：项目介绍 | 真人出镜 |
| 3:00-10:00 | Step 1-3：项目搭建 | 产品演示 |
| 10:00-25:00 | Step 4-9：核心开发 | 实操演示 |
| 25:00-35:00 | Step 10：验收与部署 | 效果展示 |
| 35:00-40:00 | 常见问题与作业 | 真人出镜 |

### 封面文案

**主标题**：第一个自动化任务实战

**副标题**：用AI TEAM开发Todo List App

---

*模块二结束。下一模块：实战开发——用AI开发真正的产品*