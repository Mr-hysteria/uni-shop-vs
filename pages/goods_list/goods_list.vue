<template>
    <view>
        <!-- 1.搜索框 -->
        <Search />
        <!-- 2.tabs标签 -->
        <u-tabs :list="tabsList" lineColor="#eb4450"></u-tabs>
        <!-- 商品列表 -->
        <view class="goods-list">
            <view class="goods-item" v-for="item in goodsList" :key="item.goods_id">
                <view class="goods-image">
                    <image :src="item.goods_small_logo" mode="scaleToFill" />
                </view>
                <view class="goods-info">
                    <view class="goods-name">{{ item.goods_name }}</view>
                    <view class="goods-price">{{ item.goods_price }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getGoodsSearchList } from "../../api/goods"
export default {
    data() {
        return {
            queryParams: {},
            tabsList: [{
                name: '综合',
            }, {
                name: '销量',
            }, {
                name: '价格'
            }],
            goodsList: []
        }
    },
    onLoad(options) {
        this.queryParams = options
        this.getGoodsList()
    },
    methods: {
        async getGoodsList() {
            const res = await getGoodsSearchList(this.queryParams)
            console.log("返回的总数据：", res)
            this.goodsList = res.goods

        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list {
    .goods-item {
        display: flex;
        border-bottom: 1rpx;
        padding: 25rpx;

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
}</style>
