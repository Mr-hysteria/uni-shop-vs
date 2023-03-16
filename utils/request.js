const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

async function request(config){
    console.log("request中收到的参数",config)
     const res =  await uni.request({
        url: baseUrl+config.url,
        data: config.data,
        // 如果没有method默认GET
        method: config.method||'GET',
    })
    return res
    
}

export default request;