## 函数节流

```js
function throttle(fn, gap = 1000) {
  let preTime;
  return function(...args) {
    let curTime = new Date().getTime();
    if (curTime - preTime > gap) {
      preTime = curTime;
      fn.apply(this, args);
    }
  };
}
```

## 函数防抖

```js
function debounce(fn, wait) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, wait);
  };
}
```

## 柯里化

```js
function curry(fn) {
  return function judge(...args) {
    return args.length === fn.length
      ? fn.call(null, ...args)
      : function(...rest) {
          return judge.call(null, ...args, ...rest);
        };
  };
}
```

## 函数组合

```js
function compose(fns) {
  return function(...args) {
    let index = 0;
    let result = fns[index].call(this, ...args);
    while (++index < fns.length) {
      result = fns[index].call(this, result);
    }
    return result;
  };
}
function compose(fns) {
  if (!fns || fns.length === 0) {
    return args => args;
  }
  if (fns.length === 1) {
    return (...args) => {
      fns[1].call(this, ...args);
    };
  }
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}
```

## 寄生组合式继承

```js
function inherit(parent, child) {
  const p = Object.create(parent.prototype);
  child.prototype = p;
  p.constructor = child;
}
```

## Object.keys

```js
function keys(obj) {
  var keys = [];
  if (!this.isObject(obj)) return;
  if (Object.keys) return Object.keys(obj);
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      keys.push(i);
    }
  }
  return keys;
}
```

## 检查文件大小

```js
/**
 * 检查文件大小
 * @param obj 文件对象
 * @param maxSize 文件最大尺寸
 **/
function checkFileSize(obj, maxSize) {
  var fileSize = obj.files[0].size;
  if (fileSize > maxSize) {
    obj.value = '';
    return false;
  }
  return true;
}
```

## 检查文件类型

```js
/**
 * 检查文件类型
 * @param obj 文件对象
 * @param type 允许的类型
 **/
function checkFileType(obj, type) {
  var value = obj.value;
  var dot = value.lastIndexOf('.');
  var fileType = value.substring(dot + 1);
  if (type.indexOf(fileType) !== -1) {
    return true;
  } else {
    obj.value = '';
    return false;
  }
}
```

## 对象转参数字符串

```js
/**
 * 将对象转成参数字符串  {a:1,b:2}  => a=1&b=2
 * @param {Object} data
 * @return {String}
 */
function urlEncode(data, options = {}) {
  const sorted = Boolean(options.sorted);
  const encoded = Boolean(options.encode);
  const encode = value => (encoded ? encodeURIComponent(String(value)) : value);
  const keys = (obj, keyarr = Object.keys(obj)) =>
    sorted ? keyarr.sort() : keyarr;
  const filterjoin = arr => arr.filter(e => e).join('&');
  const nest = (name, value, type = typeof value, f = null) => {
    if (value === f) {
      f = encode(name) + '=' + f;
    } else if (/string|number|boolean/.test(type)) {
      f = encode(name) + '=' + encode(value);
    } else if (type === 'object') {
      f = encode(name) + '=' + JSON.stringify(value);
    }
    return f;
  };
  return data && filterjoin(keys(data).map(key => nest(key, data[key])));
}
```

## 安全取值

```js
/**
 * 安全地获取对象或数组中的某个属性值，作用类似于 lodash.get()
 * @param {string} path - obj 中某个属性的路径：obj.a.b.c
 * @param {Object|Array} obj
 * @param {*} defaultValue - 找不到对应属性值时候返回的默认值
 */
function getPropSafely(path, obj, defaultValue = null) {
  const paths = path.split('.');
  return paths.reduce((prev, curr) => {
    return prev && prev[curr] ? prev[curr] : defaultValue;
  }, obj);
}
```

## 解析参数字符串

```js
function parseQuery(query) {
  if (typeof query !== 'string') {
    return;
  }

  let kv;

  return query.split('&').reduce((obj, item) => {
    kv = item.split('=');
    obj[kv[0]] = kv[1];
    return obj;
  }, {});
}
```

## 根据经纬度计算距离

```js
/**
 * 距离计算函数
 */
function distance(loc1, loc2) {
  let r1 = (loc1.lat * Math.PI) / 180;
  let r2 = (loc2.lat * Math.PI) / 180;
  let a = r1 - r2;
  let b = (loc1.lng * Math.PI) / 180 - (loc2.lng * Math.PI) / 180;
  let s =
    6378.137 *
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin(a / 2) ** 2 +
          Math.cos(r1) * Math.cos(r2) * Math.sin(b / 2) ** 2
      )
    );
  return Math.round(s * 10) / 10;
}
```

## 固定小数点位数

```js
/**
 * 固定小数点位数
 * 5 => 5.00  6.21314 => 6.21
 * @param {Number} value
 * @param {Number} n 位数
 */
function toFixed(value, n) {
  const f = Math.round(value * 10 ** n) / 10 ** n;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    s += '.';
  }
  for (let i = s.length - s.indexOf('.'); i <= n; i++) {
    s += '0';
  }
  return s;
}
```
