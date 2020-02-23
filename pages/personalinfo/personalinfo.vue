<template>
	<view>
		<cu-custom id="topNode" bgColor="bg-title-22" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">中核二二招聘</block>
		</cu-custom>
		<view id="headNode" class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" v-for="(item,index) in numList" :key="index">
					<text class="num " :class="index>0?'':'text-green'" :data-index="index + 1"></text><text :class="index>0?'':'text-green border-b'">{{item.name}}</text>
				</view>
			</view>
		</view>
		<scroll-view id="scrollNode" :style="{ height: scrollNodeHeight + 'px'}" :scroll-top="scrollTop" scroll-y="true"
		 class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<form>
				<view class="cu-form-group margin-top flex flex-wrap">
					<view class="basis-sm title">应聘职位</view>
					<view class="basis-lg text-bold">
						{{positionName}}
					</view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title"><text class="cuIcon-titles text-green"></text>基本信息</view>
					<view class="text-gray">
						请如实填写个人基本信息
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm  title"><text class='cuIcon-title text-red'></text>姓名</view>
					<view class="basis-lg"><input placeholder="请输入" placeholder-class="text-gray" v-model="pname" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"><text class='cuIcon-title text-red'></text>性别</view>
					<view class="basis-lg picker2" @tap="toggleTab('selectorSex')" :class="sex!=undefined?'':'text-gray'">
						{{sex!=undefined?sex:'请选择'}}
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"><text class='cuIcon-title text-red'></text>出生日期</view>
					<view class="basis-lg picker2" @tap="toggleTab('dateBirthday')" :class="birthday!=undefined?'':'text-gray'">
						{{birthday!=undefined?birthday:'请选择'}}
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"><text class='cuIcon-title text-red'></text>证件号码</view>
					<view class="basis-lg">
						<input placeholder="请输入" placeholder-class="text-gray" v-model="idcard" type="idcard" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"><text class='cuIcon-title text-red'></text>籍贯</view>
					<view class="basis-lg picker2" @tap="toggleTab('regionNativeplace')" :class="nativeplace!=undefined?'':'text-gray'">
						{{nativeplace!=undefined?nativeplace:'请选择'}}
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"><text class='cuIcon-title text-red'></text>政治面貌</view>
					<view class="basis-lg picker2" @tap="toggleTab('selectorZzmb')" :class="zzmb!=undefined?'':'text-gray'">
						{{zzmb!=undefined?zzmb:'请选择'}}
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"><text class='cuIcon-title text-red'></text>外语水平</view>
					<view class="basis-lg">
						<input placeholder="请输入" placeholder-class="text-gray" v-model="wysp" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"> 计算机水平</view>
					<view class="basis-lg">
						<input placeholder="请输入" placeholder-class="text-gray" v-model="jsjsp" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"><text class='cuIcon-title text-red'></text>身高</view>
					<view class="basis-lg">
						<input placeholder="请输入" placeholder-class="text-gray" v-model="pheight" type="digit" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title">爱好</view>
					<view class="basis-lg">
						<input placeholder="请输入" placeholder-class="text-gray" v-model="ah" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title">自我评价</view>
					<textarea maxlength="-1" v-model="zwpj" placeholder="请输入"
					 placeholder-class="text-gray"></textarea>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title"><text class="cuIcon-titles text-green"></text>联系信息</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm  title"><text class='cuIcon-title text-red'></text>手机号码</view>
					<!-- <view class="basis-lg"><input placeholder="请输入" placeholder-class="text-gray" v-model="pname" name="input"></input> </view>-->
					<input placeholder="请输入" placeholder-class="text-gray" v-model="mobile" type="number" name="input"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title">个人邮箱</view>
					<view class="basis-lg">
						<input placeholder="请输入" placeholder-class="text-gray" v-model="mail" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group flex flex-wrap">
					<view class="basis-sm title"><text class='cuIcon-title text-red'></text>QQ号</view>
					<view class="basis-lg">
						<input placeholder="请输入" placeholder-class="text-gray" v-model="qq" type="number" name="input"></input>
					</view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title"><text class="cuIcon-titles text-green"></text>工作经历</view>
					<view class="text-gray">
						请填写大学的实习经历，不填写默认为无实习经历
					</view>
					<view class="detail" v-for="(item,index) in workinfoList" v-bind:key="index">
						<view class="title picker3" @tap="goWorkinfoDetail" :data-id='item.id' :data-num='item.wknum'>{{item.wkunit}}</view>
						<view class="text-gray">{{item.zw}}</view>
						<view class="text-gray">{{item.begindate}} 至 {{item.enddate}}</view>
					</view>
				</view>
				<view class="cu-form-group2 grid col-1">
					<view class="title2 text-green" @tap="goWorkinfo"><text class="cuIcon-add"></text><text class="">添加工作经历</text></view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title"><text class="cuIcon-titles text-green"></text>教育经历<button class="cu-btn2 round text-sm" :class="['lines-red', '']">必填</button></view>
					<view class="text-gray">
						请从最高学历填起
					</view>
				</view>
				<view class="cu-form-group2 grid col-1">
					<view class="title2 text-green" @tap="goEducationinfo"><text class="cuIcon-add"></text><text class="">添加教育经历</text></view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title"><text class="cuIcon-titles text-green"></text>紧急联系人<button class="cu-btn2 round text-sm"
						 :class="['lines-red', '']">必填</button></view>
					<view class="text-gray">
						请填写紧急情况下的联系人、联系电话
					</view>
				</view>
				<view class="cu-form-group2 grid col-1">
					<view class="title2 text-green" @tap="goEmergencyinfo"><text class="cuIcon-add"></text><text class="">添加紧急联系人</text></view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title"><text class="cuIcon-titles text-green"></text>获奖情况</view>
					<view class="text-gray">

					</view>
				</view>
				<view class="cu-form-group2 grid col-1">
					<view class="title2 text-green" @tap="goAwardinfo"><text class="cuIcon-add"></text><text class="">添加获奖情况</text></view>
				</view>
				<view class="cu-form-group margin-top grid col-1">
					<view class="title"><text class="cuIcon-titles text-green"></text>证书/证件</view>
					<view class="text-gray">
						请填写取得的证书或证件
					</view>
				</view>
				<view class="cu-form-group2 grid col-1">
					<view class="title2 text-green" @tap="goCertificateinfo"><text class="cuIcon-add"></text><text class="">添加紧证书/证件</text></view>
				</view>
			</form>
		</scroll-view>
		<view id="bottomNode" class="cu-bar bg-green" @tap="goNext">
			<view class="content text-bold">
				下一步
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
	import {getWorkinfoList} from "../../static/data/workinfo.js"
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				positionId: '1',
				positionName: '矿物资源管理',
				winHeight: undefined,
				topNodeHeight: undefined,
				headNodeHeight: undefined,
				scrollNodeHeight: undefined,
				bottomNodeHeight: undefined,
				pname: undefined,
				sex: undefined,
				birthday: undefined,
				idcard: undefined,
				nativeplace: undefined,
				zzmb: undefined,
				wysp: undefined,
				jsjsp: undefined,
				pheight: undefined,
				ah: undefined,
				zwpj: undefined,
				mobile: undefined,
				mail: undefined,
				qq: undefined,
				emergencypeople: undefined,
				emergencymoble: undefined,
				sexList: [{
					label: "男",
					value: 1
				}, {
					label: "女",
					value: 2
				}],
				zzmbList: [{
					label: "中共党员",
					value: 1
				}, {
					label: "共青团员",
					value: 2
				}, {
					label: "普通居民/群众",
					value: 3
				}, {
					label: "中共预备党员",
					value: 4
				}, {
					label: "民革党员",
					value: 5
				}, {
					label: "民盟盟员",
					value: 6
				}, {
					label: "民建会员",
					value: 7
				}, {
					label: "民进会员",
					value: 8
				}, {
					label: "农工党党员",
					value: 9
				}, {
					label: "致公党党员",
					value: 10
				}, {
					label: "九三学社社员",
					value: 11
				}, {
					label: "台盟盟员",
					value: 12
				}, {
					label: "无党派民主人士",
					value: 13
				}],
				basicsList: [{
					cuIcon: 'usefullfill',
					name: '开始'
				}, {
					cuIcon: 'radioboxfill',
					name: '等待'
				}, {
					cuIcon: 'roundclosefill',
					name: '错误'
				}, {
					cuIcon: 'roundcheckfill',
					name: '完成'
				}, ],
				basics: 0,
				numList: [{
					name: '填写应聘登记表'
				}, {
					name: '上传应聘材料'
				}],
				num: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				workinfoList:getWorkinfoList(),
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
			toggleTab(str) {
				console.info("toggleTab", str)
				this.$refs[str].show();
			},
			onConfirm(val) {
				console.log(val);
				//如果页面需要调用多个mode类型，可以根据mode处理结果渲染到哪里;
				// switch(this.mode){
				// 	case "date":
				// 		break;
				// }
				//this.resultInfo = { ...val};
			},
			onSexConfirm(val) {
				console.log(val);
				this.sex = val.result
			},
			onBirthdayConfirm(val) {
				console.log(val);
				this.birthday = val.result
			},
			onNativeplaceConfirm(val) {
				console.log(val);
				this.nativeplace = val.result
			},
			onZzmbConfirm(val) {
				console.log(val);
				this.zzmb = val.result
			},
			goWorkinfo() {
				uni.navigateTo({
					url: "../workinfo/workinfo?num="+(this.workinfoList.length+1)
				})
			},
			goWorkinfoDetail(e){
				console.info("goWorkinfoDetail",e)
				let id = e.currentTarget.dataset.id
				let num = e.currentTarget.dataset.num
				uni.navigateTo({
					url: "../workinfo/workinfo?num="+num+"&id="+id
				})
			},
			goEducationinfo() {
				uni.navigateTo({
					url: "../educationinfo/educationinfo"
				})
			},
			goEmergencyinfo() {
				uni.navigateTo({
					url: "../emergencyinfo/emergencyinfo"
				})
			},
			goAwardinfo() {
				uni.navigateTo({
					url: "../awardinfo/awardinfo"
				})
			},
			goCertificateinfo() {
				uni.navigateTo({
					url: "../certificateinfo/certificateinfo"
				})
			},
			goNext() {
				uni.navigateTo({
					url: "personalinfo2"
				})
			},
		}
	}
</script>

<style>
	
</style>
