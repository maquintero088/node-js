global.test = 'Soy un dato global'
var url = "https://wmotor.co/"
function requestUrl(url){
    console.log("requesting:", url, "...")
}
function readRequest(){

}
module.exports.connect_log = requestUrl
module.exports.defaultUrl = url
module.exports = requestUrl

console.log(module)
console.log(__filename)
console.log(__dirname)