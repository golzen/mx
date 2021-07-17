function tab()
{

  this.list = {};
}

tab.prototype.new = function(param)
{

  $("."+param.in).append("");
  var id = makeid(10);
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
  "<div id="+id+" class='editor "+id+"' style='width:"+width+"%;height: "+height+"%;"+borderBottom+noRightBorder+"'>"+
  "<div class=editorTab>"+
  "<div class=tabsArea></div>"+
  "<div class='add_box' parent_id='"+id+"'>"+
  "<img src=assets/img/add_circle_white_24dp.svg></img>"+
  "</div>"+
  "</div>"+
  "<div class=editArea>"+
  "</div> "+
  "</div>";

    console.log(param.parent);
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
  return id;
}

tab.prototype.transferEditor = function(param)
{


  $("."+param.in).append("");
  var id = makeid(10);

  var width = param.size[0];
  var height = param.size[1];
  var editor_id = param.editorId;

  var fileUrl = editor.get(editor_id).fileUrl;

  var editor_value = editor.get(editor_id).value;

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
  "<div id="+id+" class='editor "+id+"' style='width:"+width+"%;height: "+height+"%;"+borderBottom+noRightBorder+"'>"+
  "<div class=editorTab>"+
  "<div class=tabsArea></div>"+
  "<div class='add_box' parent_id='"+id+"'>"+
  "<img src=assets/img/add_circle_white_24dp.svg></img>"+
  "</div>"+
  "</div>"+
  "<div class=editArea>"+
  "</div> "+
  "</div>";

    console.log(param.parent);
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
  editor.new({in: id, fileUrl: fileUrl, edVal: editor_value});
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



tab.new({size: [99,100], fileUrl: "file:///C:/Users/Shad/github/mxStudio/index.html"});
