<template>
	<view>
		<cu-custom bgColor="bg-title-22" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">中核二二招聘</block>
		</cu-custom>

		<view class="cu-list menu margin-top" :class="[menuBorder?'sm-border':'',menuCard?'card-menu':'']">
			<view class="cu-form-group text-bold solid-bottom">
				招聘岗位:
			</view>
			<block v-for="(item,index) in positionList" v-bind:key="index">
				<view class="cu-item" :class="menuArrow?'arrow':''" @tap="goNext" :id='item.id'>
					<view class="action">
						<text class="text-black text-bold">{{item.name}}</text>
					</view>
					<view class="action">
						<text>请填写</text>
					</view>
				</view>

			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuBorder: false,
				menuCard: true,
				menuArrow: true,
				positionList: [{
					id: 1,
					name: '矿物资源管理',
				}, {
					id: 2,
					name: '钢结构工程技术',
				}, {
					id: 3,
					name: '物流管理',
				}, {
					id: 4,
					name: '机电设备维修与管理',
				}, {
					id: 5,
					name: '汉语言文学',
				}, {
					id: 6,
					name: '人力资源管理',
				}, {
					id: 7,
					name: '财务管理',
				}, {
					id: 8,
					name: '法学',
				}, {
					id: 9,
					name: '土木工程',
				}, {
					id: 10,
					name: '工程管理',
				}, {
					id: 11,
					name: '安全工程',
				}, {
					id: 12,
					name: '工程测量',
				}, {
					id: 13,
					name: '测绘工程',
				}, {
					id: 14,
					name: '质量管理',
				}],

			}
		},
		onLoad(e) {
			let pages = getCurrentPages();
			console.info("onload", e, pages)
		},
		onShow() {
			let pages = getCurrentPages();
			console.info("onShow", pages)
		},
		onUnload() {
			let pages = getCurrentPages();
			console.info("onUnload", pages)
		},
		methods: {
			goNext(e) {
				console.info("goNext",e)
				let positionId = e.currentTarget.id
				let position = this.positionList.find(function(item){
					if(item.id == positionId)
						return item
				})
				console.info("goNext",position)
				uni.navigateTo({
					url: "../personalinfo/personalinfo?positionId="+position.id+"&positionName="+position.name
				})
			}
		}
	}
</script>

<style>
	/* page {
		background-color: #0054a2;
	} */
</style>
