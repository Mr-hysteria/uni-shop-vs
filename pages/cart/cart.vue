<template>
    <view>
        <u-search placeholder="请输入商品" v-model="keyword" @search="handlerSearch" actionText="添加"
            @custom="handlerSearch"></u-search>
        <view class="title">
            <view class="item">商品</view>
            <view class="item">操作</view>
        </view>
        <view class="content" v-for="item in GoodsList" :key="item.goods_id">
            <view class="item">{{ item.goods_name }}</view>
            <view class="item">
                <u-number-box v-model="item.goods_count" @change="changeList(item.goods_count)"></u-number-box>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            keyword: '',
            goods_name_changeFlag: ''
        }
    },
    computed: {
        GoodsList() {
            return this.$store.state.GoodsList
        }
    },
    // 用监听属性更好
    watch: {
        goods_name_changeFlag() {
            console.log("执行存储")
            uni.setStorageSync('GoodsList', this.$store.state.GoodsList)
        }
    },
    methods: {
        handlerSearch() {
            this.$store.commit("addList", this.keyword)
            // 重置搜索框
            this.keyword = ''
        },
        changeList(val) {
            this.goods_name_changeFlag = val
        }
    }
}
</script>

<style lang="scss" >
.title,
.content {
    display: flex;

    .item {
        flex: 1;
        border: 1rpx solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20rpx;
    }
}
</style>
