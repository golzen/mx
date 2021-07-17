function editor()
{

  this.editor_data = {}

}
editor.prototype.switch = function(param){

  $(".cm_mx_win_id_"+param.winId).hide();
  $(".cm_mx_id_"+param.edId).show();

  $("."+param.winId+ " .tab_box").removeClass("active");
  $(".tab_box[editor_id='"+param.edId+"']").addClass("active");

};
editor.prototype.close = function(id)
{
  $("textArea"+id).remove();
  $(".cm_mx_id_"+id).remove();
}
editor.prototype.new = function(param){
  required(param.in);

  var filename = "untitled";
  if(param.fileUrl != undefined)
  {
     filename = getFilename(param.fileUrl);
  }

  if(param.edVal == undefined)
  {
    var ed_val = "";
  }else {
    var ed_val = param.edVal;
  }
  const textAreaId = makeid(10);

  $("."+param.in+" .tabsArea").append("<div class='tab_box' editor_id='"+textAreaId+"' win_id='"+param.in+"'><txt>"+
  filename+
  "</txt><span><img src=assets/img/cancel_white_24dp.svg></img></span>"+
  "</div>");


  var win_dragger_structure = ''+
'<div class="win_drager_area " style="'+
'    width: 100%;'+
'    height: 100%;'+
'    position: absolute;'+
'    display:none;'+
'    z-index:5;'+
'    top:0;'+
'">'+
''+
''+
'<div class="area" style="'+
'    width: 50%;'+
'    height: 100%;'+

'    position: absolute;'+
'    left: 0;'+
'" pos="left_fh" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area" style="'+
'    width: 50%;'+
'    height: 100%;'+

'    position: absolute;'+
'    right: 0;'+
'" pos="right_fh" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area" style="'+
'    width: 50%;'+
'    height: 50%;'+

'    position: absolute;'+
'    right: 0;'+
'    left:0;'+
'    margin:auto'+
'" pos="top_fw" ed_id="'+textAreaId+'" parent="'+param.in+'"></div><div class="area" style="'+
'    width: 50%;'+
'    height: 50%;'+

'    position: absolute;'+
'    bottom: 0;'+
'    right: 0;'+
'    left:0;'+
'    margin:auto'+
'" pos="bottom_fw" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+

'<div class="area_left_fh prev_area" style="'+
'    width: 50%;'+
'    height: 100%;'+

'    position: absolute;'+
'    left: 0;'+
'" pos="left_fh" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area_right_fh prev_area" style="'+
'    width: 50%;'+
'    height: 100%;'+

'    position: absolute;'+
'    right: 0;'+
'" pos="right_fh" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area_top_fw prev_area" style="'+
'    width: 100%;'+
'    height: 50%;'+

'    position: absolute;'+
'    right: 0;'+
'    left:0;'+
'    margin:auto'+
'" pos="top_fw" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area_bottom_fw prev_area" style="'+
'    width: 100%;'+
'    height: 50%;'+
'    position: absolute;'+
'    bottom: 0;'+
'    right: 0;'+
'    left:0;'+
'    margin:auto'+
'" pos="bottom_fw" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
''+
'    </div>';

  $("."+param.in+" .editArea").append("<textarea id=textArea"+textAreaId+">"+ed_val+"</textarea>");
  $("."+param.in+" .editArea").append(win_dragger_structure);

  var file_extension = getExtension(filename);
  var editor_mode = getEditorType(file_extension);
  var e = new CodeMirror.fromTextArea($("#textArea"+textAreaId)[0], {
     lineNumbers: true,
     lineWrapping: true,
     mode: editor_mode,
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
   e.setSize("100%", "100%");
   $(e.getWrapperElement()).addClass("cm_mx_win_id_"+param.in);
   $(e.getWrapperElement()).addClass("cm_mx_id_"+textAreaId);

   if(param.fileUrl != undefined)
   {
     $(e.getWrapperElement()).attr("file_url", param.fileUrl);


   }

   this.switch({
     edId: textAreaId,
     winId: param.in
   });


 }

editor.prototype.get = function(id)
{

  var rawid = "cm_mx_id_"+id;
  var e = $("."+rawid);
  var val =document.querySelector(".cm_mx_id_"+id).CodeMirror.getValue();
  var info = {fileUrl: e.attr("file_url"), value: val}

  return info;
}
editor.prototype.move = function(param)
{
  var axis = param.axis;
  var parent = param.parent;

  var rawWidth = tab.info(parent).widthRaw;
  var rawHeight = tab.info(parent).heightRaw;

  console.log(tab.info(parent));
  if(axis == "left_fh")
  {
    var newWidth = rawWidth/2;
    var newHeight = rawHeight;
    tab.resize({id: parent, size:[newWidth, newHeight]});
    tab.transferEditor({appendBefore: true, size:[newWidth, newHeight], parent: parent, editorId: param.editorId});
  }
  if(axis == "right_fh")
  {
    var newWidth = rawWidth/2;
    var newHeight = rawHeight;
    tab.resize({id: parent, size:[newWidth, newHeight]});
    tab.transferEditor({appendAfter: true, size:[newWidth, newHeight], parent: parent, editorId: param.editorId});
  }
  if(axis == "top_fw")
  {
    var newWidth = rawWidth;
    var newHeight = rawHeight/2;
    tab.resize({id: parent, size:[newWidth, newHeight]});
    tab.transferEditor({appendAfter: true, size:[newWidth, newHeight], parent: parent, editorId: param.editorId});
  }
  if(axis == "bottom_fw")
  {
    var newWidth = rawWidth;
    var newHeight = rawHeight/2;
    console.log("n"+newHeight);
    tab.resize({id: parent, size:[newWidth, newHeight]});
    tab.transferEditor({appendAfter: true, size:[newWidth, newHeight], parent: parent, editorId: param.editorId});
  }
};

function switchTab(param)
{

}
 var editor = new editor();
