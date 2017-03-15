import BaseCollection from './BaseCollection';

export default class Users extends BaseCollection {
    constructor(driver) {
        super(driver);
        this.model = {
            firstName: {
                required: true,
                type: 'string',
                regexp: /[a-zA-Z]*/,
                default: 'FirstName'
            },
            lastName: {
                required: true,
                type: 'string'
            },
            age: {
                type: 'number',
                min: 1,
                max: 130,
                default: 1
            },
        }
    }
}