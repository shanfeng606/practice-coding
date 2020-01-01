
var timer=null,
    index=0,
    pics=byId("banner").getElementsByTagName("div")
    indexs=byId("index").getElementsByTagName("div"),
    size=pics.length;

function addHandler(element,type,handler){
    if(element.addEventListener){
        element.addEventListener(type,handler,true);
    }
    else if(element.attachEvent){
        element.attachEvent("on"+type,handler);
    }
    else{
        element["on"+type]=hander;
    }
}

function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}

//清除定时器
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }
}

//图片自动轮播
function startAutoPlay(){
    timer=setInterval(function(){
        index++;
        if(index>=size){
            index=0;
        }
        changeImg();
    },1000)
}

function changeImg(){
    for(var i=0,len=indexs.length;i<len;i++){
        indexs[i].className="";
        pics[i].style.display="none";
    }
    indexs[index].className="active_index";
    pics[index].style.display="block";
}

function slideImg(){
    startAutoPlay();
    var main=byId("main");
    addHandler(main,"mouseover",stopAutoPlay);
    addHandler(main,"mouseout",startAutoPlay);
}

//点击导航切换
for(var i=0,len=indexs.length;i<len;i++){
    indexs[i].id=i;
    addHandler(indexs[i],"click",function(){
        index=this.id;
        changeImg();
    })
}

addHandler(window,"load",slideImg);