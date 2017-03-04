import config from '../config';
import Users from '../models/Users';
import AWS from 'aws-sdk';
const s3 = new AWS.S3();
// AWS.config.setPromisesDependency(null);

export default class UsersDTO {
    constructor() {
        this.usersResource = {
            Bucket: config.aws.s3,
            Key: 'resources/users.json'
        };
        this.UsersCollection = null;
        this.isUsersLoaded = false;
        this.usersLoadError = null;
    }

    getParams(additionalParams) {
        return Object.assign(this.usersResource, additionalParams);
    }

    fetchUsers(errCB, doneCB, id = null) {
        let me = this;
        if (!this.isUsersLoaded) {
            s3.getObject(this.getParams(), (err, data) => {
                if (err) {
                    me.usersLoadError = err;
                    errCB(this.usersLoadError);
                } else {
                    me.UsersCollection = new Users(JSON.parse(data.Body.toString('utf8')));
                    me.isUsersLoaded = true;
                    if (id) {
                        doneCB(this.UsersCollection.getUser(id));
                    } else {
                        doneCB(this.UsersCollection.getAllUsers());
                    }
                }
            });
        } else {
            if (id) {
                doneCB(this.UsersCollection.getUser(id));
            } else {
                doneCB(this.UsersCollection.getAllUsers());
            }

            return;
        }
    }

    fetchUser(id, errCB, doneCB) {
        this.fetchUsers(errCB, doneCB, id);
    }

    createUser(user, errCB, doneCB) {
        this.fetchUsers(err => errCB(err), users => {
            user.id = Math.floor((Math.random() * 10000000) + 1);
            users.push(user);

            s3.upload(this.getParams({
                Body: JSON.stringify(users)
            }), (err, data) => {
                if (err) {
                    return errCB(err);
                }

                doneCB(JSON.parse(data.Body.toString('utf8')))
            });
        });
    }

    updateUser(userToupdate, errCB, doneCB) {
        let updatedUser = {};
        this.fetchUsers(err => errCB(err), users => {
            users.forEach((user, i)=> {
                if (user.id === userToupdate.id) {
                    updatedUser = users[i] = Object.assign(user, userToupdate);
                }
            });
            s3.upload(this.getParams({
                Body: JSON.stringify(users)
            }), (err, data) => {
                if (err) {
                    return errCB(err);
                }

                doneCB(updatedUser)
            });
        });
    }
}