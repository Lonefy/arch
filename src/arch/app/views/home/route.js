
export default (paths) => ({
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const welcome = require('./index.js').default;
            cb(null, welcome)
        }, 'home')
    },
})
