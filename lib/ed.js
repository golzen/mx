function ed()
{

  this.list = [];
}

ed.prototype.build = function(param)
{

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



  var appendAfter= param.appendAfter;
  var editorDiv = ""+
  "<div id="+id+" class=editor style='width:"+width+"%;height: "+height+"%;"+borderBottom+noRightBorder+"'>"+
  "<div class=editorTab></div>"+
  "<div class=editArea>"+
  "<textarea id=textArea"+id+"></textarea>"+
  "</div> "+
  "</div>";
  if(param.appendAfter != undefined)
  {
    $(appendAfter).after(editorDiv);
  }else {
    $(".editorArea").append(editorDiv);
  }

 var editor = new CodeMirror.fromTextArea($("#textArea"+id)[0], {
      lineNumbers: true,
      lineWrapping: true,
      mode: "htmlmixed",
      extraKeys: {
        "'<'": completeAfter,
        "'/'": completeIfAfterLt,
        "' '": completeIfInTag,
        "'='": completeIfInTag,
        "Ctrl-Space": "autocomplete"
        },
        hintOptions: {schemaInfo: tags},
        theme: 'material-darker'
  });
    editor.setSize("100%", "100%");
  return id;
}

var ed = new ed();

ed.build({size: [49,100]});
ed.build({size: [50,50]});
ed.build({size: [50,50]});
