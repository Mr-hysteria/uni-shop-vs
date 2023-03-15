<template>
	<view>
		<!-- 1.搜索框 -->
		<Search />
		<!-- 2.下拉菜单 -->
		<view class="cate">
			<!-- 2.1左边 -->
			<scroll-view scroll-y class="cate-left">
				<view v-for="(item, index) in leftTitleName " :key="index"
					:class="{ titleActive: index == currentTitleIndex }" @click="selectTitle(index)" class="cate-left-item">
					{{ item }}
				</view>
			</scroll-view>
			<!-- 2.2右边 -->
			<scroll-view scroll-y class="cate-right" :scroll-into-view="'anchor'+currentTitleIndex">
				<view :id="'anchor'+currentTitleIndex"></view>
				<view class="group" v-for="(item, index) in rightContent" :key="index">
					<!-- 右侧标题 -->
					<view class="group-title">
						/ {{ item.cat_name }} /
					</view>
					<!-- 右侧内容 -->
					<view class="group-content">
						<navigator 
						v-for="(item2, index) in item.children " 
						:key="index" 
						:url="`/pages/goods_list/goods_list?query=${item2.cat_name}&cid=${item2.cat_id}`">
							<image :src="item2.cat_icon" lazy-load="true"></image>
							<text>{{ item2.cat_name }}</text>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { computed } from 'vue'
export default {
	data() {
		return {
			allMessageList: [],
			currentTitleIndex: 0
		}
	},
	onLoad() {
		this.getCate()
	},
	methods: {
		async getCate() {
			await uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
				method: 'GET',
				success: (res) => {
					// console.log(res)
					this.allMessageList = res.data.message
					// console.log(this.allMessageList)
				}
			})
		},
		selectTitle(index) {
			// console.log(index)
			this.currentTitleIndex = index
		}
	},
	computed: {
		leftTitleName() {
			return this.allMessageList.map((item) => {
				return item.cat_name
			})
		},
		rightContent() {
			// 要做一个判断，不然children是没有这个属性的，要报错
			return this.allMessageList.length > 0 ? this.allMessageList[this.currentTitleIndex].children : []
		}

	}
}
</script>

<style lang="scss" scoped>
.cate {
	display: flex;

	.cate-left {
		width: 182rpx;
		height: calc(100vh - 88rpx);

		.cate-left-item {
			height: 100rpx;
			background-color: #f3f3f3;
			font-size: 28rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.titleActive {
			background-color: white;
			color: #EA4350;

			&::before {
				content: '';
				width: 4rpx;
				height: 44rpx;
				background-color: #EA4350;
				position: absolute;
				left: 0;
			}
		}
	}

	.cate-right {
		height: calc(100vh - 88rpx);
		// background-color: tan;

		.group {
			.group-title {
				font-size: 36rpx;
				text-align: center;
				margin: 5rpx;
			}

			.group-content {
				display: flex;
				flex-wrap: wrap;

				navigator {
					width: 33.3%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					padding: 22rpx 0;

				}

				image {
					width: 120rpx;
					height: 120rpx;
					display: block;
				}

				text {
					font-size: 22rpx;
				}
			}
		}

	}
}
</style>
