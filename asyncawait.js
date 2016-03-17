"use strict"

function async(generatorsource) {
 return function(...inputs) {
  let originalthis = this
  return(new Promise(function(resolve, reject) {
   let generator = generatorsource.apply(originalthis, inputs)
   return((function continuer(type, input) {
    if(type != "next" && type != "throw") {
     input = type
     type = "next"
    }
    let result = {}
    try {
     result = generator[type](input)
    } catch(error) {
     reject(error)
     return(error)
    }
    if(result.done) {
     resolve(result.value)
     return(result.value)
    } else {
     return(Promise.resolve(result.value).then(continuer).catch(function(error) {
      continuer("throw", error)
})) } })()) })) } }
