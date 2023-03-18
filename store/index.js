import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
  state: {
    cartList: uni.getStorageSync("cartList") || [],
  },
  getters:{
    // 全选判断
    isAllSelect(state){
      return state.cartList.every((item)=>{return item.goods_select==true})
    },
    // 已选商品总计金额
    total_cost(state){
      // 选中商品的总价格
      let SelectedGoodsList = state.cartList.filter((item)=>{return item.goods_select})
      let sum =0
      SelectedGoodsList.forEach((item2)=>{sum = sum+item2.goods_count*item2.goods_price})
      return sum
    },
    // 已选商品列表
    SelectedGoodsList(state){
      return state.cartList.filter((item)=>{return item.goods_select})
    }
  },
  mutations: {
    // 加入购物车
    addCart(state, payload) {
      const flagIdex = state.cartList.findIndex(
        (obj) => obj.goods_id == payload.goods_id
      );
      if (flagIdex > -1) {
        // 已存在，数量加一
        state.cartList[flagIdex].goods_count += 1;
      } else {
        // 不存在，增加商品
        state.cartList.push({
          // 基本信息
          goods_id: payload.goods_id,
          goods_small_logo: payload.goods_small_logo,
          goods_name: payload.goods_name,
          goods_price: payload.goods_price,
          // 用户可以更改信息
          goods_count: 1,
          goods_select: false,
        });
        uni.setStorageSync("cartList", state.cartList);
      }
    },
    // 改变选中转态
    changeSelect(state, payload) {
      const index = state.cartList.findIndex((obj) => {
        return obj.goods_id == payload;
      });
      state.cartList[index].goods_select =!state.cartList[index].goods_select;
      uni.setStorageSync("cartList", state.cartList);
    },
    // 全选状态切换
    changeAllSelect(state){
      // 如果flag为真，说明已经全选，那么全部变为false
      // 如果flag为假，那么说明部分或者全部都没有选，那么全部设为true
      const flag = state.cartList.every((item)=>{return item.goods_select==true})
      if(flag){
        state.cartList.forEach((item)=>{ item.goods_select=false})
      }else{
        state.cartList.forEach((item)=>{ item.goods_select=true})
      }
    },
    // 增加或删除商品
    changeList(state,goods_id){
      // 
      state.cartList = state.cartList.filter((item)=>{
        return item.goods_id!=goods_id})
      uni.setStorageSync("cartList", state.cartList);
    }
  }
});
export default store;
