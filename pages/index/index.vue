<template>
	<view class="content">
		<!-- 模态框 -->
		<u-modal :show="show" :title="title" @confirm="cancelModal">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
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
				<navigator :url="item2.navigator_url" open-type="item2.open_type" v-for="item2 in item.product_list"
					:key="item2.name">
					<image :src="item2.image_src" :style="{ width: `${item2.image_width}rpx` } "></image>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 模态框内容
			show: true,
			title: '说明',
			content: `<p style="color: red">1.学习所做,仅作为展示,无实际支付功能</p><br>
			          <p>2.主页为静态图片展示(无跳转)</p><br>
					  <p>3.分类页跳转与购物车功能完整</p><br>
					  <p>4.最后附上个人简历</p>`,
			swiperList: [],
			NavList: [],
			floorList: []
		}
	},
	async onLoad() {
		this.getSwiper(),
			this.getNav(),
			this.getFloor()
	},
	onPullDownRefresh() {
		this.swiperList = [],
			this.NavList = [],
			this.floorList = [],
			Promise.all([
				this.getSwiper(),
				this.getNav(),
				this.getFloor(),
			]).then(()=>{
				// console.log("运行成功")
				uni.stopPullDownRefresh()
			})
		
	},
	methods: {
		// 模态框关闭
		cancelModal() {
			this.show = false
		},
		// 请求轮播图
		async getSwiper() {
			await uni.request({
				method: "GET",
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				success: (res) => {
					// console.log("promise对象为:", res.data.message)
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
					// console.log("楼层图:", res.data.message)
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
.floor {
	.floor_title {
		image {
			height: 59rpx;
		}
	}

	.floor_content {
		image {
			float: left;
			height: 188rpx;
			margin-left: 12rpx;
			margin-bottom: 10rpx;
		}

		navigator:first-child image {
			height: 386rpx;
		}
	}

}
</style>
