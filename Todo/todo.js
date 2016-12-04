/* 
* @Author: zdh
* @Date:   2016-09-19 09:15:33
* @Last Modified by:   Marte
* @Last Modified time: 2016-12-04 21:40:09
*/

$(document).ready(function(){
$("#do").focus();
//获取最后一个待办时间的id的数字
function getThingId(){
     var childNum=$(".things").children().length;
     var numPart=0;
     var everyThing_id=$(".every:last").attr("id");
      if(childNum!=0){
          numPart= everyThing_id.replace(/[^0-9]/ig,""); 
          numPart=parseInt(numPart);
          }
     return numPart;
}


//创建新的待办条目并插入的函数
 function addNewThings() {
    var a=getThingId();
    var newDivId="thing_"+String(a+1);
    var newInputId="check_"+String(a+1);
    // 创建新div
     var newThing=document.createElement("div");
     newThing.className="every";
     newThing.id=newDivId;

     // //创建新input
     var newInput=document.createElement("input");
     newInput.className="check";
     newInput.type="checkbox";
     newInput.id=newInputId;

     // //创建新的label
     var newLabel=document.createElement("label");
     newLabel.setAttribute("for",newInputId);

     // //创建新的p
     var newP=document.createElement("p");
     newP.innerHTML=$("#do").val();

     // //创建新的button
     var newCButton=document.createElement("div");
     newCButton.className="close_button";
     newCButton.innerHTML="×";

     var newEdit=document.createElement("input");
     newEdit.className="_edit";
     newEdit.type="text";
     
     $(".things").append(newThing);
     $(".every:last").append(newInput);
     $(".every:last").append(newLabel);
     $(".every:last").append(newP);
     $(".every:last").append(newCButton);
     $(".every:last").append(newEdit);
}

// 回车添加新的代办条目
$("#do").keydown(function(event) {
  /* Act on the event */
  if(event.which==13)  
      {
        if($("#do").val())
        {
        addNewThings();
        $(".every:last").show("fast");
        don();
        $("#do").val("");
        // $("#do").blur(); 
        }
      }
});

//双击弹出编辑框，如果不为空，回车即可改变内容
$(document).on("dblclick",".every p",function(){
    var cc=$(this).text();
    $(this).parent().find("input._edit").show().focus().val(cc);
    $("._edit").keydown(function(event) {
    if(event.which==13)
      {
       $("._edit").each(function(){
          var content=$(this).val();
          if(content){
          $(this).parent().find("p").text(content);      
          }
      $(this).hide();
    });
  }
});
});

//编辑框失去焦点时隐藏
$(document).on("blur","._edit",function(event) {
      $("._edit").each(function(){
        $(this).hide();      
      });
        });

//删除事件
$(document).on("click", ".close_button",function() {
  $(this).parent().hide("slow",function(){
     this.remove(); 
       don();
  });
}); 

//勾选全部时改变全部的状态
$(document).on("change","#check_0",function() {
  var con=$(this).is(":checked");
  if (con) {  
        $(".check[id!='check_0']").each(function(){$(this).prop("checked",true);});
        $(".checkAll").children("p").text("取消所有标记");
        $(".checkAll").css("background-color","#eee");       
      }else{
        $(".check[id!='check_0']").each(function(){$(this).prop("checked",false);});
        $(".checkAll").children("p").text("标记所有为完成");
        $(".checkAll").css("background-color","#fff"); 
      }

});

//每个事件勾选时触发改变当前样式
$(document).on("change",".check",function() {
  /* Act on the event */
  $(".check[id!='check_0']").each(function(){ 
  var now=$(this).is(":checked");
  if(now)
    {    
      $(this).parent().find("p").css({"text-decoration":"line-through","color":"rgb(156, 156, 156)"});
      $(this).parent().css({"background-color":"#eee"});
    
    }else{
      $(this).parent().find("p").css({"text-decoration":"none","color":"#000"});
      $(this).parent().css({"background-color":"#fff"});
    }
}); 
  don();
});

  //改变页脚的剩余事件数量显示
function don(){
  var count=$(".check[id!='check_0']").length;
   $("#left_num").html(leftNum()+"&nbsp 项剩余");

   //如果剩余事件不为零，显示footer和checkAll
   if(leftNum()!=0){
    $(".checkAll").show("fast");
    $("footer").show("fast");
   }

   //如果事件列表为0，隐藏footer和checkAll
   if($(".check[id!='check_0']").length==0){
       $(".checkAll").hide("fast");
       $("footer").hide("fast");
   }

   //确保所有项目打上勾时“选择所有也打上勾”
   if((count!=0) && (leftNum()==0)){
        $("#check_0").prop("checked",true);
        $(".checkAll").css("background-color","#eee");
   }else{
        $("#check_0").prop("checked",false);
        $(".checkAll").css("background-color","#fff");
   }

   //如果事件列表不为空，而且剩余数目少于事件列表，即有事件被checked
   if (count!=0 && leftNum()<count) {
        $("footer p").show("fast");
   }else{
        $("footer p").hide("fast");
   }
  }

//清除已完成事件
$("footer p").click(function() {
  $(".check[id!='check_0']").each(function(){
    var con=$(this).is(":checked");
    if(con){
        $(this).parent().hide("slow",function(){
          this.remove(); 
          don();
    });
      }
  });

});

//获取当前剩余任务的函数
function leftNum(){
  var num=0;
  $(".check[id!='check_0']").each(function() {
  var con=$(this).is(":checked");
  if (!con) {
    num++;
  };
});
  return num;
}

});
