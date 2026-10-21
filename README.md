# Samoringe 的个人主页

中文技术博客与学习记录。视觉参考 Anthropic 官网的暖纸色、衬线大标题、陶土色点缀与编辑式排版，保留个人品牌。原生 HTML / CSS / JavaScript，无需构建或安装依赖，可直接部署到 GitHub Pages。

## 本地预览

在项目目录运行：

```sh
python -m http.server 4173 --bind 127.0.0.1
```

打开 http://127.0.0.1:4173 。

## 定制内容

- `content.js`：文章、标签、学习记录、GitHub 链接。正文 `body` 为可信的自编 HTML，请勿直接放入未经处理的访客输入。
- `index.html`：姓名、简介、首页文案、网站标题与描述。
- `styles.css`：主题颜色、字体、间距与响应式布局。

文章和学习记录初始为空；页面会显示真实的空白状态，不包含生成的示例文章或学习进度。姓名和 GitHub 链接按仓库名称设置为 Samoringe。

功能：文章分类与搜索、展开全部文章、文章阅读弹窗与可分享的片段链接、学习记录、移动端适配、键盘导航。采用固定浅色主题。

## GitHub Pages

仓库包含 `.github/workflows/pages.yml`，在 `main` 分支更新时使用 GitHub Actions 发布静态文件。仓库 Settings → Pages 的构建来源应设为 GitHub Actions。网页没有后台，修改内容需编辑并提交文件。
