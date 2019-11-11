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
				<view class="top-block-text">2000000</view>
			</view>
			<view class="top-block-right">
				<text class="top-block-text-top">今日支出(元)</text>
				<text class="top-block-text">99.9</text>
			</view>
		</view>
		<view class="main-body">
			<view v-if="listData.length > 0" class="block-demo">
				<view v-for="(item,index) in listData" :key="index" class="block-item">
					<view ref="test" class="example-title">{{item.time}}</view>
					<view class="uni-list">
						<uni-swipe-action v-for="(body,i) in item.data" :key="i" :options="options1" @click="bindClick">
							<uni-list-item :show-arrow="false" :title="body.text" />
						</uni-swipe-action>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
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
				listData: [{
					time: '2019-01-02',
					data: [{
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}]
				}, {
					time: '2019-01-03',
					data: [{
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}]
				}, {
					time: '2019-01-04',
					data: [{
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}, {
						text: '取消置顶'
					}]
				}],
				options1: [{
					text: '取消置顶'
				}],
				title: 'Hello'
			}
		},
		onLoad() {
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			this.selectYear = year;
			this.selectMonth = month;
			this.selectDate = `${year}-${month}-${day}`;
			console.log(date.getDate());
		},
		methods: {
			bindClick(e) {
				console.log(e)
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				})
			},
			bindDateChange(e) {
				console.log(e);
				console.log(e.target.value);
				this.selectDate = e.target.value;
				var dateStrs = this.selectDate.split("-");
				this.selectYear = parseInt(dateStrs[0], 10);
				this.selectMonth = parseInt(dateStrs[1], 10);
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
