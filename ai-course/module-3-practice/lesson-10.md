# 第10课：用AI开发一个网页应用（下）——测试部署

> 课程模块：实战开发 | 预计时长：60分钟

---

## 一、课程导入

### 代码写完了，然后呢？

上节课，我们完成了博客系统的开发：
- 项目初始化 ✓
- 页面开发 ✓
- 功能实现 ✓

**但代码能跑 ≠ 项目完成**

还差最后两步：
1. 测试验证
2. 部署上线

---

## 二、核心内容

### 2.1 测试策略

#### 测试金字塔

```
        /\
       /  \     E2E测试（端到端）
      /____\        少量，关键路径
     /      \
    /        \   集成测试
   /__________\      中等数量
  /            \
 /              \ 单元测试
/________________\    大量，覆盖核心逻辑
```

#### 我们的测试重点

对于静态博客系统：

| 测试类型 | 重点 | 工具 |
|---------|------|------|
| 单元测试 | 数据获取逻辑、工具函数 | Jest |
| 集成测试 | 页面渲染、组件交互 | React Testing Library |
| E2E测试 | 关键用户流程 | Playwright |
| 视觉测试 | 响应式布局、暗色模式 | 人工检查 |

---

### 2.2 编写测试

#### 单元测试示例

**测试文章数据获取**：

```typescript
// __tests__/posts.test.ts
import { getPosts, getPostBySlug } from '@/lib/posts';

describe('文章数据获取', () => {
  test('获取所有文章', async () => {
    const posts = await getPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('slug');
  });

  test('按slug获取文章', async () => {
    const post = await getPostBySlug('hello-world');
    expect(post).not.toBeNull();
    expect(post.title).toBe('Hello World');
  });

  test('获取不存在的文章返回null', async () => {
    const post = await getPostBySlug('not-exist');
    expect(post).toBeNull();
  });
});
```

**给AI的需求**：
```
为文章数据获取函数编写单元测试：
1. 测试getPosts函数：返回文章数组，按日期排序
2. 测试getPostBySlug函数：根据slug返回对应文章
3. 测试边界情况：空数组、不存在的slug

使用Jest，测试文件放在__tests__/目录。
```

---

#### E2E测试示例

**测试首页和文章详情**：

```typescript
// e2e/blog.spec.ts
import { test, expect } from '@playwright/test';

test('首页显示文章列表', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/我的博客/);
  await expect(page.locator('article')).toHaveCount.greaterThan(0);
});

test('点击文章进入详情页', async ({ page }) => {
  await page.goto('/');
  await page.click('article:first-child h2');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('article')).toBeVisible();
});

test('暗色模式切换', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="theme-toggle"]');
  await expect(page.locator('html')).toHaveClass(/dark/);
});
```

**给AI的需求**：
```
编写E2E测试，覆盖以下场景：
1. 首页加载，显示文章列表
2. 点击文章标题，进入详情页
3. 分类页面显示该分类的文章
4. 暗色模式切换功能
5. 移动端菜单展开/收起

使用Playwright，测试文件放在e2e/目录。
```

---

### 2.3 构建和部署

#### 构建配置

**next.config.js**：
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

**给AI的需求**：
```
配置Next.js静态导出：
1. 输出目录为dist
2. 图片不优化（静态导出限制）
3. 确保所有链接使用相对路径
4. 配置基础路径（如果使用自定义域名）
```

---

#### GitHub Actions部署

**.github/workflows/deploy.yml**：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**给AI的需求**：
```
创建GitHub Actions工作流：
1. 触发条件：main分支的push
2. 步骤：
   - 检出代码
   - 安装Node.js 18
   - 安装依赖
   - 运行测试
   - 构建项目
   - 部署到GitHub Pages
3. 确保测试失败时不会部署
```

---

### 2.4 部署后检查

#### 检查清单

```
部署完成后检查：

功能检查：
- [ ] 首页能正常访问
- [ ] 文章列表显示正常
- [ ] 文章详情页能打开
- [ ] 分类和标签页面正常
- [ ] 暗色模式切换有效
- [ ] 移动端显示正常

性能检查：
- [ ] 首屏加载时间 < 3秒
- [ ] Lighthouse评分 > 80
- [ ] 图片加载正常

SEO检查：
- [ ] 标题和描述正确
- [ ] 有正确的meta标签
- [ ] 能被搜索引擎索引
```

---

## 三、实操环节

### 练习1：编写测试

为你的博客系统编写：
1. 至少3个单元测试
2. 至少2个E2E测试

### 练习2：配置部署

1. 配置GitHub仓库
2. 设置GitHub Pages
3. 配置GitHub Actions
4. 推送代码，触发部署

### 练习3：部署检查

访问部署后的网站，完成检查清单：

```
部署地址：______________________

功能检查：
- [ ] 首页正常
- [ ] 文章列表正常
- [ ] 文章详情正常
- [ ] 分类页面正常
- [ ] 暗色模式正常
- [ ] 移动端正常

发现的问题：
1. ______________________
2. ______________________

修复方案：
______________________
```

---

## 四、小结与思考题

### 本节要点

1. 测试是质量保证的关键环节
2. 单元测试 + E2E测试，覆盖核心场景
3. GitHub Actions实现自动化部署
4. 部署后必须检查，确保一切正常

### 思考题

1. 你的测试覆盖了哪些场景？还有哪些遗漏？
2. 部署过程中遇到什么问题？如何解决的？

---

## 五、B站视频脚本框架

### 视频时长：20-30分钟

| 时间段 | 内容 | 形式 |
|-------|------|------|
| 0:00-2:00 | 开场：代码写完不是结束 | 真人出镜 |
| 2:00-6:00 | 测试策略 | 图表+解说 |
| 6:00-12:00 | 编写测试 | 屏幕录制 |
| 12:00-18:00 | 配置部署 | 屏幕录制 |
| 18:00-24:00 | 部署和检查 | 屏幕录制 |
| 24:00-28:00 | 成果演示 | 产品演示 |
| 28:00-30:00 | 小结和项目总结 | 真人出镜 |

### 封面文案

**主标题**：用AI开发一个网页应用（下）——测试部署

**副标题**：从代码到上线，完整的工程化流程

---

## 六、配套图文发布建议

**标题建议**：
- 实战：用AI开发个人博客（下）——测试部署
- 从0到1：AI编程的完整项目实战

**内容要点**：
- 测试策略和代码
- 部署配置
- 最终成果展示
- 项目总结和反思

---

*项目实战完成！下一课：用AI开发一个小程序*