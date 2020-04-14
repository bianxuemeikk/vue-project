export const getcount = state=>{
	return state.count;
}
export const nameInfo = state => {
	return "姓名:"+state.name
}
export const fullInfo = (state,getters)=>{
	return getters.nameInfo+'年龄:'+state.age
} 