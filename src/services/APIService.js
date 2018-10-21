import * as MockData from './dataSource'
export default class APIService {
    static getMethod() {
        return MockData.products;
    }
}
