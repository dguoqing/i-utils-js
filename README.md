## 关于i-utils-js



#### 产生背景
这是关于个人日常比较通用代码的收集，方便日后使用，编写文档为了以后方便查阅

#### 功能描述
该方法一共包含以下属性，每个属性收集了对应的方法内容

- `FnUtils`
  该属性主要操作对一些常用的方法集合，例如 深拷贝、去重、类型判断


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

