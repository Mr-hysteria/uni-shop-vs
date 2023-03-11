# [接口文档](https://www.showdoc.cc/128719739414963)

## 搭建项目的页面

| 页面名称     | 名称         |           |
| ------------ | ------------ | --------- |
| 首页         | index        | tabBar 页 |
| 分类页面     | category     | tabBar 页 |
| 商品列表页面 | goods_list   |           |
| 商品详情页面 | goods_detail |           |
| 购物车页面   | cart         | tabBar 页 |
| 收藏页面     | collect      |           |
| 订单页面     | order        |           |
| 搜索页面     | search       |           |
| 个人中心页面 | user         | tabBar 页 |
| 意见反馈页面 | feedback     |           |
| 登录页面     | login        |           |
| 授权页面     | auth         |           |
| 结算页面     | pay          |           |

## 引入字体图标

1. 打开阿里巴巴字体图标 网站
2. 选择的图标
3. 添加至项目
4. 下载到本地
5. 将样式文件 由 css 修改为 wxss
6. 小程序中引入

## 搭建项目tabbar结构

参照之前讲解的小程序基础中的tabbar知识点



# 首页

## 效果

![1554992085370](medias/1554992085370.png)

## 业务逻辑

1. 使用**tabbar** 实现底部导航功能
2. 使用自定义组件的方式 实现 **头部搜索框**
3. 加载 **轮播图** 数据
4. 加载 **导航** 数据
5. 加载 **楼层** 数据

## 接口

1. 获取首页轮播图数据

   ```
   https://api.zbztb.cn/api/public/v1/home/swiperdata
   ```

2. 获取首页分类菜单数据

   ```
   https://api.zbztb.cn/api/public/v1/home/catitems
   ```

3. 获取首页 楼层数据

   ```
   https://api.zbztb.cn/api/public/v1/home/floordata
   ```

## 关键技术

- 小程序内置   `request API`
- es6的`promise`
- 小程序 `swiper` 组件
- 自定义组件 实现 搜索框



# 分类页面

## 效果

![1554995640381](medias/1554995640381.png)

## 业务逻辑

1. 加载分类页面数据
2. 点击左侧菜单，右侧数据动态渲染

## 接口

1. 分类页面数据

   ```json
   https://api.zbztb.cn/api/public/v1/categories
   ```

## 关键技术

- `scroll-view` 组件
- es7的 `async` 和 `await`



## 小程序中支持es7的async语法

es7的`async`号称是解决回调的最终方案

1. 在小程序的开发工具中，勾选 es6转es5语法

