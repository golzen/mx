function editor()
{

  this.data = [];

  if(!localStorage.getItem("fontSize")){
    this.fontSize = 15;
  }else {
    this.fontSize = localStorage.getItem("fontSize");
  }

}
editor.prototype.get = function(id)
{

  var rawid = "cm_mx_id_"+id;
  var e = $("."+rawid);
  var val =document.querySelector(".cm_mx_id_"+id).CodeMirror.getValue();
  var info = {fileUrl: e.attr("file_url"), value: val, loadStat: e.attr("load_stat")}

  return info;
}
editor.prototype.setVal = function(id, val)
{

  document.querySelector(".cm_mx_id_"+id).CodeMirror.setValue(makeHTML(val));

}
editor.prototype.setFontSize = function(n)
{
  $(".CodeMirror").css("font-size",n+"px");
}

editor.prototype.switch = function(param){

  $(".cm_mx_win_id_"+param.winId).hide();
  $(".cm_mx_id_"+param.edId).show();

  $("."+param.winId+ " .tab_box").removeClass("active");
  $(".tab_box[editor_id='"+param.edId+"']").addClass("active");
  tab.activeTab = param.winId;
  if(this.get(param.edId).loadStat  == "false"){


    var ed_id = param.edId;

    var ed = this;
    work.push(function(){

  var url = ed.get(ed_id).fileUrl.replace(rootPath, "");

      gate.read(
        {
          url: "server/readFile.php",
          data:{
            uri: url
          },
          ondone: function(readed){


            ed.setVal(ed_id, readed);

              work.nxt();


          }

        });
    });
  };
};
editor.prototype.close = function(id)
{

  $(".textArea"+id).remove();
  $(".cm_mx_id_"+id).remove();
  var tabBox = $(".tab_box[editor_id='"+id+"']");

  if($("."+tabBox.attr("win_id")).attr("l")-1 == 0)
  {

    //editor.new({in: tabBox.attr("win_id")});

  }
  $("."+tabBox.attr("win_id")).attr("l", $("."+tabBox.attr("win_id")).attr("l")-1);

        tabBox.remove();


}
editor.prototype.new = function(param){
  console.log("New Ed req: "+param.in);
  required(param.in);
  var saved_code;
    $("."+param.in).attr("l", ($("."+param.in).attr("l")-0)+1);
  var filename = "untitled";
  if(param.fileUrl != undefined)
  {
     filename = getFilename(param.fileUrl);
  }
  if(param.loaded == undefined)
  {
    if(param.fileUrl == "/new"){
      var loaded = 'n';
    }else{
      var loaded = 'false';
    }

  }else {

      var loaded = param.loaded;

  }

  if(param.edVal == undefined)
  {
    var ed_val = "";
  }else {
    var ed_val = escapeCode(param.edVal);
  }
  saved_code = ed_val;
  const textAreaId = makeid(10);

  $("."+param.in+" .tabsArea").append("<div class='tab_box' editor_id='"+textAreaId+"' win_id='"+param.in+"'><txt>"+
  filename+
  "</txt><div class=saved_state_icon></div><span><img src=assets/img/cancel_white_24dp.svg></img></span>"+
  "</div>");

  console.log("New Tab req: "+filename);


  var win_dragger_structure = ''+
'<div class="win_drager_area win_drager_'+textAreaId+'" style="'+
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
       autoCloseTags: true,
       theme: 'one-dark',

 });


   e.on("change", function(){

     if(saved_code == escapeCode(e.getValue()))
     {


       localStorage.setItem(param.fileUrl+"_state", "saved");
       $(e.getWrapperElement()).attr("saved", 'true');
       $(".tab_box[editor_id='"+textAreaId+"']").find(".saved_state_icon").css("background", "green");
     }else {


        localStorage.setItem(param.fileUrl+"_state", "unsaved");
       $(e.getWrapperElement()).attr("saved", 'false');
       $(".tab_box[editor_id='"+textAreaId+"']").find(".saved_state_icon").css("background", "orange");
     }
     localStorage.setItem(param.fileUrl, e.getValue());


   });
   e.setSize("100%", "100%");
   $(e.getWrapperElement()).addClass("cm_mx_win_id_"+param.in);
   $(e.getWrapperElement()).addClass("cm_mx_id_"+textAreaId);

   if(param.fileUrl != undefined)
   {
     $(e.getWrapperElement()).attr("file_url", param.fileUrl);


   }

    $(e.getWrapperElement()).attr("load_stat", loaded);
   this.switch({
     edId: textAreaId,
     winId: param.in
   });

   var checkArrayIsExists =

   ary.map(this.data, function(array, el){

        if(el.length != 0){
        if(el.fileUrl == param.fileUrl){
          el.parentId = param.in;
          console.log("Already");
          return false;
        }
      }
    });

   if (checkArrayIsExists){
      this.data.push({
        fileUrl: param.fileUrl,
        parentId: param.in,
        stat: "saved"
      });
    };

   localStorage.setItem("editor_data", JSON.stringify(this.data));

 }


editor.prototype.move = function(param)
{
  var axis = param.axis;
  var parent = param.parent;

  var rawWidth = tab.info(parent).widthRaw;
  var rawHeight = tab.info(parent).heightRaw;


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

    tab.resize({id: parent, size:[newWidth, newHeight]});
    tab.transferEditor({appendAfter: true, size:[newWidth, newHeight], parent: parent, editorId: param.editorId});
  }
  this.close(param.editorId);
};

function switchTab(param)
{

}
 var editor = new editor();
