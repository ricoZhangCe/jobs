<template>
	<view>
		<cu-custom id="topNode" bgColor="bg-title-22" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">中核二二招聘</block>
		</cu-custom>
		<form>
			<view class="margin-tb-xs margin-left">工作经历({{wknum}})</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm title"><text class='cuIcon-title text-red'></text>工作开始时间</view>
				<view class="basis-lg picker2" @tap="toggleTab('dateBegindate')" :class="workinfo.begindate!=undefined?'':'text-gray'">
					{{workinfo.begindate!=undefined?workinfo.begindate:'请选择'}}
				</view>
			</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm title"><text class='cuIcon-title text-red'></text>工作结束时间</view>
				<view class="basis-lg picker2" @tap="toggleTab('dateEnddate')" :class="workinfo.enddate!=undefined?'':'text-gray'">
					{{workinfo.enddate!=undefined?workinfo.enddate:'请选择'}}
				</view>
			</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm  title"><text class='cuIcon-title text-red'></text>工作单位</view>
				<view class="basis-lg"><input placeholder="请输入" placeholder-class="text-gray" v-model="workinfo.wkunit" name="input"></input>
				</view>
			</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm  title"><text class='cuIcon-title text-red'></text>职务</view>
				<view class="basis-lg"><input placeholder="请输入" placeholder-class="text-gray" v-model="workinfo.zw" name="input"></input>
				</view>
			</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm title">工作内容</view>
				<textarea maxlength="-1"  v-model="workinfo.wkcontent"
				 placeholder="请输入" placeholder-class="text-gray"></textarea>
			</view>
			<view class="padding flex flex-direction" @tap="save">
				<button class="cu-btn bg-green lg">保存</button>
			</view>
		</form>
		<w-picker mode="date" startYear="2017" endYear="2030" defaultVal="20-10-31" :current="false" @confirm="onBegindateConfirm"
		 :disabledAfter="false" ref="dateBegindate" themeColor="#f00"></w-picker>
		<w-picker mode="date" startYear="2017" endYear="2030" defaultVal="2019-10-31" :current="false" @confirm="onEnddateConfirm"
		 :disabledAfter="false" ref="dateEnddate" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	import {getWorkinfoList,setWorkinfoList} from "../../static/data/workinfo.js"
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				wkid: undefined,
				wknum: 1,
				workinfo: {
					id: undefined,
					wknum: undefined,
					begindate: undefined,
					enddate: undefined,
					wkunit: undefined,
					zw: undefined,
					wkcontent: undefined,
				}
			}
		},
		onLoad(e) {
			console.info("workinfo onLoad", e)
			if (e != undefined && e != null) {
				if (e.num != undefined && e.num != null) {
					this.wknum = e.num
				}
				if (e.id != undefined && e.id != null) {
					this.wkid = e.id
				}
			}
			if (this.wkid != undefined && this.wkid != null) {
				this.workinfo = getWorkinfoList().find(x => x.id == this.wkid)
				console.info("workinfo onLoad workinfo", this.workinfo)
			}
			let pages = getCurrentPages()
		},
		methods: {
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
			onBegindateConfirm(val) {
				console.log(val);
				this.workinfo.begindate = val.result
			},
			onEnddateConfirm(val) {
				console.log(val);
				this.workinfo.enddate = val.result
			},
			save() {
				let workinfoList = getWorkinfoList()
				if (this.wkid != undefined && this.wkid != null) {
					let _this=this
					
					let newList = workinfoList.map(function(item) {
						if (item.id == _this.wkid) {
							item = _this.workinfo
							console.info("save item",item)
						}
						return item
					})
					console.info("save", newList, workinfoList)
					setWorkinfoList(newList)
				} else {
					this.workinfo.id = workinfoList.length + 1
					this.workinfo.wknum = workinfoList.length + 1
					workinfoList.push(this.workinfo)
					setWorkinfoList(workinfoList)
					console.info("save",workinfoList)
				}

				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>

</style>
