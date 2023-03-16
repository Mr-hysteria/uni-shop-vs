<template>
	<view>
		<u-search placeholder="请输入商品" v-model="keyword"></u-search>
		<view class="title">
			<view class="item">商品</view>
			<view class="item">操作</view>
		</view>
		<view class="content">
			<view class="item">手机</view>
			<view class="item">
				<u-number-box></u-number-box>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:''
			}
		},
		onLoad(options) {
			// console.log(this.$store.state.age)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" >
.title,.content{
	display: flex;
	.item{
		flex: 1;
		border: 1rpx solid #ddd;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}
}

</style>
