<template>
	<view class="bottom-of-the-page">
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
		<!-- 4。底部操作栏 -->
		<view class="bottom-bar">
			<view class="icon-group">
				<u-icon name="kefu-ermai" color="#333" size="40rpx"></u-icon>
				<view>联系客服</view>
				<button open-type="contact">联系</button>
			</view>
			<view class="icon-group">
				<u-icon name="shopping-cart" color="#333" size="40rpx"></u-icon>
				<view>购物车</view>
				<view class="router">
					<navigator url="/pages/cartReal/cartReal" open-type="switchTab">
					</navigator>
				</view>
			</view>
			<view class="btn" @click="handleAddCart">加入购物车</view>
			<view class="btn" @click="handleBuy">立即购买</view>
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
		// options传过来的是id，字符串形式的
		this.queryParams = options
		this.getGoodsDetailList()
	},
	methods: {
		// 获取商品详情
		async getGoodsDetailList() {
			const res = await getGoodsDetail(this.queryParams)
			this.GoodsInfo = res
			// console.log("商品信息", res)
			this.GoodsInfo.goods_introduce = this.GoodsInfo.goods_introduce.replace(/<img/g, '<img class="img"')
		},
		// 大图查看
		preview() {
			uni.previewImage({
				urls: this.GoodsInfo.pics.map((val) => { return val.pics_big_url })
			})
		},
		// 加入购物车
		handleAddCart() {
			// 把本页商品信息传入vuex，那边进行处理
			this.$store.commit('addCart', this.GoodsInfo)
			uni.showToast({
				title: '加入成功',
				icon: 'success',
				mask: true
			})
		},
		// 立即购买
		handleBuy() {
			// 把本页商品信息传入vuex，那边进行处理
			this.$store.commit('addCart', this.GoodsInfo)
			uni.switchTab({ url: '/pages/cartReal/cartReal' })
		}
	}
}
</script>

<style lang="scss" scoped>
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

		.price {
			color: red;

			&::before {
				content: '¥';
				font-size: 80%;
				margin-right: 5rpx;
			}
		}

		// margin-left: 100rpx;
		// margin-right: 80rpx;
		.icon-group {
			width: 44rpx;
			height: 44rpx;
			position: relative;
			margin-right: 10rpx;

			button {
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

.goods_introduce {
	.goods_introduce_title {
		font-size: 28rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.goods_introduce_content {
		.img {
			vertical-align: middle;
		}
	}

}

.bottom-bar {
	display: flex;
	height: 94rpx;
	align-items: center;
	background-color: #FFFFFF;
	border-top: 1rpx solid #ddd;
	position: fixed;
	left: 0;
	width: 100%;
	bottom: 0;

	.icon-group {
		flex: 1;
		font-size: 22rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: relative;

		button {
			position: absolute;
			opacity: 0;
		}

		.router {
			position: absolute;

			// background-color: pink;
			navigator {
				height: 70rpx;
				width: 70rpx;
			}

		}
	}

	.btn {
		width: 196rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		background-color: #FCAA23;
		align-items: center;
		border-radius: 30rpx;
		margin: 0 10rpx;
		font-size: 26rpx;
		color: #fff;

		&:last-child {
			background-color: #EA4350
		}
	}
}

.bottom-of-the-page {
	padding-bottom: 120rpx;
}
</style>
