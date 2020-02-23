<template>
	<view>
		<cu-custom id="topNode" bgColor="bg-title-22" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">中核二二招聘{{pagenum}}</block>
		</cu-custom>
		<form>
			<view class="margin-tb-xs margin-left">工作经历({{wknum}})</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm title"><text class='cuIcon-title text-red'></text>工作开始时间</view>
				<view class="basis-lg picker2" @tap="toggleTab('dateBegindate')" :class="begindate!=undefined?'':'text-gray'">
					{{begindate!=undefined?begindate:'请选择'}}
				</view>
			</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm title"><text class='cuIcon-title text-red'></text>工作结束时间</view>
				<view class="basis-lg picker2" @tap="toggleTab('dateEnddate')" :class="enddate!=undefined?'':'text-gray'">
					{{enddate!=undefined?enddate:'请选择'}}
				</view>
			</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm  title"><text class='cuIcon-title text-red'></text>工作单位</view>
				<view class="basis-lg"><input placeholder="请输入" placeholder-class="text-gray" v-model="wkunit" name="input"></input>
				</view>
			</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm  title"><text class='cuIcon-title text-red'></text>职务</view>
				<view class="basis-lg"><input placeholder="请输入" placeholder-class="text-gray" v-model="zw" name="input"></input>
				</view>
			</view>
			<view class="cu-form-group flex flex-wrap">
				<view class="basis-sm title">工作内容</view>
				<textarea maxlength="-1" :disabled="wkcontent!=null" @input="textareaBInput" v-model="wkcontent" placeholder="请输入"
				 placeholder-class="text-gray"></textarea>
			</view>
			<view class="padding flex flex-direction" @tap="save">
				<button class="cu-btn bg-green lg">保存</button>
			</view>
		</form>	
		<w-picker mode="date" startYear="2017" endYear="2030" defaultVal="20`	<q><q><Q1><<12aqszW@Aq>
			<swa>2qa`f fc</swa>
		</12aqszW@Aq></12aqszW@Aq></Q1></q></q>-10-31" :current="false" @confirm="onBegindateConfirm"
		 :disabledAfter="false" ref="dateBegindate" themeColor="#f00"></w-picker>
		<w-picker mode="date" startYear="2017" endYear="2030" defaultVal="2019-10-31" :current="false" @confirm="onEnddateConfirm"
		 :disabledAfter="false" ref="dateEnddate" themeColor="#f00"></w-picker> 
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				begindate:undefined,
				enddate:undefined,
				wkunit:undefined,
				zw:undefined,
				wkcontent:undefined,
				wknum:1,
				pagenum:0,
			}
		},
		onLoad(e){
			if(e!=undefined && e!=null){
				if(e.wknum!=undefined && e.wknum!=null){
					this.wknum = e.wknum
				}
			}
			let pages = getCurrentPages()
			this.pagenum = pages.length
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
				this.begindate = val.result
			},
			onEnddateConfirm(val) {
				console.log(val);
				this.enddate = val.result
			},
			save(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>
