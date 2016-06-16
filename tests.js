"use strict"

test("name property", function() {
 let result = async(function*something() { })
 if(result.name != "something") {
  throw('should be "something" but is "' + result.name + '"')
} })

test("length property", function() {
 let result = async(function*(first, second, ...others) { })
 if(result.length != 2) {
  throw('should be "2" but is "' + result.length + '"')
} })

test("returns promise", function() {
 let result1 = async(function*() { })
 let result2 = result1()
 if(typeof(result2.then) != "function" || typeof(result2.catch) != "function") {
  throw('should return a promise but returns "'  + result2 + '"')
} })

test("returning values resolves promise", function() {
 return(new Promise(function(pass, fail) {
  let result1 = async(function*() {
   return("something")
  })
  result1().then(function(result2) {
   if(result2 == "something") {
    pass()
   } else {
    fail('final result should be "something" but is "' + result2 + '"')
   }
  }).catch(function(error) {
   fail('should be resolved but rejected with "' + error + '"')
}) })) })

test("throwing errors rejects promise", function() {
 return(new Promise(function(pass, fail) {
  let result = async(function*() {
   throw("something")
  })
  result().then(function(result) {
   fail('should be rejected but resolved with "' + result + '"')
  }).catch(function(error) {
   if(error == "something") {
    pass()
   } else {
    fail('error should be "something" but is "' + error + '"')
} }) })) })

test("this value", function() {
 return(new Promise(function(pass, fail) {
  let result = async(function*() {
   if(this == "something") {
    pass()
   } else {
    fail('should be "something" but is "' + this + '"')
  } })
  result.call("something")
})) })

test("yield awaits promise", function() {
 return(new Promise(function(pass, fail) {
  let result1 = async(function*() {
   let result2 = yield(Promise.resolve("something"))
   if(result2 == "something") {
    pass()
   } else {
    fail('final result should be "something" but is "' + result2 + '"')
  } })
  result1()
})) })