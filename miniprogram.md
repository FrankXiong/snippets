## wx2promise

```js
function wx2promise(fn, params) {
  params = params || {};
  return new Promise((accept, reject) => {
    params.success = accept;
    params.fail = reject;
    fn(params);
  });
}
```
