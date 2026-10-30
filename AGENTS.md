# AGENTS.md — 高级网页制作（E:\高级网页制作）

纯静态 HTML/CSS/JS 课程项目。无构建系统、无 package.json、无测试框架——验证方式就是用浏览器打开页面。

## 目录结构

- 根目录：`index.html` 是图标演示的枢纽页，互链 `iconfont-1~4.html`（图标库练习页）。
- `cdn/`：本地化的 Font Awesome、iconfont、lucide 资源，页面通过相对路径引用，不要改成外网 CDN。
- `web-project_sfz/`：**唯一的 git 仓库**（remote `origin` = `https://gitee.com/sfz0419/web-project_sfz.git`，分支 `master`）。
  - `sfz318/`：课程作业（JS 练习页如 `JS函数.html`）。
  - `sfz318/四级项目/`：期末商城项目，页面按 `318孙芳卓*.html` 命名，共享资源在 `css/common.css`、`css/style.css`、`js/common.js`。
- ⚠️ `web-project_sfz/sfz318/web-project_sfz/` 内嵌一个多余的 `.git`（历史遗留）。所有 git 命令必须显式 `-C "E:\高级网页制作\web-project_sfz"`，防止进错仓库。
- `.trae/`、`.screenshots/`、`.trae-html-share-packages/` 是编辑器产物；`sssss/` 是空目录，忽略。

## 硬规则（来源：`.trae/rules/wy_conventions.md`）

1. **wy_ 前缀**：所有新增 CSS 类名、id、JS 变量/函数必须以 `wy_` 开头（如 `wy_container`、`wy_nav_link_active`）。旧代码不改造，只约束新写的代码。
2. **提示词日志**：执行任何用户指令**之前**，先把该提示词**追加**写入根目录 `wy_prompt.md`（含时间、模型名、原始提示词，格式见该文件头部）。只追加，绝不覆盖。
3. **首页互链**：新建 HTML 文件必须有返回首页的链接（子目录内用相对路径如 `../index.html`），并在对应 `index.html` 中加入指向新页面的入口——不允许孤立页面。旧页面不强制改造。

## Git 工作流

- 提交并推送到 Gitee 的完整流程在 `.trae/skills/git-push-gitee/SKILL.md`：提交信息格式为 `feat|fix|refactor|docs|chore: <中文简述>`，push 前先 `git status` 确认有改动。
- 该 SKILL 文件中存有 Gitee 私人令牌（PAT）。安全要求：令牌只允许存在于 SKILL.md 中，**禁止**复制进任何其他文件或对话输出。

## Windows/编码坑

- PowerShell 默认代码页下中文路径/文件名会乱码。执行带中文路径的命令前用 `cmd /c "chcp 65001 >nul & dir ..."` 或使用 `-LiteralPath`。
- git 对中文文件名默认显示为转义字节（如 `\346\226...`），属正常现象，可用 `git -c core.quotepath=false status` 查看。
- `web-project_sfz` 下存在未提交的作业文件（截至 2026-10-30），不要假设工作区是干净的。