2. 下载 facebook的regenerator库中的 [regenerator/packages/regenerator-runtime/runtime.js](https://github.com/facebook/regenerator/blob/5703a79746fffc152600fdcef46ba9230671025a/packages/regenerator-runtime/runtime.js)

3. 在小程序目录下新建文件夹 `lib/runtime/runtime.js`，将代码拷贝进去

4. 在每一个需要使用async语法的页面js文件中，都引入（不能全局引入）

   ```js
   import regeneratorRuntime from '../../lib/runtime/runtime';
   ```

# 商品列表页面

## 效果

![1563783986269](medias/1563783986269.png)



## 业务逻辑

1. 加载商品列表数据
2. 启用下拉页面功能
   1. 页面的json文件中开启设置 `enablePullDownRefresh:true`
   2. 页面的js中，绑定事件 `onPullDownRefresh`
3. 启用上拉页面功能 `onReachBottom` **页面触底事件**
4. 加载下一页功能 


## 接口

1. 商品列表搜索

   ```json
   https://api.zbztb.cn/api/public/v1/goods/search
   ```

## 关键技术

- 小程序配置文件中 **启用上拉** 和**下拉**功能
- **搜索框**和**tab栏**是小程序的**自定义组件**(有组件事件和参数交互)




# 商品详情页面

## 效果

![1563874257233](medias/1563874257233.png)

## 业务逻辑

1. 渲染商品详情数据
2. 点击图片，[调出图片画廊，进行预览](https://developers.weixin.qq.com/miniprogram/dev/api/wx.previewImage.html)
3. 点击收藏 
4. 联系客服
5. 分享功能
6. 加入购物车

## 接口

1. 获取详情数据接口

   ```
   https://api.zbztb.cn/api/public/v1/goods/detail
   ```

2. 加入购物车接口 *使用本地存储来维护购物车数据*

3. 立即购买接口  (相当于是 创建订单接口)

   ```
   https://api.zbztb.cn/api/public/v1/my/orders/create
   ```

## 关键技术

- swiper组件
- 本地存储实现 收藏功能
- **联系客服**  小程序管理后台中 直接添加即可
- 富文本标签 渲染 富文本
- 小程序 预览图片接口

# 收藏页

## 效果

![1555940202983](medias/1555940202983.png)

## 业务逻辑

1. 获取本地存储中的数据进行渲染
2. 点击商品可以跳转到商品详情页面

## 接口

无

## 关键技术

- 小程序 自定义组件
- 本地存储 加载收藏数据

# 购物车页面

## 效果

![1555032768782](medias/1555032768782.png)

## 业务逻辑

1. 渲染购物车数据
2. 添加收货地址
3. 修改商品数量
4. 单选和全选功能

## 接口

1. 获取购物车数据 *本地存储实现*
2. [调用微信的收货地址](https://developers.weixin.qq.com/miniprogram/dev/api/wx.chooseAddress.html)

## 关键技术

- 小程序 选择收货地址 `api`

- 小程序 复选框 组件

  

# 支付页面

## 效果

![1565331397401](medias/1565331397401.png)

## 业务逻辑

1. 获取微信收货地址
2. 渲染购物车中要结算的商品
3. 实现支付
   1. 获取微信的登录信息
   2. 获取自己后台返回的支付相关参数
   3. 调用微信接口实现 支付
   4. 支付成功创建订单
   5. 跳转到订单页面

## 支付流程

![1558716128178](medias/1558716128178.png)

## 接口

1. 获取预支付参数

   ```
   https://api.zbztb.cn/api/public/v1/my/orders/req_unifiedorder
   ```

2. 创建订单

   ```
   https://api.zbztb.cn/api/public/v1/my/orders/create
   ```

3. 更新订单状态

   ```
   https://api.zbztb.cn/api/public/v1/my/orders/chkOrder
   ```

## 关键技术

- 小程序 支付 api 



# 授权页面

## 效果

![1558712512940](medias/1558712512940.png)

## 业务逻辑

![1558712552565](medias/1558712552565.png)

1. 获取用户信息 

   返回  `encryptedData,rawData,iv,signature`

2. 小程序登录  

   返回 `code`

3. 提交数据到自己 的后台 执行post请求 提交数据 

   ```json
   encryptedData,rawData,iv,signature code
   ```

4. 将`token`和用户数据`rawData`存入本地存储



## 接口

1. 提交数据到后台 返回token

   ```json
   https://api.zbztb.cn/api/public/v1/users/wxlogin
   ```

   

# 订单列表页面

## 效果

![1556355053889](medias/1556355053889.png)

## 业务逻辑

1. 根据不同的的状态去加载不同的订单数据
2. 点击标题紧挨着对应数据

## 接口

1. 查询订单数据

   ```
   https://api.zbztb.cn/api/public/v1/my/orders/all
   ```

## 关键技术

- 小程序 自定义组件的 传参  父向子动态传参 `this.selectComponent("#tabs");`

- 时间戳 格式化处理

  

# 搜索页面

## 效果

![1555036722096](medias/1555036722096.png)

## 接口

1. 搜索建议查询

   ```
   https://api.zbztb.cn/api/public/v1/goods/qsearch
   ```

## 业务逻辑

1. 获取输入框的值进行搜索和渲染
2. 点击 **取消** 按钮时 清除输入状态，修改页面模样

## 关键技术

1. 小程序 输入框组件
2. 输入值改变时，为了提高性能，使用 **防抖** 技术 

# 个人中心页面

## 效果

![1555054148665](medias/1555054148665.png)

## 业务逻辑

1.  获取登录信息
2.  加载收藏信息
3.  查询订单状态

## 接口

1. [获取用户信息](https://developers.weixin.qq.com/miniprogram/dev/api/wx.getUserInfo.html?search-key=getuser)

2. 获取收藏数据 *从本地存储中获取*

3. 获取订单数据

   ```
   https://api.zbztb.cn/api/public/v1/my/orders/all
   ```

## 关键技术

1. [css属性filter的使用](https://www.runoob.com/cssref/css3-pr-filter.html)

# 意见反馈页面

## 效果

![1556268645343](medias/1556268645343.png)

## 业务逻辑

1. 点击 `+` 可以选择本地图片，并且显示到页面上

2. 点击 **提交** 可以上传图片到  接口 地址  新浪图床 上

   ```
   https://images.ac.cn/Home/Index/UploadAction/
   ```

3. 点击图片，会移除自己

4. 点击 tab栏的标题，可以切换选中效果

## 接口

无

## 关键技术

1. 自定义组件 tab
2. 自定义组件  图片删除组件
3. 小程序 上传文件  api

