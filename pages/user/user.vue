<template>
	<view>
		<u-notice-bar :text="text1"></u-notice-bar>
		<u-line-progress :percentage="70" activeColor="#19be6b" height="30rpx"></u-line-progress>
		<view class="img">
			<!-- 这个标签vs会报错，但是却是能 -->
			<image :src=img  mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
export default {
    data() {
        return {
            text1:"个人简历目前正在完善中！！个人简历目前正在完善中！！",
			img:"https://636c-cloud1-9gy2vzdo646a58b8-1317354173.tcb.qcloud.la/resume/image/SWJTU.jpg?sign=c4401b5cc559cca1fc051194f6a36727&t=1679229020"
        }
    },
	methods:{

	}
}
</script>

<style lang="scss">
.img{
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>