"use strict"

test("name property", function() {
 let result = async(function*something() { })
 if(result.name != "something") {
  throw('should be "something" but is ' + result.name)
} })

test("length property", function() {
 let result = async(function*(first, second, ...others) { })
 if(result.length != 2) {
  throw('should be "2" but is ' + result.length)
} })

test("toString method", function() {
 let result1 = async(function*() { })
 let result2 = result1.toString()
 if(result2 != "async function() { }") {
  throw('should return "async function() { }" but returns ' + result2)
} })

test("returns promise", function() {
 let result1 = async(function*() { })
 let result2 = result1()
 if(typeof(result2.then) != "function" || typeof(result2.catch) != "function") {
  throw('should return a promise but returns ' + result2)
} })

test("returning values resolves promise", function(pass, fail) {
 let result1 = async(function*() {
  return("something")
 })
 result1().then(function(result2) {
  if(result2 == "something") {
   pass()
  } else {
   fail('result should be "something" but is ' + result2)
} }) })

test("throwing errors rejects promise", function(pass, fail) {
 let result = async(function*() {
  throw("something")
 })
 result().then(function(result) {
  fail('should reject but resolved with ' + result)
 }).catch(function(error) {
  if(error == "something") {
   pass()
  } else {
   fail('error should be "something" but is ' + error)
} }) })

test("this value", function(pass, fail) {
 let result = async(function*() {
  if(this == "something") {
   pass()
  } else {
   fail('should be "something" but is ' + this)
 } })
 result.call("something")
})

test("yield awaits promise", function(pass, fail) {
 let result1 = async(function*() {
  let result2 = yield(Promise.resolve("something"))
  if(result2 == "something") {
   pass()
  } else {
   fail('result should be "something" but is ' + result2)
 } })
 result1()
})

test("multiple yields", function(pass, fail) {
 let result1 = async(function*() {
  let result2 = yield(Promise.resolve("something"))
  let result3 = yield(Promise.resolve("something"))
  if(result2 == "something" && result3 == "something") {
   pass()
  } else {
   fail('results should be "something" but are ' + result2 + " and " + result3)
 } })
 result1()
})

test("yield and throw", function(pass, fail) {
 let result1 = async(function*() {
  let result2 = yield(Promise.resolve("something"))
  throw(result2)
 })
 result1().then(function(result) {
  fail('should reject but resolved with ' + result)
 }).catch(function(error) {
  if(error == "something") {
   pass()
  } else {
   fail('error should be "something" but is ' + error)
} }) })

test("try and catch", function(pass, fail) {
 let result1 = async(function*() {
  try {
   let result2 = yield(Promise.reject("something"))
   fail('should reject but resolved with ' + result2)
  } catch(error) {
   if(error == "something") {
    pass()
   } else {
    fail('error should be "something" but is ' + error)
 } } })
 result1()
})