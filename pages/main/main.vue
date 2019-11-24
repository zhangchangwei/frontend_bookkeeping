<template>
	<view class="main-container">
		<view class="top-tar">
			<view class="top-block-left">
				<view class="top-block-text-top">{{selectYear}}年</view>
				<view class="top-block-text">
					<picker mode="date" :value="selectDate" fields="month" @change="bindDateChange">
						<view class="uni-button">{{selectMonth}}月</view>
					</picker>
				</view>
			</view>
			<view class="top-block-mid">
				<view class="top-block-text-top">本月支出(元)</view>
				<view class="top-block-text">{{sumMonthCoast}}</view>
			</view>
			<view class="top-block-right">
				<text class="top-block-text-top">今日支出(元)</text>
				<text class="top-block-text">{{sumTodayCoast}}</text>
			</view>
		</view>
		<view class="main-body">
			<view v-if="listData.length > 0" class="block-demo">
				<view v-for="(item,index) in listData" :key="index" class="block-item">
					<view ref="test" class="example-title">{{item.bookDate}}</view>
					<view class="uni-list">
						<uni-swipe-action v-for="(body,i) in item.keepingBooks" :key="i" :options="deleteOptionName" @click="bindClick(body.id)">
							<uni-list-item :show-arrow="false" :title="body.remark" />
						</uni-swipe-action>
					</view>
				</view>
			</view>
			<view v-if="listData.length < 1" class="block-demo">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	var token;
	export default {
		components: {
			uniSwipeAction,
			uniList,
			uniListItem
		},
		data() {
			return {
				selectYear: '',
				selectMonth: '',
				selectDate: '',
				isFirstLogin: uni.getStorageSync('isFirstLogin'),
				listData: [{
					bookDate: '2019-01-02',
					keepingBooks: [{
						bookCoast: "10.20",
						bookTag: "1",
						id: 1,
						remark: "花钱",
						tagIcon: "/life",
						tagName: "生活",
					}],
					month: "2019-08",
					monthDate: "10日",
					sumCoast: "33.20",
					userId: "1316659983810592",
					weekDate: "星期六"
				}],
				deleteOptionName: [{
					text: '删除'
				}],
				sumMonthCoast: 0,
				sumTodayCoast: 0
			}
		},
		onLoad() {
			// uni.clearStorageSync();
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let paramMonth = month < 10 ? "0" + month : month
			this.selectYear = year;
			this.selectMonth = month;
			this.selectDate = `${year}-${paramMonth}`;
			console.log(this.selectDate)

			if (uni.getStorageSync('isFirstLogin') === '') {
				this.isFirstLogin = true;
			}

			if (this.isFirstLogin) {
				uni.showModal({
					title: '未授权登录',
					content: '您未授权登录，需要登录后才能继续',
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							uni.reLaunch({
								url: '../login/login'
							});
						}
					}
				});
			} else {
				this.getBookKeepingData(this.selectDate);
			}

		},
		onTabItemTap() {
			console.log('allllllllllllllllllllllllllll');
		},
		methods: {
			bindClick(e) {
				console.log(e);
			},
			getBookKeepingData(month) {
				token = uni.getStorageSync("token")
				// #ifdef MP-WEIXIN
				uni.request({
					url: this.globel_url + 'book/test',
					method: 'GET',
					data: {
						month: month
					},
					dataType: 'json',
					header: {
						token: token
					},
					success: (res) => {
						console.log(res);
						this.listData = res.data.data;
					}
				});
				// #endif

				// #ifndef MP-WEIXIN
				uni.request({
					url: this.globel_url + 'book/test',
					method: 'GET',
					data: {
						month: month
					},
					dataType: 'json',
					header: {
						token: token
					},
					success: (res) => {
						console.log(res);
						this.listData = res.data.data;
					}
				});
				// #endif

			},
			bindDateChange(e) {
				console.log(e);
				console.log(e.target.value);
				this.selectDate = e.target.value;
				var dateStrs = this.selectDate.split("-");
				this.selectYear = parseInt(dateStrs[0], 10);
				this.selectMonth = parseInt(dateStrs[1], 10);
				this.getBookKeepingData(this.selectDate);
			}
		}
	}
</script>

<style>
	/* #ifdef MP-WEIXIN */
	.top-tar {
		position: fixed;
		z-index: 999;
		top: 0upx;
		width: 100%;
		height: 120upx;
		background-color: #4CD964;
	}

	/* #endif */
	/* #ifdef H5 */
	.top-tar {
		position: fixed;
		z-index: 999;
		top: 88upx;
		width: 100%;
		height: 120upx;
		background-color: #4CD964;
	}

	/* #endif */

	.top-middle {
		display: inline-block;
		width: 0.1%;
		height: 100%;
		background-color: #000000;
	}

	.top-block-left {
		display: inline-block;
		margin-right: 0.125%;
		width: 23.5%;
		height: 100%;
		background-color: #007AFF;
	}

	.top-block-mid {
		display: inline-block;
		margin-right: 0.125%;
		margin-left: 0.125%;
		width: 38%;
		height: 100%;
		background-color: #007AFF;
	}

	.top-block-right {
		display: inline-block;
		margin-left: 0.125%;
		width: 38%;
		height: 100%;
		background-color: #007AFF;
	}

	.top-block-text-top {
		display: block;
		width: 100%;
		padding-left: 20upx;
		height: 50upx;
		font-size: 28upx;
		text-align: left;
		line-height: 50upx;
	}

	.top-block-text {
		display: block;
		width: 100%;
		height: 70upx;
		font-size: 40upx;
		text-align: center;
		line-height: 70upx;
	}

	.main-body {
		margin-top: 120upx;
		min-height: 1000upx;
		width: 100%;
		z-index: 99999;
		background-color: #F0AD4E;
	}

	.block-demo {
		background-color: #00BFFF;
		width: 100%;
		min-height: 500upx;
		margin-top: 20upx;
	}

	.block-item {
		background-color: #00CE47;
		width: 100%;
	}

	/* #ifdef MP-WEIXIN */
	.example-title {
		display: flex;
		position: sticky;
		top: 120upx;
		z-index: 968;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	/* #endif */

	/* #ifdef H5 */
	.example-title {
		display: flex;
		position: sticky;
		top: 208upx;
		z-index: 968;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	/* #endif */

	.uni-button:after {
		content: '';
		position: absolute;
		left: 17.5%;
		bottom: 24upx;
		width: 0;
		height: 0;
		border-left: 12upx solid #00000000;
		border-right: 12upx solid #00000000;
		border-top: 18upx solid #000000;
		background-color: #ccc0
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}
</style>
