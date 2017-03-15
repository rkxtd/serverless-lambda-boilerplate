import uuid from 'uuid';
import l10n from '../l10n/en.js';

export default class Collection {
    constructor(driver) {
        this.filters = {};
        this.items = [];
        this.dtoDriver = driver;
        this.baseModel = {
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
        };

        this.model = {};

    }

    findAll(filterFn) {
        return (filterFn) ? this.items.filter(filterFn) : this.items;
    }

    findOne(id) {
        return this.items.filter(item => item.id === id)[0];
    }

    create(fields) {
        const record = Object.assign({}, this.getDefaultFields(), fields);

        return this.dtoDriver
            .create(record)
            .then(() => this.sync())
            .then(() => {
                return {
                    status: 'collection.CREATE_SUCCESS',
                    record
                }
            })
            .catch(error => {
                return {
                    status: 'collection.CREATE_ERROR',
                    record,
                    error
                }
            });
    }

    update(id, newFields) {
        const record = Object.assign({}, this.getDefaultFields(), this.findOne(id), newFields);

        if (newFields.id && newFields.id !== id) {
            throw new Error('collection.RECORD_UPDATE_CANNOT_ID');
        }

        return this.dtoDriver
            .update(record)
            .then(() => this.sync())
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
        const record = this.findOne(id);

        return this.dtoDriver
            .delete(record)
            .then(() => this.sync())
            .then(() => {
                return {
                    status: 'collection.DELETE_SUCCESS',
                    record
                }
            })
            .catch(error => {
                return {
                    status: 'collection.DELETE_ERROR',
                    record,
                    error
                }
            });
    }

    getDefaultFields() {
        return Object.assign(this.baseModel, this.model);
    }

    getValues(fields) {
        const values = {};

        Object.keys(fields).forEach((key) => {
            values[key] = fields[key].value;
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