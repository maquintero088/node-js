const morgan_mod = require('morgan')
const MORGAN_LOG_LEVELS = ['tiny']

function midd_log(req, res, next) {
    console.log('logging in:', req.url)
    next()
}

function morgan_log(type=0, postVoid=false){
    const instance = morgan_mod(MORGAN_LOG_LEVELS[type] || 'tiny')
    if (postVoid){
        if (postVoid.constructor.name === 'Function'){
            postVoid()
        }
    }else{
        console.log('morgan enebled ...')
    }
    return instance
}

module.exports = {
    log: midd_log,
    morgan: morgan_log
}