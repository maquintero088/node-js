const serie = require('./serie')
let args = process.argv
let params = {separator:"\t",limit:10}
if(args.length > 2){
    args.shift()
    args.shift()    
    console.log(args)
    if(args.toString().indexOf("serie?=") > -1){        
        let limit = args[0].split('?=')[1] ?? params.limit
        if(limit>0) params.limit = limit
    }
}
serie.fibonacci(params)
    .then(msg=>console.log(msg))
    .catch(error=>console.error(error))