"use strict"

function async(generatorsource) {
 let asyncfunction = function(...inputs) {
  let originalthis = this
  return(new Promise(function(resolve, reject) {
   let generator = generatorsource.apply(originalthis, inputs)
   function proceed(type = "next" || "throw", input) {
    let result
    try {
     if(type == "throw") {
      result = generator.throw(input)
     } else {
      result = generator.next(input)
     }
    } catch(error) {
     reject(error)
    }
    if(result.done) {
     resolve(result.value)
    } else {
     Promise.resolve(result.value).then(function(result) {
      proceed("next", result)
     }).catch(function(error) {
      proceed("throw", error)
   }) } }
   return(proceed("next"))
 })) }
 Object.defineProperties(asyncfunction, {
  name: {
   value: generatorsource.name, configurable: true
  }, length: {
   value: generatorsource.length, configurable: true
 } })
 return(asyncfunction)
}