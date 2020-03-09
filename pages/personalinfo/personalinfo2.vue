<template>
	<view>
		<cu-custom id="topNode" bgColor="bg-title-22" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">中核二二招聘</block>
		</cu-custom>
		<view id="headNode" class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" v-for="(item,index) in numList" :key="index">
					<text class="num" :class="index==0?'':'text-green'" :data-index="index + 1"></text><text :class="index==0?'':'text-green border-b'">{{item.name}}</text>
				</view>
			</view>
		</view>
		<scroll-view id="scrollNode" :style="{ height: scrollNodeHeight + 'px'}" :scroll-top="scrollTop" scroll-y="true"
		 class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<form>
				<view class="cu-form-group bg-blue light">
					<view class="">拍照时请保持光线充足,正对材料方向,对焦后进行拍照,确保图片清晰可见</view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title"><text class='cuIcon-title text-red'></text>个人照片</view>
					<view class="text-gray">
						请上传最近个人全身生活照,不少于2张
					</view>
				</view>
				<view class="cu-form-group padding">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title">简历</view>
					<view class="text-gray">
						请上传个人简历,以上信息填报完整可不上传
					</view>
				</view>
				<view class="cu-form-group padding">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title">健康证原件照片</view>
					<view class="text-gray">
						请上传健康证照片
					</view>
				</view>
				<view class="cu-form-group padding">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title">学历证明</view>
					<view class="text-gray">
						请上传个人成绩单
					</view>
				</view>
				<view class="cu-form-group padding">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</form>
		</scroll-view>
		<view id="bottomNode" class="flex flex-wrap">
			<view class="basis-sm cu-bar text-bold bg-white justify-center" @tap="goBack">
				<view class="">
					上一步
				</view>
			</view>
			<view class="basis-lg cu-bar text-bold bg-green justify-center">
				<view class="">
					提交给HR
				</view>
			</view>
		</view>
		<w-picker mode="selector" :defaultVal="sex" @confirm="onSexConfirm" ref="selectorSex" themeColor="#f00" :selectList="sexList"></w-picker>
		<w-picker mode="date" startYear="2017" endYear="2030" defaultVal="2019-10-31" :current="false" @confirm="onBirthdayConfirm"
		 :disabledAfter="false" ref="dateBirthday" themeColor="#f00"></w-picker>
		<w-picker mode="region" :defaultVal="nativeplace" :areaCode="['42', '4201', '420105']" :hideArea="false" @confirm="onNativeplaceConfirm"
		 ref="regionNativeplace" :timeout="true"></w-picker>
		<w-picker mode="selector" :defaultVal="sex" @confirm="onZzmbConfirm" ref="selectorZzmb" themeColor="#f00" :selectList="zzmbList"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {
		getWorkinfoList
	} from "../../static/data/workinfo.js"
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				winHeight: undefined,
				topNodeHeight: undefined,
				headNodeHeight: undefined,
				scrollNodeHeight: undefined,
				bottomNodeHeight: undefined,
				imgList: [],
			}
		},
		onLoad(e) {
			let pages = getCurrentPages()
			console.info("onload", e, pages)
			if (e != undefined && e != null && e.positionId != undefined) {
				this.positionId = e.positionId
				this.positionName = e.positionName
			}

		},
		onShow() {
			let pages = getCurrentPages()
			console.info("onShow", pages)
		},
		onReady() {
			console.info("onReady")
			let _this = this
			uni.createSelectorQuery().select('#topNode').boundingClientRect(function(rect) {
				_this.topNodeHeight = rect.height
				//console.info(" rect", rect, _this.topNodeHeight)
			}).exec()
			uni.createSelectorQuery().select('#headNode').boundingClientRect(function(rect) {
				_this.headNodeHeight = rect.height
				//console.info(" rect", rect, _this.headNodeHeight)
			}).exec()
			uni.createSelectorQuery().select('#bottomNode').boundingClientRect(function(rect) {
				_this.bottomNodeHeight = rect.height
				//console.info(" rect", rect, _this.bottomNodeHeight)
			}).exec()
			let sys = uni.getSystemInfoSync();

			let winWidth = sys.windowWidth;

			//let winrate = 750 / winWidth;

			//this.winHeight = parseInt(sys.windowHeight * winrate)
			//console.info("onload winHeight", sys.windowHeight,winWidth,winrate,this.winHeight)
			//console.info(" onReady", _this.winHeight,_this.topNodeHeight,_this.winHeight - _this.topNodeHeight)
			this.scrollNodeHeight = sys.windowHeight - _this.topNodeHeight - _this.headNodeHeight - _this.bottomNodeHeight
			//console.info(" onReady", this.scrollNodeHeight,parseInt(this.scrollNodeHeight * winrate))
		},
		onUnload() {
			let pages = getCurrentPages();
			console.info("onUnload", pages)
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				//console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>
