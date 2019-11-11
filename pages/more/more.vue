<template>
	<view class="more-container">
		<view class="more-time">
			<picker mode="date" :value="selectDate" fields="month" @change="bindDateChange">
				<view class="uni-button">{{selectDate}}</view>
			</picker>
		</view>
		<view class="more-body">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" :active-color="activeColor" @clickItem="onClickItem" />
			</view>
			<view class="content">
				<view v-show="current === 0">选项卡1的内容</view>
				<view v-show="current === 1">选项卡2的内容</view>
				<view v-show="current === 2">选项卡3的内容</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: ['选项卡1', '选项卡2', '选项卡3'],
				current: 0,
				activeColor: '#007aff',
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
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index
				}
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
	.more-container {
		background-color: #00BFFF;
		min-height: 1200upx;
	}

	.uni-button {
		text-align: center;
	}

	.more-time {
		background-color: #00CE47;
		height: 52upx;
		position: fixed;
		top: 92upx;
		width: 100%;
	}
	.more-body{
		margin-top: 52upx;
	}

	.segmented-control {
		width: 100%;
		border-radius: 0upx;
	}

	uni-view .segmented-control-item {
		border-left: 0upx solid initial !important;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300upx;
		text-align: center;
	}
</style>
