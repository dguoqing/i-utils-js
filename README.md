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

- `GenericUtils`
  该属性主要操作对一些通用的方法集合，例如 深拷贝、去重、类型判断

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
IutilsJs.GenericUtils.checkType('i-utils-js')
```
按需引入
```js
import { GenericUtils } from 'i-utils-js'
GenericUtils.checkType('i-utils-js')
//或者
const { checkType } = GenericUtils
checkType('i-utils-js')
```

# Version

版本号|内容
--|:--:
v1.0.20|DesignMode下增加Events发布订阅者模式


# API
```
类型说明：
参数:类型 => 返回类型
```
## GenericUtils
属性|说明|类型
--|:--:|:--:
checkType|判断数据类型,参数一：要判断的类型，参数二：返回的类型字符串首字母是否为小写，默认false|any => string
isFunc   |是否是函数  |any => boolean
isObj    |是否是对象  |any => boolean
isMap    |是否是字典  |any => boolean
isArray  |是否是数组  |any => boolean
uniqueArray  |数组去重  |Array => Array
deepClone  |深拷贝;参数一：需要拷贝的对象；参数二：布尔值，是否需要深拷贝函数，默认false | (any,boolean) => Object Array
extend  |继承  |Object => Object
containsObj  |判断一个对象的key是否全部存在于另一个对象  |void 0

---

## DomUtils
属性|说明|类型
--|:--:|:--:
hasClass|判断DOM节点上是否有class;el：DOM;className：要判断的class|(el:Dom,className:string) => boolean
addClass   |在el上添加class |(el:Dom,className:string) => void 0
removeClass    |在el上删除class |(el:Dom,className:string) => void 0


---

## DesignMode
属性|说明|类型
--|:--:|:--:
Events|发布订阅模式|类
