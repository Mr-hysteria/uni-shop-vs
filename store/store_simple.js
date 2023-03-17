// 简单版购物车的数据
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
  state: {
    GoodsList: uni.getStorageSync('GoodsList')||[],
  },
  mutations: {
    addList(state, payload) {
      const flagIdex = state.GoodsList.findIndex(
        (obj) => obj.goods_name == payload
      );
      if (flagIdex > -1) {
		// 已存在，数量加一
        state.GoodsList[flagIdex].goods_count += 1;
      } else {
		// 不存在，增加商品
        state.GoodsList.push({
          goods_id: Date.now(),
          goods_count: 1,
          goods_name: payload,
        })
		uni.setStorageSync('GoodsList', state.GoodsList)
      }
    },
  },
});
export default store;
