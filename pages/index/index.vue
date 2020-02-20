<template>
	<view>
		<form>
			<view class="cu-form-group bg-white text-bold">
				测一测您孩子的身体指标在同龄人中是什么水平
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<view>
					<radio class='blue radio' :class="sex=='1'?'checked':''" :checked="sex=='1'?true:false" value="男" @click="SexClick"
					 :data-sex="1"></radio><text class='margin-left-sm'>男</text>
					<radio class='red radio margin-left' :class="sex=='2'?'checked':''" :checked="sex=='2'?true:false" value="女"
					 @click="SexClick" :data-sex="2"></radio><text class='margin-left-sm'>女</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">年級</view>
				<picker @change="ClassPickerChange" :value="classIndex" :range="classPicker" :range-key="'name'">
					<view class="picker">
						{{classIndex>-1?classPicker[classIndex].name:'请选择'}}
					</view>
				</picker>
			</view>

			<view class="cu-form-group flex title justify-center">
				<view class="">测评项目</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-2 padding-sm">
					<view class="margin-tb-sm text-center" v-for="(item,index) in peitemArray" :key="index" v-if="item.name!='white'">
						<block v-if="peitemIsShow(index)">
							<button class="cu-btn round" :class="peitemIndex==index?'bg-blue':'line-grey'" @click="selPeitem"
							 :data-itemIndex='index'>{{item.name}}</button>
						</block>
					</view>
				</view>
			</view>
			<block v-if="sex>0 && stuClass>0 && peitem.id >= 1"></block>
			<!-- <view class="cu-form-group flex title justify-center">
				<view class="">测评结果</view>
			</view> -->
			<view class="cu-form-group " v-if="peitem.id == 1">
				<view class="title">体重(千克)</view>
				<input placeholder="请输入" name="input" v-model="weight" type="digit"></input>
			</view>
			<view class="cu-form-group " v-if="peitem.id == 1">
				<view class="title">身高(米)</view>
				<input placeholder="请输入" name="input" v-model="height" type="digit"></input>
			</view>
			<view class="cu-form-group flex justify-center">
				<view class="">
					<button class="cu-btn bg-blue " @click="save">获取测评得分</button>
				</view>
			</view>
			<view class="cu-form-group" v-if="peitemScoreFlag">
				<view class="">根据《国家学生体质健康标准》，您小孩<text class="text-red">{{peitem.name}}</text>评分是<text class="text-red">{{peitemScore}}</text>分，<text
					 class="text-red">{{peitemLevel}}</text></view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuClass: -1,
				classIndex: -1,
				classPicker: [{
					id: 1,
					name: '小学一年级'
				}, {
					id: 2,
					name: '小学二年级'
				}, {
					id: 3,
					name: '小学三年级'
				}, {
					id: 4,
					name: '小学四年级'
				}, {
					id: 5,
					name: '小学一年级'
				}, {
					id: 6,
					name: '小学六年级'
				}, {
					id: 7,
					name: '初中一年级'
				}, {
					id: 8,
					name: '初中二年级'
				}, {
					id: 9,
					name: '初中三年级'
				}],
				sex: -1,
				peitem: -1,
				peitemArray: [{
					id: 1,
					name: 'BMI',
					stuSex: [1, 2],
					stuClass: [1, 2, 3, 4, 5, 6]
				}, {
					id: 2,
					name: '肺活量',
					stuSex: [1, 2],
					stuClass: [1, 2, 3, 4, 5, 6]
				}, {
					id: 3,
					name: '50米跑',
					stuSex: [1, 2],
					stuClass: [1, 2, 3, 4, 5, 6]
				}, {
					id: 4,
					name: '坐位体前屈',
					stuSex: [1, 2],
					stuClass: [1, 2, 3, 4, 5, 6]
				}, {
					id: 5,
					name: '一分钟跳绳',
					stuSex: [1, 2],
					stuClass: [1, 2, 3, 4, 5, 6]
				}, {
					id: 6,
					name: '一分钟仰卧起坐',
					stuSex: [1, 2],
					stuClass: [3, 4, 5, 6]
				}, {
					id: 7,
					name: '引体向上',
					stuSex: [1],
					stuClass: [7, 8, 9]
				}, {
					id: 8,
					name: '50米×8往返跑',
					stuSex: [1, 2],
					stuClass: [3, 4, 5, 6]
				}, {
					id: 9,
					name: '1000米',
					stuSex: [1],
					stuClass: [7, 8, 9]
				}, {
					id: 10,
					name: '800米',
					stuSex: [2],
					stuClass: [7, 8, 9]
				}],
				peitemIndex: -1,
				peitemSelFlag: false,
				peitemScoreFlag: false,
				peitemScore: '',
				peitemLevel: '',
				height: null,
				weight: null,
				bmiArray: [{
						stuSex: 1,
						stuClass: 1,
						scores: [{
							score: 100,
							level: '正常',
							min: 13.5,
							max: 18.1
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 13.4
						}, {
							score: 80,
							level: '超重',
							min: 18.2,
							max: 20.3
						}, {
							score: 60,
							level: '肥胖',
							min: 20.4,
							max: 10000
						}]
					},
					{
						stuSex: 1,
						stuClass: 2,
						scores: [{
							score: 100,
							level: '正常',
							min: 13.7,
							max: 18.4
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 13.6
						}, {
							score: 80,
							level: '超重',
							min: 18.5,
							max: 20.4
						}, {
							score: 60,
							level: '肥胖',
							min: 20.5,
							max: 10000
						}]
					},
					{
						stuSex: 1,
						stuClass: 3,
						scores: [{
							score: 100,
							level: '正常',
							min: 13.9,
							max: 19.4
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 13.8
						}, {
							score: 80,
							level: '超重',
							min: 19.5,
							max: 22.1
						}, {
							score: 60,
							level: '肥胖',
							min: 22.2,
							max: 10000
						}]
					},
					{
						stuSex: 1,
						stuClass: 4,
						scores: [{
							score: 100,
							level: '正常',
							min: 14.2,
							max: 20.1
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 14.1
						}, {
							score: 80,
							level: '超重',
							min: 20.2,
							max: 22.6
						}, {
							score: 60,
							level: '肥胖',
							min: 22.7,
							max: 10000
						}]
					},
					{
						stuSex: 1,
						stuClass: 5,
						scores: [{
							score: 100,
							level: '正常',
							min: 14.4,
							max: 21.4
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 14.3
						}, {
							score: 80,
							level: '超重',
							min: 21.5,
							max: 24.1
						}, {
							score: 60,
							level: '肥胖',
							min: 24.2,
							max: 10000
						}]
					},
					{
						stuSex: 1,
						stuClass: 6,
						scores: [{
							score: 100,
							level: '正常',
							min: 14.7,
							max: 21.8
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 14.6
						}, {
							score: 80,
							level: '超重',
							min: 21.9,
							max: 24.5
						}, {
							score: 60,
							level: '肥胖',
							min: 24.6,
							max: 10000
						}]
					},
					{
						stuSex: 2,
						stuClass: 1,
						scores: [{
							score: 100,
							level: '正常',
							min: 13.3,
							max: 17.3
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 13.2
						}, {
							score: 80,
							level: '超重',
							min: 17.4,
							max: 19.2
						}, {
							score: 60,
							level: '肥胖',
							min: 19.3,
							max: 10000
						}]
					},
					{
						stuSex: 2,
						stuClass: 2,
						scores: [{
							score: 100,
							level: '正常',
							min: 13.5,
							max: 17.8
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 13.4
						}, {
							score: 80,
							level: '超重',
							min: 17.9,
							max: 20.2
						}, {
							score: 60,
							level: '肥胖',
							min: 20.3,
							max: 10000
						}]
					},
					{
						stuSex: 2,
						stuClass: 3,
						scores: [{
							score: 100,
							level: '正常',
							min: 13.6,
							max: 18.6
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 13.5
						}, {
							score: 80,
							level: '超重',
							min: 18.7,
							max: 21.1
						}, {
							score: 60,
							level: '肥胖',
							min: 21.2,
							max: 10000
						}]
					},
					{
						stuSex: 2,
						stuClass: 4,
						scores: [{
							score: 100,
							level: '正常',
							min: 13.7,
							max: 19.4
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 13.6
						}, {
							score: 80,
							level: '超重',
							min: 19.5,
							max: 22.0
						}, {
							score: 60,
							level: '肥胖',
							min: 22.1,
							max: 10000
						}]
					},
					{
						stuSex: 2,
						stuClass: 5,
						scores: [{
							score: 100,
							level: '正常',
							min: 13.8,
							max: 20.5
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 13.7
						}, {
							score: 80,
							level: '超重',
							min: 20.6,
							max: 22.9
						}, {
							score: 60,
							level: '肥胖',
							min: 23.0,
							max: 10000
						}]
					},
					{
						stuSex: 2,
						stuClass: 6,
						scores: [{
							score: 100,
							level: '正常',
							min: 14.2,
							max: 20.8
						}, {
							score: 80,
							level: '低体重',
							min: 0,
							max: 14.1
						}, {
							score: 80,
							level: '超重',
							min: 20.9,
							max: 23.6
						}, {
							score: 60,
							level: '肥胖',
							min: 23.7,
							max: 10000
						}]
					}
				]
			};
		},
		methods: {
			SexClick(e) {
				this.sex = e.currentTarget.dataset.sex
				this.peitemScoreFlag = false
			},
			ClassPickerChange(e) {
				// console.info(e, e.detail.value)
				this.classIndex = e.detail.value
				if (this.classIndex == -1) {
					this.classIndex = 0
				}
				this.stuClass = this.classPicker[this.classIndex].id
				this.peitemScoreFlag = false
			},
			peitemIsShow(index) {
				// console.info(index, this.stuClass)
				let peitem = this.peitemArray[index]
				// console.info(peitem)
				if (this.sex < 0 || this.stuClass < 0 || (peitem.stuSex.indexOf(parseInt(this.sex)) > -1 && peitem.stuClass.indexOf(
						parseInt(this.stuClass)) > -1)) {
					return true
				} else {
					return false
				}
			},
			selPeitem(e) {
				console.info(e)
				let itemindex = e.currentTarget.dataset.itemindex
				this.peitem = this.peitemArray[itemindex]
				this.peitemIndex = itemindex
				this.peitemSelFlag = true
				this.peitemScoreFlag = false
				console.info(this.peitem)
			},
			chkPeitemSelFlag() {
				if (this.sex > 0 && this.stuClass > 0 && this.peitemSelFlag) {
					console.info(this.peitem, this.sex, this.stuClass)
					if (this.peitem.stuSex.indexOf(parseInt(this.sex)) > -1 && this.peitem.stuClass.indexOf(parseInt(this.stuClass)) >
						-1) {
						return true
					}
				}
				return false
			},
			save() {
				if (this.sex < 0) {
					uni.showToast({
						title: "请选择性别",
						icon: "none",
						duration: 2000
					})
					return
				} else if (this.stuClass < 0) {
					uni.showToast({
						title: "请选择年级",
						icon: "none",
						duration: 2000
					})
					return
				} else if (!this.chkPeitemSelFlag()) {
					uni.showToast({
						title: "请选择测评项目",
						icon: "none",
						duration: 2000
					})
					return
				}
				//BMI
				if (this.peitem.id == 1) {
					if (this.weight == null || this.weight <= 0) {
						uni.showToast({
							title: "请输入体重",
							icon: "none",
							duration: 2000
						})
						return
					}
					if (this.height == null || this.height <= 0) {
						uni.showToast({
							title: "请输入身高",
							icon: "none",
							duration: 2000
						})
						return
					}
					console.info(this.weight, this.height)
					let score = parseFloat((this.weight / (this.height * this.height)).toFixed(1))
					this.getBmi(score)
				}

			},
			getBmi(score) {
				console.info("getBmi", score)
				this.bmiArray.forEach(x => {
					// console.info(x, this.sex == x.stuSex, this.stuClass == x.stuClass)
					if (this.sex == x.stuSex && this.stuClass == x.stuClass) {
						let scores = x.scores
						console.info("scores", scores)
						scores.forEach(xx => {
							console.info(xx, xx.min <= parseFloat(score), xx.max >= parseFloat(score))
							if (xx.min <= parseFloat(score) && (xx.max == 10000 || xx.max >= parseFloat(score))) {
								this.peitemScore = xx.score
								this.peitemLevel = xx.level
							}
						})
					}
				})
				this.peitemScoreFlag = true
			}
		}
	}
</script>

<style>
	page {
		background-color: white;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
