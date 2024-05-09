const fs_mod = require('fs')
let create=({limit = 8,separator = "\n"})=>{
    return new Promise( (success,failure)=>{ 
        let fibonacci = [0, 1]
        console.log(`${fibonacci[1]}`)
        for (let init = fibonacci.length; init <= limit; init ++){
            fibonacci[init] = fibonacci[init-1] + fibonacci[init-2]
            console.log(`${fibonacci[init]}`)
        }
        fibonacci.shift()
        fs_mod.writeFile('fibonacci.txt',fibonacci.join(separator),(error)=>{
            if(error){
                success(['Error en escritura: ', error])
            }else{
                failure("Archivo escrito correctamente!")
            }
        })
    })
}

module.exports={
    fibonacci: create
}