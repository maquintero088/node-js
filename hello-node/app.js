function hello(name){ 
    console.log("Hello", name, "!")
}
hello("Marcel")
/* variables ES5*/
var nombre = "Marcel"
console.log(nombre)
nombre = "Armando"
console.log("ES5: " + nombre)
/* variables ES6+ */
const nombre_6 = "Luis"
let edad = 26
console.log("ES6+:", nombre_6)
// nombre_6 = "Armando"
edad = 27
console.log(edad)
/* funciones flecha */
/* ES5 */
const years = [1995, 2000, 2005, 2008, 2012]
var edad_5 = years.map(
    function (year){
     return new Date().getFullYear() - year
    }
);
console.log("ES5: " + edad_5)
/* ES6+ */
const year_now = new Date().getFullYear()
const edad_6 = years.map(year => year_now - year)
console.log("ES6+:", edad_6)
/* Funciones callback */
function Mensaje(callback){
    console.log("Antes del Callback ... ")
    callback()
}
function Saludo(){
    console.log("Hola. Soy una función")
}
Mensaje(Saludo)
function Sumar(valor1, valor2, callback){
    callback(valor1 + valor2)
}
function Mostrar(valor){
    console.log(valor)
}
function Retornar(valor){
    return valor;
}
Sumar(1, 3, (result=Retornar)=>setTimeout(
    ()=>Mostrar(result), result*1000))
const promesa = new Promise((resolve, rejected)=>{
    setTimeout(()=>false ? resolve("Cumple promesa!") 
                        : rejected("Error en promesa invocada!"), 3000)
})
function mensajeAsync(){
    return new Promise((resolve, rejected)=>{
        setTimeout(()=>true ? resolve("Cumple!") 
                            : rejected("Error en promesa!"), 3000)
                        })
}
async function callAsync(){
    console.log("Llamando ...")
    const resultado = await mensajeAsync()
    return resultado
}
callAsync().then(mensaje=>console.log(mensaje))
        .catch(error=>console.error(error))
promesa.then(mensaje=>console.log(mensaje))
        .catch(error=>console.error(error))