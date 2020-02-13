## 单行文本溢出
```css
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
## 双行文本溢出
```css
.ellipsis2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
```

## 三角形
```css
.triangle {
  width: 0;
  height: 0;
  border-top: 20px solid #333;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

## 右箭头 icon
```css
.icon-right {
  display: inline-block;
  width: 18rpx;
  height: 18rpx;
  border-top: 2rpx solid #EF4238;
  border-right: 2rpx solid #EF4238;
  transform: rotate(45deg) scale(0.8);
}
```

## 水平垂直居中
```html
<div class="flexbox-centering">
  <div class="child">Centered content.</div>
</div>
```
```css
.flexbox-centering {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
```