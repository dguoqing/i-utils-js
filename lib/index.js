/**
 * @author guoqing.dong
 * @version xx.xx.xx
 * @description 关于通用js的收录以及整合方便日后使用
 */

//一些常用工具函数

import * as fnUtils from './fnUtils/index'
import * as domUtils from './domUtils/index'


//常用工具函数
export const FnUtils = fnUtils;

//dom 操作
export const DomUtils = domUtils;


export default {

  //一些常用工具函数
  FnUtils,

  //DomUtils
  DomUtils
}