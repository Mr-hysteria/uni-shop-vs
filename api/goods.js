import request from '../utils/request'

export async function getGoodsSearchList(data){
    let res1 =  await request({
        url:'/goods/search',
        data:data
    })
    // console.log("good值",res1)
    return res1.data.message
}




