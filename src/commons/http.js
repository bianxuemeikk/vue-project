/**
* http.js
* 封装axios，
* 调用方法:
* http.get('/api/enquiry/web/query',{id:1}).then((res)=>{你的操作})
* http.post('/api/enquiry/web/update',{id:1}).then((res)=>{你的操作})
* http.postFormData('/api/enquiry/web/update',{id:1,file:file}).then((res)=>{你的操作})
*/
/* 在vue项目中，和后台交互获取数据这块，我们通常使用的是axios库，它是基于promise的http库，
//可运行在浏览器端和node.js中。
//他有很多优秀的特性，例如拦截请求和响应、取消请求、转换json、客户端防御cSRF等 */
import axios from 'axios'

export default {
 /**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
 get (url, params) {
   return new Promise((resolve, reject) => {
     axios.get(url, {
       params: params
     }).then(res => {
       resolve(res.data)
     }).catch(err => {
       reject(err)
     })
   })
 },
 /**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
 post (url, params) {
   return new Promise((resolve, reject) => {
     axios.post(url, params)
       .then(res => {
         resolve(res.data)
       })
       .catch(err => {
         reject(err)
       })
   })
 },
 /**
  * postFormData方法，对应post请求，用来提交文件+数据
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
 postFormData (url, params) {
   return new Promise((resolve, reject) => {
     axios({
       headers: {
         'Content-Type': 'multipart/form-data'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
       },
       transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
         const formData = new FormData()
         Object.keys(data).forEach(key => {
           formData.append(key, data[key])
         })
         return formData
       }],
       url,
       method: 'post',
       data: params
     }).then(res => {
       resolve(res.data)
     }).catch(err => {
       reject(err)
     })
   })
 }
}