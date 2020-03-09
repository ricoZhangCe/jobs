// let workinfoList = [{
// 	id: 1,
// 	wknum: 1,
// 	begindate: '2018-07-01',
// 	enddate: '2019-01-01',
// 	wkunit: '测试单位1',
// 	zw: '职务1',
// 	wkcontent: '测试工作内容1'
// }, {
// 	id: 2,
// 	wknum: 2,
// 	begindate: '2019-07-01',
// 	enddate: '2020-01-01',
// 	wkunit: '测试单位2',
// 	zw: '职务2',
// 	wkcontent: '测试工作内容2'
// }]
let workinfoList = []

export function getWorkinfoList(){
	return workinfoList
}

export function setWorkinfoList(workinfoListNew){
	workinfoList = workinfoListNew
}
