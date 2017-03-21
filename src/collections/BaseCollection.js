import uuid from 'uuid';

export default class Collection {
    constructor(driver) {
        if (typeof driver !== 'object') {
            throw new Error('collection.DRIVER_NOT_DEFINED');
        }

        this.filters = {};
        this.items = [];
        this.dtoDriver = driver;
        this.baseModel = () => {
            return {
                id: {
                    required: true,
                    type: 'uuid',
                    default: uuid()
                },
                created: {
                    required: true,
                    type: 'timestamp',
                    default: new Date().getTime()
                },
                modified: {
                    required: true,
                    type: 'timestamp',
                    default: new Date().getTime()
                }
            }
        };

        this.model = () => {
            return {};
        };

    }

    findAll(filterFn) {
        if (typeof filterFn !== 'function') {
            throw new Error('collection.FILTER_FUNCTION_REQUIRED');
        }
        return (filterFn) ? this.items.filter(filterFn) : this.items;
    }

    findOne(id) {
        if (typeof id !== 'string' && typeof id !== 'number') {
            throw new Error('collection.UUID_REQUIRED');
        }
        return this.items.filter(item => item.id == id)[0] || null;
    }

    create(fields) {
        const record = Object.assign({}, this.getValues(this.getDefaultFields()), fields);

        return this.dtoDriver
            .create(record)
            .then(() => {
                return {
                    status: 'collection.CREATE_SUCCESS',
                    record
                }
            }, error => {
                return {
                    status: 'collection.CREATE_ERROR',
                    record,
                    error
                }
            });
    }

    update(id, newFields) {
        if (newFields.id && newFields.id != id) {
            throw new Error('collection.UPDATE_ERROR:ID_CHANGE_FORBIDDEN');
        }
        let record = {};
        return this.dtoDriver
            .list()
            .then(items => {
                const existedRecord = this.findOne(id);
                delete(existedRecord.modified);
                this.items = items;
                return Object.assign(record, this.getValues(this.getDefaultFields()), existedRecord, newFields);
            })
            .then(record => this.dtoDriver.update(record))
            .then(() => {
                return {
                    status: 'collection.UPDATE_SUCCESS',
                    record
                }
            })
            .catch(error => {
                return {
                    status: 'collection.UPDATE_ERROR',
                    record,
                    error
                }
            });
    }

    delete(id) {
        if (!id) {
            throw new Error('collection.DELETE_ERROR:ID_REQUIRED');
        }

        return this.dtoDriver
            .delete({id})
            .then(() => {
                return {
                    status: 'collection.DELETE_SUCCESS',
                    id: {id}
                }
            })
            .catch(error => {
                return {
                    status: 'collection.DELETE_ERROR',
                    id: {id},
                    error: error.message
                }
            });
    }

    getDefaultFields() {
        return Object.assign(this.baseModel(), this.model());
    }

    getValues(fields) {
        const values = {};

        Object.keys(fields).forEach((key) => {
            values[key] = fields[key].value || fields[key].default;
        });

        return values;
    }

    setFields(values) {
        const fields = this.getDefaultFields();

        Object.keys(values).forEach((key) => {
            fields[key].value = values[key];
        });

        return fields;
    }

    sync() {
        return this.dtoDriver
            .list()
            .then(items => {
                this.items = items;
                return this.items;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }
}