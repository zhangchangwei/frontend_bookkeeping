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
				<view class="qiun-columns" v-show="current === 0">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
						<view class="qiun-title-dot-light">环形图</view>
					</view>
					<view class="qiun-charts">
						<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchPie($event,'canvasRing')"></canvas>

					</view>

					<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
						<view class="qiun-title-dot-light">环形图</view>
					</view>
				</view>
				<view v-show="current === 1">选项卡2的内容</view>
				<view v-show="current === 2">选项卡3的内容</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	import uCharts from '@/components/u-charts/u-charts.js';

	var canvasObj = {};
	var _self;
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: ['选项卡1', '选项卡2', '选项卡3'],
				current: 0,
				activeColor: '#007aff',
				pie: {
					"series": [{
						"name": "一班",
						"key": "one",
						"data": 50
					}, {
						"name": "二班",
						"key": "two",
						"data": 30
					}, {
						"name": "三班",
						"key": "three",
						"data": 20
					}, {
						"name": "四班",
						"key": "four",
						"data": 18
					}, {
						"name": "五班",
						"key": "five",
						"data": 8
					}]
				},
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
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
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.showRing("canvasRing", this.pie);
			console.log(this.user_info.nickName);
			
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
			},
			showPie(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			showRing(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					padding: [5, 5, 5, 5],
					legend: {
						show: true,
						position: 'right',
						float: 'center',
						itemGap: 10,
						padding: 5,
						lineHeight: 26,
						margin: 5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth: 1
					},
					title: {
						name: '70%',
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
					},
					subtitle: {
						name: '收益率',
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
					},
					extra: {
						pie: {
							lableWidth: 15,
							ringWidth: 40 * _self.pixelRatio, //圆环的宽度
							offsetAngle: 0 //圆环的角度
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: false,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});

			},
			touchPie(e, id) {
				var currentItem;
				canvasObj[id].showToolTip(e, {
					format: function(item) {
						currentItem = item;
						return item.name + ':' + item.data
					}
				});
				console.log(currentItem);
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

	/* #ifdef H5 */


	.more-time {
		background-color: #00CE47;
		height: 52upx;
		position: fixed;
		top: 92upx;
		width: 100%;
		z-index: 998;
	}

	.uni-padding-wrap {
		position: fixed;
		top: 144upx;
		height: 60upx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 998;
	}

	.segmented-control {
		width: 100% !important;
		border-radius: 0upx !important;
		height: 100%;
	}

	/* #endif */

	/* #ifdef MP-WEIXIN */

	.more-time {
		background-color: #00CE47;
		height: 52upx;
		position: fixed;
		top: 0upx;
		width: 100%;
		z-index: 998;
	}

	.uni-padding-wrap {
		position: fixed;
		top: 52upx;
		height: 60upx;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 998;
	}

	.segmented-control {
		width: 100% !important;
		border-radius: 0upx !important;
		height: 100%;
	}


	/* #endif */

	.more-body {
		margin-top: 52upx;
	}



	.qiun-columns {
		display: block;
		width: 100%;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}


	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.content {
		display: block;
		justify-content: center;
		align-items: center;
		height: 300upx;
		margin-top: 112upx;
		text-align: center;
	}
</style>
