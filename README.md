
<!--
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2020-06-15 10:17:14
 * @LastEditors: liuYang
 * @LastEditTime: 2020-06-28 09:32:39
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
--> 
## 🏗Structure

**原则上，你的代码都应该在 src 中完成，如果存在 src 以外的文件符合需求，请联系该项目的管理员添加相应配置或作对应的调整。（你可以先进行修改再通知管理员，以提高效率）**

### 🏠Core libs

- Taro
  版本为当前模板最近更新的时间对应的最新 release 2.2.7
- Redux
  版本为当前模板最近更新的时间对应的最新 release 2.2.7

### 🗄Files

src 文件夹的基本结构如下：

```
src
├── App.js
├── components
├── containers
├── index.js
├── logo.svg
├── pages
├── services.js
├── store
└── utils
```

#### 组件文件结构规范

##### 组件结构

所有的组件都应该遵循如下结构，即便该组件暂时无须样式文件；其中，由于目前还没有单元测试的规范，因而 `index.test.js` 暂时不要求
```
MyComp
├── index.scss
├── index.js
└── index.test.js
```

##### 文件夹结构

- **pages**

  页面（路由）的源码，所有页面级的组件都可以在这里面编写
  - store 关联：👌
  - 全局引用：⛔
  - alias: `@pages`
  - generate command: `yarn g page [PAGENAME]`

- **components**

  一些只用作视觉化数据的全局组件，它们最好都是无状态的

  - store 关联：⛔
  - 全局引用：👌
  - alias: `@components`
  - generate command: `yarn g component [COMPNAME]`

- **layouts**

  应用的基本布局组件，如 sidebar、toolbar、tabbar 等，在页面或路由中根据需要引用它们

  - store 关联：👌
  - 全局引用：👌
  - alias: `@layouts`
  - generate command: `yarn g layout [LAYOUTNAME]`

**PS**：容器组件（包括页面）可以拥有自身作用域下的子组件，但需保证它们不会被该容器以外的其他的组件引用。若需添加子组件，请在该容器下建立 `chilren` 文件夹来存放它们

#### 状态管理中心

目前的项目不会涉及过于复杂的数据流

- **store**

  - alias: `@store`
  - generate command: `yarn g store [STORENAME]`

#### 网络

采用基于 `wx.request` 作为 http 请求库，请在 services 文件夹中查看规范的写法。  
同时，网络请求模块是可替换的，样板代码也非常简洁，因此没有冗余的 generator 实现。

- **services**

  - alias: `@service`

#### 静态资源

存放在 assets 文件夹中，其中，图标文件放在 icons 子文件夹中，其他图片放在 img 文件夹中；其他文件可自行建立子文件夹存放，但文件夹名称需明确

- **assets**

  - alias: `@assets`

#### 工具

一些工具类和工具函数统一编写在 utils 中

- **utils**

  - alias: `@utils`
  - generate command: ☕

#### 配置

一些工具类和工具函数统一编写在 config 中

- **utils**

  - alias: `@config`
  - generate command: ☕

## 🌏Vendors