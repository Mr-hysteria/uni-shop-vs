<template>
	<view class="my-search">
		<u-search input-align="center" placeholder="搜索目标内容" v-model="inputword" :showAction="false"></u-search>
	</view>
</template>

<script>
	export default {
		name:"Search",
		data() {
			return {
				inputword:''
			};
		}
	}
</script>

<style lang="scss" scoped>
	.my-search{
		padding: 10rpx 25rpx;
		background-color:  #EA4350;
	}
</style>