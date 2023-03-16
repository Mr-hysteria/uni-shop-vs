<template>
	<view>
		<!-- 安全区 -->
		<u-status-bar></u-status-bar>
		<!-- 返回箭头 -->
		<navigator open-type="navigateBack" class="navigator-back">
			<u-icon name="arrow-left" color="#fff" size="50rpx"></u-icon>
		</navigator>
		<!-- 1.轮播图 -->
		<view @click="preview">
			<u-swiper :list="GoodsInfo.pics" key-name="pics_big_url" class="my-swiper" indicator indicatorMode="dot"
				circular height="750rpx" width="750rpx" indicatorInactiveColor="rgba(0,0,0,0.5)" indicatorActiveColor="red">
			</u-swiper>
		</view>
		<!-- 2.商品信息 -->
		<view class="goods-info">
			<view class="goods-info-head">
				<view class="price">{{ GoodsInfo.goods_price }}</view>
				<view class="icon-group">
					<u-icon name="share-square" size="44rpx"></u-icon>
					<button open-type="share"></button>
				</view>
			</view>
			<!-- 名称 -->
			<view class="goods-info-name">
				{{ GoodsInfo.goods_name }}
			</view>
		</view>
		<u-gap height="20rpx" bgColor="#F9F9F9"></u-gap>
		<!-- 3.图文详情 -->
		<view class="goods_introduce">
			<view class="goods_introduce_title">图文详情</view>
			<rich-text :nodes="GoodsInfo.goods_introduce" class="goods_introduce_content"></rich-text>
		</view>
	</view>
</template>

<script>
import { getGoodsDetail } from '../../api/goods'
export default {
	data() {
		return {
			GoodsInfo: {},
			queryParams: {},
			// swiperLis:[]
		}
	},
	onLoad(options) {
		// console.log(options)
		this.queryParams = options
		this.getGoodsDetailList()
	},
	methods: {
		async getGoodsDetailList() {
			const res = await getGoodsDetail(this.queryParams)
			console.log("商品详情", res)
			this.GoodsInfo = res
			this.GoodsInfo.goods_introduce = this.GoodsInfo.goods_introduce.replace(/<img/g,'<img class="img"')
			// this.GoodsDetailList = res
		},
		preview() {
			uni.previewImage({
				urls: this.GoodsInfo.pics.map((val) => { return val.pics_big_url })
			})
		}
	}
}
</script>

<style lang="scss">
.navigator-back {
	width: 70rpx;
	height: 70rpx;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	border-radius: 50%;
	left: 50rpx;
	top: 60rpx;
	z-index: 99;
	display: flex;
	justify-content: center;
	align-items: center;
}

.goods-info {
	padding: 20rpx;
	background-color: #fff;

	.goods-info-head {
		display: flex;
		padding-bottom: 20rpx;
		justify-content: space-between;
		.price{
			color: red;
			&::before{
				content: '¥';
				font-size: 80%;
				margin-right: 5rpx;
			}
		}
		// margin-left: 100rpx;
		// margin-right: 80rpx;
		.icon-group{
			width: 44rpx;
			height: 44rpx;
			position: relative;
			margin-right: 10rpx;
			button{
				position: absolute;
				width: 44rpx;
				height: 44rpx;
				left: 0;
				top: 0;
				opacity: 0;
			}
		}
	}
}
.goods_introduce{
	.goods_introduce_title{
		font-size: 28rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.goods_introduce_content{
		.img{
			vertical-align: middle;
		}
	}

}
</style>
