import AWS from 'aws-sdk';
const s3 = new AWS.S3();

export default class S3Driver {
    constructor(params) {
        this.resource = {
            Bucket: params.bucket,
            Key: params.path
        };
    }

    getParams(additionalParams) {
        return Object.assign(this.resource, additionalParams);
    }

    fetchItems(errCB, doneCB, id = null) {
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

    fetchItem(id, errCB, doneCB) {
        this.fetchUsers(errCB, doneCB, id);
    }

    create(user, errCB, doneCB) {
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

    update(userToUpdate, errCB, doneCB) {
        let updatedUser = {};
        this.fetchUsers(err => errCB(err), users => {
            users.forEach((user, i)=> {
                if (user.id === userToUpdate.id) {
                    updatedUser = users[i] = Object.assign(user, userToUpdate);
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

    delete(userIdToDelete, errCB, doneCB) {
        let deletedUser = {};
        this.fetchUsers(err => errCB(err), users => {
            users.forEach((user, i)=> {
                if (user.id === userIdToDelete) {
                    deletedUser = user;
                    users.splice(i, 1);
                }
            });
            s3.upload(this.getParams({
                Body: JSON.stringify(users)
            }), (err, data) => {
                if (err) {
                    return errCB(err);
                }

                doneCB(deletedUser)
            });
        });
    }
}