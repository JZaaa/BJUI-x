# BJUI-x
BJUI 布局修改

[演示](https://jzaaa.github.io/BJUI-x/)


# 原版
*原项目已停止维护*
原项目地址[BJUI](http://b-jui.com/)

[Fork版本](https://github.com/JZaaa/B-JUI)


## 简介
本项目基于BJUI进行了部分样式修改，并对原BJUI部分插件进行了拓展与bug修复，删除了部分组件

### 项目首页截图

![首页截图](https://github.com/JZaaa/BJUI-x/blob/master/assets/img/index.png)

## 使用
请自行搭建服务器，访问index.html即可

## 文档
- 访问[演示地址](https://jzaaa.github.io/BJUI-x/)
- 自行搭建服务
- 访问[Fork版本](https://github.com/JZaaa/B-JUI)，当前文档与[v1.1.5](https://github.com/JZaaa/BJUI/tree/v1.1.5)基本一致，包含了新增功能


## 兼容
支持IE9+及其他现代浏览器
移动端不完全支持【本项目仅对首页菜单栏添加简单的移动适配】，具体请自行测试


## 更新

- [日志](https://github.com/JZaaa/BJUI/blob/v1.1.5/CHANGELOG.md),除主题功能外，其他基本一致

-----------

- 修复部分bug
- 删除部分无用组件与代码
- 更新bootstrap及相关插件版本为3.3.7
- 更新nice-validator版本为1.1.3
- 更新kindeditor版本为4.1.11

----------------

- 主页面结构重构，菜单栏移至左部，当前版本最多支持二级菜单
- 新增菜单栏移动端适配
- dialog[callback.tabid] 当tabid为空时，刷新本页面，设置为'false'则不刷新
- dialog新增参数 current ,可选参数 navtab | dialog | false，是否在当前navtab/dialog下查找,用于解决某些情况下非ajax调用多窗口id冲突问题
- callback新增直接跳转状态码,可在框架初始化时配置，默认为307，跳转url参数为 callback[forward]
- 添加http错误403处理,默认弹出重新登录窗口
- 修复lookup查找带回插件未实例化前添加newurl无效问题
- 新增 设置.bjui-pageHeader>.pageTitle 自动根据选择菜单添加路径导航功能
- 修复navtab清空查询无法清除排序bug
- 添加navtab高级查询功能(dialog联合navtab查询),待添加演示ing~~
- 重写bjui-slidebar.js插件
