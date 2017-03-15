export default {
    t(key, param) {
        const path = key.split('.');
        const translation = (path && path[0] && path[1] && this[path[0]][path[1]]) ? this[path[0]][path[1]] : `${key}*`;

        return `${translation} ${param}`
    },
    collection: {
        SYNC_ERROR: 'Whoops. Something happen during sync. Details: '
    }
}