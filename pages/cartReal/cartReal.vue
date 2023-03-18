<template>
    <view>
        <!-- 购物车商品列表 -->
        <view class="goods-list">
            <view class="cart-item" v-for="item in cartList" :key="item.goods_id">
                <radio :checked="item.goods_select" color="#EA4350" @click="changeGoods_select(item.goods_id)" />
                <navigator :url="`/pages/goods_detail/goods_detail?goods_id=${item.goods_id}`" class="goods-item">
                    <view class="goods-image">
                        <image :src="item.goods_small_logo || defaultImage" mode="scaleToFill" />
                    </view>
                    <view class="goods-info">
                        <view class="goods-name">{{ item.goods_name }}</view>
                        <view class="goods-price">{{ item.goods_price }}</view>
                    </view>
                </navigator>
                <view class="goods-count">
                    <u-number-box v-model="item.goods_count"  @overlimit="changeList(item.goods_id)"
                        :min="1"></u-number-box>
                </view>
            </view>
        </view>
        <!-- 底部操作栏 -->
        <view class="bottom-bar">
            <!-- 选择 -->
            <view class="select">
                <radio class="select-radio" :checked="isAllSelect" color="#EA4350" @click="changeAllSelect" />
                <text class="select-text">全选</text>
            </view>
            <!-- 总计 -->
            <view class="total">
                <text class="total-name">合计:</text>
                <view class="total-price">{{ total_cost }}</view>
            </view>
            <!-- 结算 -->
            <view class="account" @click="goToPay">
                结算
            </view>
        </view>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            defaultImage: '',
        }
    },
    computed: {
        cartList() {
            return this.$store.state.cartList
        },
        // 全选、总价格
        ...mapGetters(["isAllSelect", "total_cost"])
    },
    methods: {
        // 点击增加减少的时候触发
        changeList(goods_id) {
            this.$store.commit("changeList",goods_id)
        },
        // 选中与否触发
        changeGoods_select(goods_id) {
            this.$store.commit("changeSelect", goods_id)
        },
        // 全选状态改变
        changeAllSelect() {
            this.$store.commit("changeAllSelect")
        },
        // 跳转支付页
        goToPay(){
            if(this.total_cost==0){
                uni.showToast({
                    title: '请选择商品~',
                    icon: 'success',
                    mask: false
                })
            }else{
                uni.navigateTo({ url: '/pages/Pay/Pay' })
            }
        }
    }
}
</script>

<style lang="scss" >
.goods-list {
    padding-bottom: 80rpx;

    .cart-item {
        display: flex;
        position: relative;
        border-bottom: 1rpx solid #e0d2d2;
        padding: 25rpx;
        align-items: center;

        radio {
            padding-right: 10rpx;
        }

        .goods-item {
            display: flex;

            .goods-image {
                margin-right: 29rpx;

                image {
                    height: 190rpx;
                    width: 190rpx;
                }
            }

            .goods-info {
                font-size: 24rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 27rpx;

                .goods-name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .goods-price {
                    color: red;

                    &::before {
                        content: '¥';
                        margin-right: 5rpx;
                    }
                }
            }
        }

        .goods-count {
            position: absolute;
            right: 20rpx;
            bottom: 20rpx;
        }
    }
}

// 底部操作栏
.bottom-bar {
    height: 80rpx;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-top: 1px solid #e0d2d2;
    z-index: 99;
    display: flex;
    padding: 0 20rpx;
    align-items: center;

    .select {

        .select-text {
            font-size: 21rpx;
            margin: 0 20rpx;
            color: #8A8A8A;
            margin-left: 0;
        }
    }

    .total {
        flex: 1;
        display: flex;
        align-items: center;

        .total-name {
            font-size: 26rpx;
            margin-right: 10rpx;
        }

        .total-price {
            color: #EA4350;

            &::before {
                content: '¥';
            }
        }
    }

    .account {
        background-color: #EA4350;
        color: #fff;
        font-size: 22rpx;
        width: 150rpx;
        height: 52rpx;
        border-radius: 26rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}</style>

