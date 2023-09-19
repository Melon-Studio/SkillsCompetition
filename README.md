# SkillsCompetition

此项目是 SkillsCompetition 的前端项目，使用 Vue3 + Vite 构建，是为高校的网页设计比赛，提供的作品提交系统，欢迎计算机相关专业的同学克隆仓库学习代码。

## 开发IDE

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## 项目搭建

1. 克隆仓库

```
git clone https://github.com/Melon-Studio/SkillsCompetition.git
```

2. 安装依赖

```sh
npm install
```

3. 项目配置

`SkillsCompetition -> src -> AppGlobal.vue`

```vue
<script>
// 配置Web程序名称
const WebAppTitle = "Skills Competition"
// 配置Web程序描述
const WebAppDescription = "Skills Competition"
// 配置WebAPI地址
// 注意：此地址为后端API的访问的地址，后端API默认尾缀带 /api
const WebAPI_URL = "http://localhost:9999/api"

export default {
    WebAppTitle,
    WebAppDescription,
    WebAPI_URL
}
</script>
```

4. 启动开发环境测试

```sh
npm run dev
```

5. 打包项目

```sh
npm run build
```

6. 构建到Nginx

