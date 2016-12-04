var curIndex = 0,//当前index
    imgNum = $(".imgList li").length;//图片总数

var autoChange = setInterval(function(){//定时改变图片索引
    if(curIndex < imgNum-1){
        curIndex++;
    }else{
        curIndex = 0;
    }
    changeTo(curIndex);
},1500);


function changeTo(numm){
    var goLeft = numm*500;
    $(".imgList").animate({left:"-"+goLeft+"px"},200);
    $(".indexList").find("li").removeClass("indexOn").eq(numm).addClass("indexOn");
}
 
 $(".indexList li").each(function(item){
    $(this).mouseover(function(){
        clearInterval(autoChange);
        changeTo(item);
        curIndex = item;
    }).mouseout(function(){
        autoChangeAgain();
    });

 });

function autoChangeAgain(){ 
      autoChange = setInterval(function(){ 
      if(curIndex < imgNum-1){ 
        curIndex ++;
      }else{ 
        curIndex = 0;
      }
    //调用变换处理函数
      changeTo(curIndex); 
    },1500);
    }

$("#prev").mouseover(function() {
    clearInterval(autoChange);
}).mouseout(function(){
    autoChangeAgain();
});
$("#prev").click(function(){ 
  //根据curIndex进行上一个图片处理
  curIndex = (curIndex > 0) ? (--curIndex) : (imgNum - 1);
  changeTo(curIndex);
});