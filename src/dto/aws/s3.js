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
        return Object.assign({}, this.resource, additionalParams);
    }

    list() {
        const params = this.getParams();
        return s3.getObject(params)
            .promise()
            .then(data => {
                return JSON.parse(data.Body.toString('utf8'))
            })
            .catch(err => {
                throw new Error(err.message);
            });
    }

    save(items) {
        return s3.upload(this.getParams({ Body: JSON.stringify(items) })).promise();
    }

    create(item) {
        return this.list()
            .then(items => {
                items.push(item);
                return this.save(items)
            }, error => {
                throw new Error('Failed to receive. Error: ', error.message)
            })
            .then(() => {
                return this.list()
            });
    }

    update(itemToUpdate) {
        return this.list()
            .then(items => {

                items.forEach((item, i) => {
                    if (item.id === itemToUpdate.id) {
                        items[i] = itemToUpdate;
                    }
                });

                return this.save(items)
            })
            .then(() => {
                return this.list()
            });
    }

    delete(itemToDelete) {
        return this.list()
            .then(items => {

                items.forEach((item, i) => {
                    if (item.id == itemToDelete.id) {
                        items.splice(i, 1);
                    }
                });

                return this.save(items)
            })
            .then(() => {
                return this.list()
            });
    }


}