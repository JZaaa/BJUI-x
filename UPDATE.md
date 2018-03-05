# 更新记录

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
