function midd_auth(req, res, next) {
    console.log('Authorize ...', req.params)
    next()
}

module.exports = midd_auth