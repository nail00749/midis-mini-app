import Config from '../Config'

export const request = async (options) => {
    let {method, data, url} = options
    let Url = new URL(Config.url + url)
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')
    myHeaders.append('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS')
    myHeaders.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')

    let requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    }

    if (method !== 'GET') {
        requestOptions.body = JSON.stringify(data)
    }
    else if (data) {
        //Object.keys(data).forEach(key => Url.searchParams.append(key, data[key]))
    }
    let response = await fetch(Url.href, requestOptions)
    if (response.status === 200) {
        let result = await response.json()
        console.log(Url.href, result)
        return result
    }
    else {
        console.log('error', response.error)
    }
}
