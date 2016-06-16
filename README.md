# Async-Await
Polyfill for async functions and await that allows yield to be used for await.

Usage:

```
var test = async(function*() {
 let result = yield(testpromise())
 return(result)
})

test.then(function(result) {
 console.log(result)
})
```

<a href="https://danielherr.github.io/Async-Await/test.html" target="_blank">Run Tests</a>
