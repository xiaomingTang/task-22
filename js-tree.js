//完全二叉树
function FullBinTree(n){
  this.gene=n;
  this.frag=document.createDocumentFragment();
  this.arr_NLR=[];
  this.arr_LNR=[];
  this.arr_LRN=[];
  this.init=function(){
    this.buildTree(this.frag,this.gene);
    return this.frag;
  };
}
FullBinTree.prototype={
  constructor:FullBinTree,
  
  buildTree:function(elem,n){
    var left=this.newElem(),
        right=this.newElem();
    elem.appendChild(left);
    elem.appendChild(right);
    left.className="left";
    right.className="right";
    if(--n){
      this.buildTree(left,n);
      this.buildTree(right,n);
    }
    else{
      left.className+=" root";
      right.className+=" root";
    }
  },
  convertToArray:function(nodes){
    var arr=[];
    try{
      arr=Array.prototype.slice.call(nodes,0);
    }catch(ex){
      arr=[];
      for(var i=0,len=nodes.length;i<len;i++){
        arr.push(nodes[i]);
      }
    }
    return arr;
  },
  
  getElementChild:function(elem){
    var arr=[],
        child=this.convertToArray(elem.childNodes);
    for(var i=0,len=child.length;i<len;i++){
      if(child[i].nodeType == 1){
         arr.push(child[i]);
      }
    }
    return arr;
  },
  //前序遍历
  NLR:function(elem){
    this.arr_NLR.push(elem);
    var arr=this.getElementChild(elem);
    if(!!arr.length){
      var left=this.getElementChild(elem)[0],
          right=this.getElementChild(elem)[1];
      this.NLR(left);
      this.NLR(right);
    }
  },
  //中序遍历
  LNR:function(elem){
    var arr=this.getElementChild(elem);
    if(!!arr.length){
      var left=this.getElementChild(elem)[0],
          right=this.getElementChild(elem)[1];
      this.LNR(left);
      this.arr_LNR.push(elem);
      this.LNR(right);
    }
    else{
      this.arr_LNR.push(elem);
    }
  },
  
  //后序遍历
  LRN:function(elem){
    var arr=this.getElementChild(elem);
    if(!!arr.length){
      var left=this.getElementChild(elem)[0],
          right=this.getElementChild(elem)[1];
      this.LRN(right);
      this.arr_LRN.push(elem);
      this.LRN(left);
    }
    else{
      this.arr_LRN.push(elem);
    }
  },
  //所有遍历
  traversal:function(elem){
    this.NLR(elem);
    this.LNR(elem);
    this.LRN(elem);
  },
  render:function(type){
    var arr=[];
    switch(type){
      case 0:
        arr=this.arr_NRL;
        break;
      case 1:
        arr=this.arr_LNR;
        break;
      case 2:
        arr=this.arr_LRN;
        break;
      default:
        break;
    }
    if(!arr.length){
      return ;
    }
    arr[0].style.backgroundColor="red";
    
    var i=1,
        len=arr.length,
    loop=setInterval(function(){
      arr[i-1].style.backgroundColor="white";
      arr[i].style.backgroundColor="red";
      if(i >= len){
        clearInterval(loop);
      }
    },500);
  },
  
  

  newElem:function(){
    return document.createElement("div");
  }
}

var newTree=new FullBinTree(4),
    tree=document.getElementById("tree");

tree.appendChild(newTree.init());

newTree.traversal(tree);

newTree.render(1);










