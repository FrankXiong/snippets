(function(self) {
    function _createAssigner(keyFunc) {
        return function(obj) {
            var len = arguments.length;
            if (len < 2 || obj === null) return obj;
            for (var i = 1; i < len; i++) {
                var source = arguments[i];
                var keys = keyFunc(source);
                var l = keys.length;
                for (var j = 0; j < l; j++) {
                    var key = keys[j];
                    if (obj[key] === undefined) {
                        obj[key] = source[key];
                    }
                }
            }
            return obj;
        }
    }
    var _ = {
        text : function(e){
            var t="";
            e=e.childNodes||e;
            for(var j=0;j<e.length;j++){
                t+=e[j].nodeType!=1?
                    e[j].nodeValue:text(e[j].childNodes);
            }
            return t;
        },
        redirect : function(url){
            window.location.href = url;
        },
        /** 
        * 检查文件大小
        * @param obj 文件对象
        * @param maxSize 文件最大尺寸 
        **/
        checkFileSize : function(obj,maxSize){
            var fileSize = obj.files[0].size;
            if(fileSize > maxSize){
                obj.value = '';
                return false;
            }
            return true;  
        },
        /** 
        * 检查文件类型 
        * @param obj 文件对象
        * @param type 允许的类型 
        **/
        checkFileType : function(obj,type){
            var value = obj.value;
            var dot = value.lastIndexOf(".");
            var fileType = value.substring(dot + 1);
            if(type.indexOf(fileType) !== -1){
                return true;
            }else{
                obj.value = "";
                return false;
            }
        },
        getLength : function(str){
            return str.replace(/[^x00-xff]/g,'xx').length;
        },
        setDisabled : function(btn,el){
            btn.setAttribute('disabled','disabled');
            el.style.borderColor = 'red';
        },
        setAbled : function(btn){
            btn.removeAttribute('disabled');
        },
        isEmail : function(str){
            var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
            return reg.test(str);
        },
        isInputEmpty : function(input){
            var inputValue = input.val();
            if(this.getLength(inputValue) === 0){
                return true;
            }
            return false;
        },
        isHTML : function(str){
            var re = /<\s*(\S+)(\s[^>]*)?>[\s\S]*<\s*\/\1\s*>/;
            return re.test(str);
        },
        isFormEmpty : function(){
            var selects = $('input');
            for(var i = 0;i < selects.length;i++){
                if(selects[i].value === ''){
                    return true;
                }
            }
            return false;
        },
        isPasswordInvalid : function(input){
            var len = this.getLength(input.value);
            if(len < 6){
                return true;
            }
            return false;
        },
        hasClass : function(obj, cls) {  
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
        }, 
        addClass : function(obj, cls) {  
            if (!this.hasClass(obj, cls)) {
                obj.className += " " + cls;  
            }
        },
        log : function(value){
            console.log(value);
        },
        removeClass : function(obj, cls) {  
            if (this.hasClass(obj, cls)) {  
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
                obj.className = obj.className.replace(reg, ' ');  
            }  
        },
        toggleClass : function(obj,cls){  
            if(this.hasClass(obj,cls)){  
                this.removeClass(obj, cls);  
            }else{  
                this.addClass(obj, cls);  
            }  
        },
        isSupportWebsocket : function(){
            var supported = ('WebSocket' in window);
            if(supported){
                return true;
            }else{
                return false;
            }
        },
        getCookie : function(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                return unescape(arr[2]); 
            }
            else{
                return 0; 
            }
        },
        //页面加载完成后注册onload事件
        readyEvent:function(fn){
            if(fn == null){
                fn = document;
            }
            var oldonload = window.onload;
            if(typeof window.onload != 'function'){
                window.onload = fn;
            }else{
                // 如果window.onload上已有事件绑定，则追加到它的后面
                window.onload = function(){
                    oldonload();
                    fn();
                }
            }
        },
        /** 
        * 绑定事件
        * @param target 事件触发源
        * @param type 绑定的事件类型
        * @param handler 处理函数
        **/
        bindEvent:function(target,type,handler){
            if(target.addEventListener){
                target.addEventListener(type,handler,false);
            }else if(target.attachEvent){
                target.attachEvent('on'+type,function(event){
                    // IE attachEvent注册的事件作为函数调用，其this值是全局对象，需要用call来修改其指向
                    return handler.call(target,event)
                })
            }else{
                target['on'+type] = handler;
            }
        },
        // 移除事件
        removeEvent:function(target,type,handler){
            if(target.removeEventListener){
                target.removeEventListener(type,handler,false);
            }else if(target.detachEvent){
                target.detachEvent('on'+type,handler);
            }else{
                target['on'+type] = null;
            }
        },
        // 阻止事件传播
        stopPropagation:function(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        },
        // 取消事件默认行为
        preventDefault:function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        // 获取事件目标
        getTarget:function(event){
            return event.target || event.srcElement;
        },
        // 获取事件对象的引用
        getEvent:function(event){
            var event = event || window.event;
            if(!event){
                // caller用于在函数内部获取调用getEvent的函数
                var c = this.getEvent.caller;
                while(c){
                    event = c.arguments[0];
                    if(event && Event == event.constructor){
                        break;
                    }
                    c = c.caller;
                }
            }
            return event;
        },
        isObject: function(obj) {
            var type = typeof obj;
            return type === 'function' || type === 'object' && !!type;
        },
        keys: function(obj) {
            var keys = [];
            if (!this.isObject(obj)) return;
            if (Object.keys) return Object.keys(obj);
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }
            return keys;
        },
        extend: _createAssigner(this.keys),
    }

    self.Util = _;
})(this)









