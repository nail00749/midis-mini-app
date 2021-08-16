import { request } from './Wrapper'

class API {
    static getListGroup(data) {
        let options = {
            url: 'groups',
            method: 'GET',
            data: {...data}
        }
        return request(options)
    }

    static getGroupSchedule(data) {
        let route  = data?.group
        let options = {
            url: `/group/${route}`,
            method: 'GET',
            data: {...data}
        }
        return request(options)
    }
}

export default API
