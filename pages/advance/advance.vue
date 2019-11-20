<template>
	<view class="content">
		<view class="tab" :class="{'active':index==tabIndex}" @tap="toggleTab(item,index)" v-for="(item,index) in tabList" :key="index">{{item.name}}</view>
		<w-picker 
			mode="range" 
			startYear="2017" 
			endYear="2030"
			:defaultVal="['2017','12','31','-','2019','12','31']"
			:current="false"
			@confirm="onConfirm" 
			ref="range" 
			themeColor="#f00"
		></w-picker>
		
		<view class="result">选择结果：{{resultInfo.result}}</view>
		<view class="box">
		            <view class="title">默认效果</view>
		            <t-table @change="change">
		                <t-tr>
		                    <t-th>序号</t-th>
		                    <t-th>姓名</t-th>
		                    <t-th>年龄</t-th>
		                    <t-th>爱好</t-th>
		                </t-tr>
		                <t-tr v-for="item in tableList" :key="item.id">
		                    <t-td>{{ item.id + 1 }}</t-td>
		                    <t-td>{{ item.name }}</t-td>
		                    <t-td>{{ item.age }}</t-td>
		                    <t-td>{{ item.hobby }}</t-td>
		                </t-tr>
		            </t-table>
		        </view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components:{
			wPicker,
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				title: 'Hello',
				startYear:new Date().getFullYear(),
				mode:"range",
				defaultVal:[0,0,0,0,0,0,0],
				tabList:[{
					mode:"range",
					name:"选择区间的日期"
				}],
				tabIndex:0,
				selectList:[{
					label:"男",
					value:0
				},{
					label:"女",
					value:1
				}],
				resultInfo:{
					result:"2019-12-20 10:00:00"
				},
				linkList:[{
					label:"浙江省",
					value:"10",
					children:[{
						label:"杭州市",
						value:"1010",
						children:[{
							label:"滨江区",
							value:"10101"
						},{
							label:"萧山区",
							value:"10102"
						}]
					},{
						label:"宁波市",
						value:"1012",
						children:[{
							label:"海曙区",
							value:"10121"
						},{
							label:"鄞州区",
							value:"10122"
						}]
					}]
				},{
					label:"广东省",
					value:"20",
					children:[{
						label:"广州市",
						value:"2010",
						children:[{
							label:"广州1区",
							value:"20101"
						},{
							label:"广州2区",
							value:"20102"
						}]
					}]
				}],
				tableList: [{
								id: 0,
								name: '张三',
								age: '19',
								hobby: '游泳'
							},
							{
								id: 1,
								name: '李四',
								age: '21',
								hobby: '绘画'
							},
							{
								id: 2,
								name: '王二',
								age: '29',
								hobby: '滑板'
							},
							{
								id: 3,
								name: '码字',
								age: '20',
								hobby: '蹦极'
							}
						]
			}
		},
		computed:{
			
		},
		methods: {
			toggleTab(item,index){
				this.tabIndex=index;
				this.mode=item.mode;
				this.defaultVal=item.value;
				this.$refs[item.mode].show();
			},
			onConfirm(val){
				console.log(val);
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
				this.resultInfo=val;
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
	.tab{
		padding:20upx 0;
		font-size: 32upx;
	}
	.tab.active{
		color:#f00;
	}
	.result{
		margin-top: 100upx;
		font-size: 32upx;
	}
</style>
