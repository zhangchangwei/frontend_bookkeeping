<template>
	<view>
		<view>
			<view class='header'>
				<image src='/static/img/app_face.jpg'></image>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>

			<button class="bottom" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" lang="zh_CN"
			 withCredentials="true">
				授权登录
			</button>
		</view>
		<uni-popup :show="show" :custom="true" :mask-click="false">
			<view class="uni-tip">
				<view class="uni-tip-title">错误</view>
				<view class="uni-tip-content">{{errorMsg}}</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel()">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var infoCode;
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				show: false,
				errorMsg: ''
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			uni.login({
				provider: 'weixin',
				success: function(res) {
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
				// if (!res.detail.iv) {
				// 	uni.showToast({
				// 		title: "您取消了授权,登录失败",
				// 		icon: "none"
				// 	});
				// 	return false;
				// }
				console.log(res.detail);
				uni.request({
					url: this.globel_url + 'user/wx/info',
					method: 'POST',
					data: {
						jsCode: infoCode,
						avatarUrl: res.detail.userInfo.avatarUrl,
						nickName: res.detail.userInfo.nickName
					},
					dataType: 'json',
					success: (obj) => {
						console.log(obj.data);
						var resData = obj.data;
						if (resData.code == 2000) {
							uni.setStorageSync('isFirstLogin', false);
							uni.setStorageSync("token", resData.data.token);
							this.user_info.userId = resData.data.userId;
							this.user_info.nickName = res.detail.userInfo.nickName;
							this.user_info.face = res.detail.userInfo.avatarUrl;
							this.user_info.openId = resData.data.openid;
							uni.reLaunch({
								url: '../main/main',
							});
						} else {
							this.errorMsg = resData.msg;
							this.show = true;
						}
					}
				});
			},
			cancel() {
				this.show = false;
			}
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}

	/* 提示窗口 */
	.uni-tip {
		padding: 15px;
		width: 300px;
		background: #fff;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		padding: 15px;
		font-size: 14px;
		color: #666;
	}

	.uni-tip-group-button {
		margin-top: 10px;
		display: flex;
	}

	.uni-tip-button {
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}
</style>
