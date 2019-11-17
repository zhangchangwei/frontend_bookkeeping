<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<button class="" open-type="getUserInfo" @getuserinfo="getUserInfo" withCredentials="true">授权登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
	var infoCode;
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			uni.login({
				provider:'weixin',
				success:function(res){
					console.log(res);
					infoCode = res.code;
				}
			})
			console.log(this.globel_url);
			this.user_info.nickName = 'breamer';
			// #endif
			

		},
		methods: {
			getUserInfo: function(res) {
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				console.log(res.detail);
				//
				uni.request({
					url: this.globel_url + 'user/wx/info',
					method: 'GET',
					data: {
						jsCode: infoCode
					},
					dataType: 'json',
					success: (res) => {
						console.log(res);
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
