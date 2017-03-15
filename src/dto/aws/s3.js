import AWS from 'aws-sdk';
const s3 = new AWS.S3();
AWS.config.setPromisesDependency(null);

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

    list() {
        return s3.getObject(this.getParams())
            .promise()
            .then(data => {
                return JSON.parse(data.Body.toString('utf8'))
            })
            .catch(err => {
                throw new Error(err);
            });
    }

    save(users) {
        return s3.upload(this.getParams({ Body: JSON.stringify(users) })).promise();
    }

    create(item) {
        this.list()
            .then(items => {
                items.push(item);
                return this.save(items)
            });
    }

    update(itemToUpdate) {
        this.list()
            .then(items => {

                items.forEach((item, i) => {
                    if (item.id === itemToUpdate.id) {
                        items[i] = itemToUpdate;
                    }
                });

                return this.save(items)
            });
    }

    delete(itemToDelete) {
        this.list()
            .then(items => {

                items.forEach((item, i) => {
                    if (item.id === itemToDelete.id) {
                        items.splice(i, 1);
                    }
                });

                return this.save(items)
            });
    }


}