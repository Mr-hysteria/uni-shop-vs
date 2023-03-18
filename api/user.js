import request from '../utils/request'

// 用户登录
export async function userWxlogin(data){
    let res1 =  await request({
        methods:"POST",
        url:'/users/wxlogin',
        data:data
    })
    return res1.data.message
}




