import uuid from 'uuid';

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
        return (filterFn) ? this.items : this.items.filter(filterFn);
    }

    findOne(id) {
        return this.items.filter(item => item.id === id)[0];
    }

    create(fields) {
        const record = Object.assign({}, this.getDefaultFields(), fields);

        this.dtoDriver.create(record);
        this.sync();
    }

    update(id, fields) {
        const oldRecord = this.dtoDriver.fetchOne(id);
        const record = Object.assign({}, this.getDefaultFields(), oldRecord,  fields);

        this.dtoDriver.update(record);
        this.sync();
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
        this.items = this.dtoDriver.fetchAll(this.filters);
    }
}