# GitHub Pages 渐进优化设计

## 目标

在保持现有架构稳定的前提下，从视觉体验、功能增强、性能与 SEO 三个方向渐进式优化 GitHub Pages。

## 约束

- 不引入前端框架
- 保持静态站点特性
- 现有文件结构不变
- 改动可控、可回滚

## 改动范围

### 视觉体验

#### 1. 卡片入场动画

- 规则卡片使用 CSS `@keyframes` 实现交错淡入效果
- 通过 `animation-delay` 实现 staggered 动画
- 尊重 `prefers-reduced-motion: reduce` 设置，禁用动画

#### 2. 暗色模式优化

- 为 `:root` 添加 `transition: background-color 0.3s ease`
- 调整暗色模式下边框和背景的对比度
- 确保文字可读性

#### 3. 骨架屏加载

- 规则数据加载前显示 3-6 个骨架卡片
- 复用现有 `.loading-skeleton` 样式
- 加载完成后平滑过渡到真实内容

#### 4. 搜索交互反馈

- 输入框有内容时显示清除按钮（×）
- 无匹配结果时显示友好动画提示
- 搜索输入添加轻微的 debounce（150ms）

### 功能增强

#### 1. URL 状态同步

- 搜索词 `?q=python` 同步到 URL
- 分类选择 `?cat=language` 同步到 URL
- 语言切换 `?lang=en` 同步到 URL
- 使用 `history.replaceState` 避免浏览器历史污染
- 页面加载时从 URL 恢复状态

#### 2. 卡片展开/收起

- 默认收起状态：显示标题、描述摘要（截断）、分类
- 点击卡片或「查看详情」按钮展开
- 展开状态：完整描述、所有适用范围、操作按钮
- 再次点击收起

#### 3. 一键复制规则内容

- 新增「复制规则内容」按钮
- 点击后 fetch GitHub raw 内容
- 复制到剪贴板并显示成功提示
- 错误时显示友好提示

#### 4. 键盘快捷键

- `/` 聚焦搜索框
- `Esc` 清空搜索
- 数字键 `1-8` 快速切换分类（按显示顺序）
- 添加快捷键提示 tooltip

### 性能与 SEO

#### 1. SEO 优化

- 完善 Open Graph 标签（添加 og:image 占位）
- 添加 `<meta name="robots" content="index, follow">`
- 生成 `sitemap.xml`（通过构建脚本）

#### 2. 预加载优化

- 添加 `<link rel="preconnect">` 到 `raw.githubusercontent.com`
- 预加载关键字体（如使用系统字体则跳过）

## 文件改动清单

| 文件 | 改动类型 | 内容 |
|------|----------|------|
| `docs/assets/site.css` | 修改 | 动画、暗色模式、骨架屏样式 |
| `docs/assets/site.js` | 修改 | URL 同步、卡片展开、复制内容、快捷键 |
| `scripts/build-rule-catalog.mjs` | 修改 | 生成 sitemap.xml |

## 验收标准

1. 卡片入场动画流畅，尊重 reduced-motion 设置
2. URL 状态同步正常，分享链接可还原状态
3. 键盘快捷键正常工作
4. 复制规则内容功能正常
5. 暗色模式过渡自然
6. 骨架屏加载体验流畅
7. `npm test` 和 `npm run build:catalog` 通过
