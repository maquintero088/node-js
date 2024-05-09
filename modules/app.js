console.log("Hola. Soy un módulo")
/* global scope variables */
setTimeout(()=>console.log("Global timeout"),1000)
clearTimeout()
if(1==2){ setInterval() }
clearInterval()
global.console.log()
/* this.setTimeout(function(){console.log("Global timeout 2")},1000) */
const data = require('./data')
/* global.test += ' Editado'
console.log(global.test) */
/* data = 1; 
data.connect_log('https://google.com') */
data('https://google.com.co')
console.log(module)
const path_mod = require('path')
const path_obj = path_mod.parse(__filename)
console.log(path_obj.name)
const os_mod = require('os')
var free_memory = os_mod.freemem()
var system_memory = os_mod.totalmem()
console.log('Free memory: ', free_memory)
console.log('Total memory: ', system_memory)
const fs_mod = require('fs')
const files_or_dirs = fs_mod.readdirSync('./')
console.log(files_or_dirs)
dirname = './modules' // 'module%s'
fs_mod.readdir(dirname, (error, values)=>{
    if (error) console.error('Error in readdir!', error)
    else console.log('Files or Dirs!', values)
})
const EventEmitter = require('events')
const emitter = new EventEmitter()
/* load listener */
event_name = 'anyLogger'
emitter.on(event_name, (arg)=>console.log('Soy un listener ..!', arg))
/* load event */
emitter.emit(event_name, {id:1, url:'https://network-soft.com'})
const http_mod = require('http')
const server = http_mod.createServer((request, response)=>{
    if(request.url === '/'){
        response.write('Hola soy un Sitio Local')
        response.end()
    }
    if(request.url === '/api/items'){
        response.write(JSON.stringify([{id:1, name:'apple'},{id:2, name:'pear'}]))        
        response.end()
    }
})
port = 3001
/* server.on('connection', (port_used)=>console.log('... Nueva conexión')) */
server.listen(port)
console.log('Server listenning ... :', port)