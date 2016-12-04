var Bull=[10,0,3,67,322,232,3,67,8,10];
var result3=deleTwo(Bull);
console.log(result3); 

//冒泡
function BubbleSort(array){
    var length = array.length;
    var temp = 0;
    for(var i = length-1;i>0;i--){
        for(var j = 0;j<i;j++){
            if(array[j]>array[j+1]){
                temp = array[j+1];
                array[j+1] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}
     
//选择排序
function SelectionSort(array){
    var length = array.length;
    var temp =0;
    for(var i = 0;i<length;i++){
        min = array[i];
        index = i;
        for(var j = i+1;j< length;j++){
            if(array[j]<min){
                index = j;
            }
        }
         if(index != i ){
                temp = min;
                min = array[j];
                array[j]=temp;
            }
    }
    return array;
}


//快速排序
function quickSort(arr){
    if(arr.length<=1){
        return arr;
    }
    var pivotIndex = Math.floor(arr.length/2);
    var pivot = arr.splice(pivotIndex,1)[0];
    var smaller = [];
    var bigger = [];
    for(var i = 0;i<arr.length;i++){
        if(arr[i]<pivot){
            smaller.push(arr[i]);
        }else{
            bigger.push(arr[i]);
        }
    }
    return  quickSort(smaller).concat([pivot],quickSort(bigger));
    }



//直接插入排序
function insertSort(arr){
    var length = arr.length;
    var insert = 0;
    for(var i = 0;i<length-1;i++){
        insert = arr[i+1];
        index = i+1;
        for(var j = i;j>=0;j--){
            if(insert<arr[j]){
                arr[j+1] = arr[j];
                index = j;
            }
        }
        arr[index] = insert;
    }
    return arr;
}


//去重复
function deleTwo(arr){
    var length = arr.length;
    var deled = [];
    for(var i = 0;i<length;i++){
        con = arr[i];
        index = i;
        for(var j = i+1;j<length;j++){
            if(arr[j] == con){
                arr.splice(j,1);
            }
        }
    }
    return arr;
}


//js判断一个字符串中出现次数最多的字符，统计这个次数
var str='asdaa';
var obj={};
for(var i=0,l=str.length,k;i<l;i++){
    k=str.charAt(i);
    if(obj[k]){
        obj[k]++;
    }else{
        obj[k]=1;
    }
}
var m=0;
var i=null;
for(var k in obj){
    if(obj[k]>m){
        m=obj[k];
        i=k;
    }
}
alert(i+':'+m);


//一定范围内质数
var prime = function(len){
    var i,j;
    var arr = [];
  for(i = 1; i < len; i++){
    for(j=2; j < i; j++){   
      if(i%j === 0) {
         break;
      }
    }
    if(i <= j && i !=1){ 
      arr.push(i);
    }
  }
  return arr;
};
console.log(prime(1000));


//对象拷贝，深度克隆
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array?[]:{};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){       //如果支持JSON
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){       //枚举每一个obj的属性
            if(obj.hasOwnProperty(obj[i])){
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
            }
        }
    }
    return newobj;
};

//js如何实现高效的数组去重
var arr = [1, 2, 2, 3, 4, 5, 6, 6];

function getArray(a) {
 var hash = {},
     len = a.length,
     result = [];
 for (var i = 0; i < len; i++){
     if (!hash[a[i]]){
         hash[a[i]] = true;
         result.push(a[i]);
     } 
 }
 return result;
}

getArray(arr); // 输出[1， 2， 3， 4， 5， 6]