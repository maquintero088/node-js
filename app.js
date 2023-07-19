
const debug_mod = require('debug')
const config_mod = require('config')
const express_mod = require('express')
const joi_mod = require('@hapi/joi')
const log_mod = require('./logger')
const auth_mod = require('./auth')
const app = express_mod()
const debug_instances = {
    "testing": debug_mod('app:testing'),
    "coverage": debug_mod('app:coverage')
}
/* WIN: setx /M var value */
/* UNIX: export var=value */
var PORT = process.env.EXPRESS_PORT || 3002
var RESOURCE_PATH = 'resources'
var LOG_LEVEL = false
console.log('Welcome to', config_mod.get('nombre') || 'Express1')
console.log('Environment Variables:', config_mod.get('ENVIRONMENT') || {})
if (config_mod.has('ENVIRONMENT.RESOURCE_PATH')){
    RESOURCE_PATH = config_mod.get('ENVIRONMENT.RESOURCE_PATH') 
    debug_instances.coverage('>> RESOURCE_PATH from config')
}
if (config_mod.has('ENVIRONMENT.LOG_LEVEL')){
    LOG_LEVEL = config_mod.get('ENVIRONMENT.LOG_LEVEL')
    debug_instances.coverage('>> LOG_LEVEL from config')
}
if (config_mod.has('ENVIRONMENT.PORT')){
    PORT = config_mod.get('ENVIRONMENT.PORT')
    debug_instances.coverage('>> PORT from config')
}
app.use(express_mod.json())
app.use(express_mod.urlencoded({extended: true}))
app.use(express_mod.static(RESOURCE_PATH))

if(app.get('env') == 'development' /* && LOG_LEVEL !== false */) {
    app.use(log_mod.morgan(LOG_LEVEL, ()=>{
        debug_instances.testing('> Morgan enabled ...')
    }))
}
// app.use(auth_mod)

const user_schema = joi_mod.object({
    username: joi_mod.string()
        /* .alphanum() */
        .min(3).max(65)
        .required()
})

/* READ */
app.get('/', (request, response) => {
    response.send("Hello, world. It's express")
})
const users = ['qcmarcel', 'maquinterocar', 'visitor']
app.get('/api/users', (request, response) => {
    response.send(users)
})
function getUser(request, response) {
    const user_id = toKeyIndex(request.params.id)
    if (request.query != undefined && Object.keys(request.query).length > 0) {
        console.log(request.query)
    }
    if (isKeyOf(users, user_id.toString())) {
        response.send({ id: request.params.id, nombre: users[user_id] })
    } else {
        response.status(404).send(`User.id ${request.params.id} not found`)
    }
}
app.get('/api/users/:id', getUser)
function filterUsers(filter_query) {
    return Object.fromEntries(Object.entries(users).filter(([, username]) => {
        // console.log(username, user_id)
        return username.toLowerCase().indexOf(filter_query.toLowerCase()) === 0
    }))
}
function getUserBy(request, response) {
    const filter = filterUsers(request.params.filter)
    const results = Object.values(filter)
    // console.log('filter:', filter)
    const user_id = toKeyIndex(request.params.id)
    if (results && isKeyOf(results, user_id.toString())) {
        response.send(results[user_id])
    } else if (request.params?.mode === 'json') {
        response.send(getFromMap(filter, ([user_id, username]) => {
            return { id: parseInt(user_id) + 1, nombre: username }
        }))
    } else {
        response.send(results)
    }
}
app.get('/api/users-by/:filter/:id', getUserBy)
/* CREATE */
app.post('/api/users', (request, response) => {
    const validate_username = user_schema.validate(request.body)
    console.log('validate_username:', validate_username)
    if (validate_username?.error/* != undefined */) {
        response.status(400).send(`Invalid Body: ${validate_username.error?.message}`)
        return false;
    }
    const username = request.body.username
    users.push(username)
    request.params.filter = username
    request.params.mode = "json"
    getUserBy(request, response)
})
/* UPDATE */
app.put('/api/users/:id', (request, response) => {
    const user_id = toKeyIndex(request.params.id)
    const validate_username = user_schema.validate(request.body)
    // console.log('validate_username:', validate_username)
    if (validate_username?.error/* != undefined */) {
        response.status(400).send(`Invalid Body: ${validate_username.error?.message}`)
        return false;
    } else if (!isKeyOf(users, user_id.toString())) {
        response.status(404).send(`User.id ${request.params.id} not found`)
        return false;
    }
    users[user_id] = validate_username.value.username
    getUser(request, response)
})
/* DELETE */
app.delete('/api/users/:id', (request, response) => {
    const user_id = toKeyIndex(request.params.id)
    const user = isKeyOf(users, user_id.toString())
    if (!user) {
        response.status(404).send(`User.id ${request.params.id} not found`)
        return false;
    }
    users.splice(user_id, 1)
    response.send(user)
})
app.listen(PORT, () => {
    console.log("(Express) listening on Port", PORT)
})

function toKeyIndex(value) {
    return parseInt(value) - 1
}

function getFromMap(values, mapper) {
    return Object.entries(values).map(mapper).shift()
}

function isKeyOf(values, key) {
    return Object.keys(values).includes(key) ? values[key]: false
}
