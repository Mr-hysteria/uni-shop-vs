<template>
    <view class="wholePage">
        <!-- 模块1.收获地址 -->
        <view class="address" @click="getUserInfo">

            <view class="address-info" v-if="userInfo.userName">
                <u-icon name="bag" size="60rpx"></u-icon>
                <view class="address-info2">
                    <view style="padding-bottom: 20rpx;">{{ FullAddress }}</view>
                    <text style="color: grey;font-size: 30rpx;">{{ userInfo.userName+'  ' }}</text>
                    <text style="color: grey;font-size: 30rpx;">{{ userInfo.telNumber }}</text>
                </view>
            </view>
            <view v-else class="address-btn">
                <view>+地址</view>
            </view>
        </view>
        <!-- 模块2.商品列表 -->
        <view class="goods-list">
            <view>已选商品</view>
            <view class="cart-item" v-for="item in SelectedGoodsList" :key="item.goods_id">
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
                    <view>x{{ item.goods_count }}</view>
                </view>
            </view>
        </view>
        <!-- 模块3.底部操作栏 -->
        <view class="bottom-bar">
            <!-- 总计 -->
            <view class="total">
                <text class="total-name">合计:</text>
                <view class="total-price">{{ total_cost }}</view>
            </view>
            <!-- 结算 -->
            <view class="account" @click="handlerPay">
                去支付
            </view>
        </view>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            userInfo: {}
        }
    },
    computed: {
        // 详细地址
        FullAddress() {
            return this.userInfo.provinceName + this.userInfo.cityName + this.userInfo.countyName + this.userInfo.detailInfo
        },
        //  已选商品列表、总计
        ...mapGetters(["SelectedGoodsList", "total_cost"])
    },
    methods: {
        // 获取用户信息
        async getUserInfo() {
            const res = await uni.chooseAddress()
            console.log(res)
            this.userInfo = res
        },
        // 支付按钮
        async handlerPay() {
            // 0.判断是否填写收货信息，没有则提示输入，并退出支付流程
            if (!this.userInfo.userName) {
                uni.showToast({
                    title: '请输入收货信息',
                    icon: 'none',
                    mask: false,
                })
                return
            }
            // 1.1获取用户信息
            let Info = {}
            await uni.getUserInfo().then((res) => Info = res)
            const { signature, iv, encryptedData, rawData } = Info
            // 1.2获取登录信息
            let logIn = []
            await uni.login().then((res1) => logIn = res1)
            const { code } = logIn
            const data = {
                signature,
                iv,
                encryptedData,
                rawData,
                code
            }
            console.log("Data数据为", data)
            // 2.后面的过程不再模拟
            uni.showToast({
                title: '支付接口尚未完成~',
                icon: 'error',
                mask: false
            })
            return
        }
    }
}
</script>

<style lang="scss">
.wholePage {
    overflow: hidden;
    background-color: #f9f9f9;
}

// 顶部地址
.address {
    background-color: #fff;
    margin: 20rpx;
    // margin-top: 0;
    padding: 20rpx;
    height: 90rpx;
    border-radius: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .address-info {

        display: flex;
        // justify-content: center;
        align-items: center;
        .address-info2{
            padding-left: 60rpx;
        }
    }

    .address-btn {
        width: 303rpx;
        height: 90rpx;
        border-radius: 45rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1rpx solid #EB4450;
        color: #EB4450;
    }
}

// 中部列表
.goods-list {
    padding-bottom: 80rpx;

    .cart-item {
        display: flex;
        position: relative;
        border-bottom: 1rpx solid #e0d2d2;
        padding: 25rpx;
        align-items: center;

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
}
</style>
