function onTransfer(p){
  this.funs = [
    {
    name: "editor",
    work: function(p){

        editor.new({in: p.in, fileUrl: p.fileUrl, edVal: p.edVal});
    },
  },
    {
      name: "preview",
      work: function(p){

        preview.newTab({
          in: tab.activeTab,
          fileUrl: p.fileUrl,
        })
      }
    }
  ];
}

onTransfer.prototype.exec = function(p){
  var t = this;
  ary.map(t.funs, function(i){
    if(i.el.name == p.name){
      i.el.work(p.para);
      return false;
    }
  });
}

var onTransfer = new onTransfer();

function tab()
{


  this.data = [];
  this.activeTab = "";
  this.html = [];
}

tab.prototype.new = function(param)
{

  $("."+param.in).append("");
  var id = makeid(10);
  if(this.activeTab == "")
  {

    this.activeTab = id;
  }

  var width = param.size[0];
  var height = param.size[1];
  if(height <= 98){
    if(height != 50){
      var borderBottom = "border-bottom: 1px solid #333333;";
    }else {
      var borderBottom = "";
    }
  }else {
    var borderBottom = "";
  }
  if(width == 50)
  {
    var noRightBorder = "border-right: 0px;";
  }else {
    var noRightBorder = "";
  }

  // WH ratio


  var appendAfter= param.appendAfter;
  var appendBefore= param.appendBefore;
  var editorDiv = ""+
  "<div id="+id+" class='editor "+id+"' l=0 style='width:"+width+"%;height: "+height+"%;"+borderBottom+noRightBorder+"'>"+
  "<div class=editorTab selected='false' parent='"+id+"'>"+
  "<div class=tabsArea></div>"+
  "<div class='add_box' parent_id='"+id+"'>"+
  "<img src=assets/img/add_circle_white_24dp.svg></img>"+
  "</div>"+
  "</div>"+
  "<div class=editArea>"+
  "</div> "+
  "</div>";


  if(param.appendAfter != undefined)
  {

    $("#"+param.parent).after(editorDiv);
  }else {
    if(param.appendBefore != undefined){
      $("#"+param.parent).before(editorDiv);
    }else {
      $(".editorArea").append(editorDiv);
    }
  }


  if(width > 49)
  {
    if(height > 99)
    {

    }
  }
  $("#"+id).attr("w", param.size[0]).attr("h", param.size[1]);
  editor.new({in: id, fileUrl: param.fileUrl});
  this.html.push(
    {
       data: $(".editorArea").html()
    }
  );
  localStorage.setItem("win_data", escapeCode($(".editorArea").html()));

  return id;
}

tab.prototype.transferEditor = function(param)
{


  var id = makeid(10);
  this.activeTab = id;
  var width = param.size[0];
  var height = param.size[1];
  var editor_id = param.editorId;

  var editor_para = editor.get(editor_id);
  var fileUrl = editor_para.fileUrl;
  var typ = editor_para.type;
  var editor_value = editor_para.value;

  if(height <= 98){
    if(height != 50){
      var borderBottom = "border-bottom: 1px solid #333333;";
    }else {
      var borderBottom = "";
    }
  }else {
    var borderBottom = "";
  }
  if(width == 50)
  {
    var noRightBorder = "border-right: 0px;";
  }else {
    var noRightBorder = "";
  }

  // WH ratio


  var appendAfter= param.appendAfter;
  var appendBefore= param.appendBefore;
  var editorDiv = ""+
  "<div id="+id+" class='editor "+id+"' l=0  style='width:"+width+"%;height: "+height+"%;"+borderBottom+noRightBorder+"'>"+
  "<div class=editorTab selected='false' parent='"+id+"'>"+
  "<div class=tabsArea></div>"+
  "<div class='add_box' parent_id='"+id+"'>"+
  "<img src=assets/img/add_circle_white_24dp.svg></img>"+
  "</div>"+
  "</div>"+
  "<div class=editArea>"+
  "</div> "+
  "</div>";

  
  if(param.appendAfter != undefined)
  {

    $("#"+param.parent).after(editorDiv);
  }else {
    if(param.appendBefore != undefined){
      $("#"+param.parent).before(editorDiv);
    }else {
      $(".editorArea").append(editorDiv);
    }
  }


  if(width > 49)
  {
    if(height > 99)
    {

    }
  }
  $("#"+id).attr("w", param.size[0]).attr("h", param.size[1]);

  if(typ == ""){

    onTransfer.exec({
      name: "editor",
      para: {in: id, fileUrl: fileUrl, edVal: editor_value}
    });

  }else{

    onTransfer.exec({
      name: typ,
      para: {in: id, fileUrl: fileUrl, edVal: editor_value, currentEditor: editor_id}
    });
    // editor.new({in: id, fileUrl: fileUrl, edVal: editor_value});
  }

  this.html.push(
    {
       data: $(".editorArea").html()
    }
  );
  localStorage.setItem("win_data", escapeCode($(".editorArea").html()));


  return id;
}
tab.prototype.resize = function(param)
{
  $("#"+param.id).attr("w", param.size[0]).attr("h", param.size[1]);
  $("#"+param.id).css("width", param.size[0]+"%").css("height", param.size[1]+"%");
};
tab.prototype.info = function(param)
{

  var el = $("#"+param);
  var info = {
    width: el.css("width"),
    height: el.css("height"),
    widthRaw: el.attr("w"),
    heightRaw: el.attr("h")
  }
  return info;
}


var tab = new tab();
