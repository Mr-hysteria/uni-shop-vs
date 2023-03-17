import request from '../utils/request'

// 商品列表
export async function getGoodsSearchList(data){
    let res1 =  await request({
        url:'/goods/search',
        data:data
    })
    return res1.data.message
}

// 商品详情
export async function getGoodsDetail(data){
    let res1 =  await request({
        url:'/goods/detail',
        // 有数据就直接data,没有就用自定义对象
        data: Object.keys(data).length > 0 ? data:{goods_id:'17925'} 
    })
    return res1.data.message
}




