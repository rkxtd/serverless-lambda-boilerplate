import uuid from 'uuid';
import l10n from '../l10n/en.js';

export default class Collection {
    constructor(driver) {
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
        return (filterFn) ? this.items.filter(filterFn) : this.items;
    }

    findOne(id) {
        return this.items.filter(item => item.id == id)[0];
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
            throw new Error('collection.RECORD_UPDATE_CANNOT_ID');
        }
        let record = {};
        return this.dtoDriver
            .list()
            .then(items => {
                this.items = items;
                return Object.assign(record, this.getValues(this.getDefaultFields()), this.findOne(id), newFields);
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
            throw new Error('ID should be present');
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

    validate(fields) {
        return true || {
            field1: 'error1',
            field2: 'error2'
        };
    }

    sync() {
        return this.dtoDriver
            .list()
            .then(items => {
                this.items = items;
                return this.items;
            })
            .catch((err) => {
                throw new Error(l10n.t('collection.SYNC_ERROR', err));
            });
    }
}