export default class Users {
    constructor(users) {
        this.users = users;
    }

    getUser(id) {
        let result = {};

        this.users.forEach(function(record) {
            if (record.id === id) {
                result = record;
                return false;
            }
        });

        return result;
    }

    getAllUsers() {
        return this.users;
    }
}