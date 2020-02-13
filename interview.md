## bind 函数实现

```js
Function.prototype.bind2 = function(context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function() {};

  var fbound = function() {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  fNOP.prototype = this.prototype;
  fbound.prototype = new fNOP();

  return fbound;
};
```

## call 函数实现

```js
Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')');

  delete context.fn;
  return result;
};
```

## apply 函数实现

```js
Function.prototype.apply = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  }

  delete context.fn;
  return result;
};
```

## 实现快速排序

```js
function quickSort(list) {
  if (list.length < 2) {
    return list;
  }
  const bigger = [],
    smaller = [],
    pivotIndex = Math.floor(Math.random() * list.length);
  const pivot = list[pivotIndex];
  for (let i = 0; i < list.length; i++) {
    if (i === pivotIndex) continue;
    if (list[i] > pivot) {
      bigger.push(list[i]);
    } else {
      smaller.push(list[i]);
    }
  }
  return quickSort[smaller].concat([pivot]).concat(quickSort(bigger));
}
```

## 实现 Promise

```js
class SimplePromise {
  static resolve(value) {
    if (value && value.then) {
      return value;
    }
    return new SimplePromise(resolve => resolve(value));
  }
  static reject(e) {
    return new SimplePromise((resolve, reject) => reject(e));
  }
  constructor(fn) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = '';
    this.resolveFns = [];
    this.rejectFns = [];
    const resolve = value => {
      // 使用setTimeout模拟，实际的Promise实现并不是用的setTimeout
      setTimeout(() => {
        this.status = 'resolved';
        this.value = value;
        this.resolveFns.forEach(item => {
          const { fn, resolve: res } = item;
          res(fn(value));
        });
      });
    };
    const reject = e => {
      setTimeout(() => {
        this.status = 'rejected';
        this.reason = e;
        this.rejectFns.forEach(item => {
          const { fn, reject: rej } = item;
          rej(fn(e));
        });
      });
    };
    fn(resolve, reject);
  }
  then(fn) {
    if (this.status === 'resolved') {
      const result = fn(this.value);
      return SimplePromise.resolve(result);
    } else if (this.status === 'pending') {
      return new SimplePromise((resolve, reject) => {
        this.resolveFns.push({ fn, resolve, reject });
      });
    }
  }
  catch(fn) {
    if (this.status === 'rejected') {
      const err = fn(this.reason);
      return SimplePromise.reject(err);
    } else if (this.status === 'pending') {
      return new SimplePromise((resolve, reject) => {
        this.rejectFns.push({ fn, resolve, reject });
      });
    }
  }
}
```

## 二叉树分层遍历

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (root === null) {
    return [];
  }
  let res = [],
    queue = [];
  queue.push(root);
  while (queue.length > 0) {
    let count = queue.length;
    let list = [];
    while (count > 0) {
      let node = queue.shift();
      if (node.val !== null) {
        list.push(node.val);
      }
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
      count--;
    }
    res.push(list);
  }
  return res;
};
```

## 二叉树前序遍历（非递归）

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let stack = [],
    res = [];
  if (root === null) {
    return res;
  }
  stack.push(root);
  while (stack.length > 0) {
    let node = stack.pop();
    res.push(node.val);
    if (node.right !== null) {
      stack.push(node.right);
    }
    if (node.left !== null) {
      stack.push(node.left);
    }
  }
  return res;
};
```

## 实现事件机制

```js
class Events {
  on(name, callback) {
    const list = this._events[name] || []
    list.push(callback)
    this._events[name] = list
    return this
  },
  off(name, callback) {
    if (!name && !callback) {
      this._events = {}
      return this
    }

    if (!callback) {
      delete this._events[name]
      return this
    }

    const list = this._events[name]
    if (list) {
      this._events[name] = list.filter(item => item !== callback)
    }

    return this
  },
  emit(name, ...data) {
    const list = this._events[name] || []

    list.forEach(item => {
      item(...data)
    })
  },
  attach(obj) {
    for (let attr of ['_events', 'on', 'off', 'emit']) {
      if (obj[attr]) {
        throw Error(`event attach fail, attr '${attr}' exist`)
      }
    }

    obj._events = {}
    obj.on = this.on
    obj.off = this.off
    obj.emit = this.emit
  },
}
```
