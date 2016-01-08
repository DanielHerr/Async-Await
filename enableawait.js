"use strict"

function enableawait(generatorsource) {
 return function(...inputs) {
  let generator = generatorsource(...inputs)
  return((function continuer(type, input) {
   if(type != "next" && type != "throw") {
    input = type
    type = "next"
   }
   let result = {}
   try {
    result = generator[type](input)
   } catch(error) {
    return(Promise.reject(error))
   }
   if(result.done) {
    return(result.value)
   } else {
    return(Promise.resolve(result.value).then(continuer).catch(function(error) {
     continuer("throw", error)
})) } })()) } }
