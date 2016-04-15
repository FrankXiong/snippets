var helper = {
    oFileNameHint : document.getElementsByClassName('file-name-hint')[0],
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
    checkFileSize : function(obj,maxSize){
        var fileSize = obj.files[0].size;
        if(fileSize > maxSize){
            alert(msg.fileOverSize);
            obj.value = '';
            this.oFileNameHint.innerHTML = '';
            return false;
        }
        return true;  
    },
    checkFileType : function(obj){
        var value = obj.value;
        var dot = value.lastIndexOf(".");
        var fileType = value.substring(dot + 1);
        if(ALLOW_FILE_TYPE.indexOf(fileType) !== -1){
            return true;
        }else{
            alert(msg.fileTypeIllegal);
            obj.value = "";
            this.oFileNameHint.innerHTML = '';
            return false;
        }
    },
    getLength : function(str){
        return str.replace(/[^x00-xff]/g,'xx').length;
    },
    addEvent : function(target,type,handler){
        if(target.addEventListener){
            target.addEventListener(type,handler,false);
        }else{
            target.attachEvent('on'+type,function(event){
                return handler.call(target,event);
            });
        }
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
    isHtml : function(str){
        var re = /<\s*(\S+)(\s[^>]*)?>[\s\S]*<\s*\/\1\s*>/;
        return re.test(str);
    },
    isFormEmpty : function(){
        var selects = $('select');
        for(var i = 0;i < selects.length;i++){
            if(selects[i].value === ''){
                alert(msg.formEmpty);
                return true;
            }
        }
    },
    hasClass : function(obj, cls) {  
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
    }, 
    addClass : function(obj, cls) {  
        if (!this.hasClass(obj, cls)) {
            obj.className += " " + cls;  
        }
    },
    clog : function(value){
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
    }

}








