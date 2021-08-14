import { request } from './Wrapper'

class API {
    static getSchedule(data) {
        let options = {
            url: '',
            method: 'GET',
            data: {...data}
        }
        return request(options)
    }
}

export default API
