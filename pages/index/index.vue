<template>
	<view class="content">
		<!-- 1.搜索栏 -->
		<Search />
		<!-- 2.轮播图 -->
		<u-swiper :list="swiperList" key-name="image_src" class="my-swiper" indicator indicatorMode="line" circular
			height="340rpx">
		</u-swiper>
		<!-- 3.导航 -->
		<view class="Nav">
			<navigator v-for="item in NavList" :key="item.name" :url="item.navigator_url" :open-type="item.open_type">
				<image :src="item.image_src"></image>
			</navigator>
		</view>
		<!-- 4.楼层图 -->
		<view class="floor" v-for="item in floorList" :key="item.floor_title.name">
			<!-- 4.1标题 -->
			<view class="floor_title">
				<image :src="item.floor_title.image_src"></image>
			</view>
			<!-- 4.2内容 -->
			<view class="floor_content">
			<view v-for="item2 in item.product_list" :key="item2.name">
				<navigator :url="item2.navigator_url" open-type="item2.open_type">
					<image :src="item2.image_src" :style="{width: `${item2.image_width}rpx`}" mode="widthFix"></image>
				</navigator>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				NavList: [],
				floorList: []
			}
		},
		onLoad() {
			this.getSwiper(),
			this.getNav(),
			this.getFloor()
		},
		methods: {
			// 请求轮播图
			async getSwiper() {
				await uni.request({
					method: "GET",
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
					success: (res) => {
						// console.log("promise对象为:",res.data.message)
						this.swiperList = res.data.message
					}
				})
			},
			// 请求导航
			async getNav() {
				await uni.request({
					url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
					success: (res) => {
						// console.log("导航返回数据:", res.data.message)
						this.NavList = res.data.message
					}
				})
			},
			async getFloor() {
				await uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
					success: (res) => {
						console.log("楼层图:", res.data.message)
						this.floorList = res.data.message
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-swiper {
		width: 750rpx;

	}

	.Nav {
		padding-top: 12rpx;
		padding-bottom: 43rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		image {
			height: 140rpx;
			width: 128rpx;
		}
	}
	// 楼层
	.floor{
		.floor_title{
			image{
				height: 59rpx;
			}
		}
		.floor_content{
			view{
				float: left;
				image{
					min-height:190rpx;
					margin-left: 12rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		
	}
</style>
