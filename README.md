## 关于i-utils-js

[github地址](https://github.com/dguoqing/i-utils-js)

#### 产生背景
这是关于个人日常比较通用代码的收集，方便日后使用，编写文档为了以后方便查阅

#### package.json命令
发布到yarn(npm也可以下载)
```bash
npm run yarnp
```

#### 功能描述
该方法一共包含以下属性，每个属性收集了对应的方法内容(详细API去源码中查看)

- `FnUtils`
  该属性主要操作对一些常用的方法集合，例如 深拷贝、去重、类型判断

- `DomUtils`
  该属性主要操作DOM常用的方法集合，例如 增加class 判断class 移除class

- `DesignMode`
  该属性主要是一些简单的设计模式，例如 发布订阅模式


# 快速使用
#### 安装 （3.0及以上的版本）
使用npm安装 `i-utils-js` 依赖
```bash
npm i i-utils-js
```
yarn
```hash
yarn add i-utils-js
```
#### 使用
获取所有方法
```js
import IutilsJs from 'i-utils-js'
IutilsJs.FnUtils.checkType('i-utils-js')
```
按需引入
```js
import { FnUtils } from 'i-utils-js'
IutilsJs.FnUtils.checkType('i-utils-js')

