const jwt_mod = require('jsonwebtoken')
var token = jwt_mod.sign({boss: 'admin'}, 'qcmhash-01')
console.log(token)