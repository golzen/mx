function editor()
{

  this.data = [];

  this.code = {};
  this.activeEditor;

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
  var typ = "";

  if(e.attr('typ') != undefined){
    typ = e.attr('typ');
  }
  try{
    var val =document.querySelector(".cm_mx_id_"+id).CodeMirror.getValue();
  }catch(e){
    var val = "";
  }
  var parentWin = $(".tab_box[editor_id='"+id+"']").attr('win_id');
  var info = {fileUrl: e.attr("file_url"), value: val, loadStat: e.attr("load_stat"), parentTab: parentWin, type: typ}

  return info;
}
editor.prototype.refresh = function(id){

  setTimeout(function() {

    try{
      document.querySelector(".cm_mx_id_"+id).CodeMirror.refresh();
    }
    catch(e){
      ({
        id: id,
        log: e
      });
      console.trace();
    }

},1);
}

editor.prototype.setAttr = function(param)
{
  var id = param.id;
  var attrName = param.attr[0];
  var attrVal = param.attr[1];
  $(".cm_mx_id_"+id).attr(attrName, attrVal);


}
editor.prototype.setVal = function(id, val)
{
  try{
    document.querySelector(".cm_mx_id_"+id).CodeMirror.setValue(makeHTML(val));

  }
  catch(e){
    ({
      id: id,
      log: e
    });
    console.trace();
  }



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
  var ed_id = param.edId;
  if(this.get(param.edId).loadStat  == "false"){




    var ed = this;

    onLoadWork.push(function(){

  var url = ed.get(ed_id).fileUrl.replace(rootPath, "");

      gate.read(
        {
          url: "server/readFile.php",
          data:{
            uri: url
          },
          ondone: function(readed){


            var savedPrevSec = localStorage.getItem(ed.get(ed_id).fileUrl);

            ed.setVal(ed_id, readed.replace('\r', ''));
            ed.code[ed_id] = makeHTML(escapeCode(readed));

              var code = ed.code[ed_id];
              (ed.get(ed_id).fileUrl);
            if(savedPrevSec){

                          if(code ==  savedPrevSec )
                          {

                            (code);
                            (makeHTML(escapeCode(localStorage.getItem(ed.get(ed_id).fileUrl))));


                            ed.setAttr({
                              id: ed_id,
                              attr: ["saved", "true"]
                            });
                            $(".tab_box[editor_id='"+ed_id+"']").find(".saved_state_icon").addClass("displayz");
                          }else {

                            ("saving");
                              ed.setVal(ed_id, savedPrevSec);
                            ed.setAttr({
                              id: ed_id,
                              attr: ["saved", "false"]
                            });
                            $(".tab_box[editor_id='"+ed_id+"']").find(".saved_state_icon").css("background", "orange");
                          }
            }else{
              ("r");
            };



            ed.setAttr({
              id: ed_id,
              attr: ["load_stat", "true"]
            })




              onLoadWork.nxt();


          }

        });



    });
  };

  this.refresh(ed_id);
  this.activeEditor = ed_id;
};
editor.prototype.switchAuto = function(param)
{

  var ed_length = $(".tab_box[win_id='"+param.winId+"']").length;
  var ed_ind;
  var ed_id;

  if(ed_length == 0)
  {
    editor.new({in: tabBox.attr("win_id")});
     ed_ind = 0;
     ed_id = $(".tab_box[win_id='"+param.winId+"']").eq(ed_ind).attr("editor_id");
  }else {
    if(param.index == undefined){
      ed_ind = $(".tab_box[editor_id='"+param.edId+"']").index();
    }else{
       ed_ind = param.index;
    }


    if(ed_ind == 0){

       ed_id = $(".tab_box[win_id='"+param.winId+"']").eq(ed_ind).attr("editor_id");

    }else{
       ed_id = $(".tab_box[win_id='"+param.winId+"']").eq(ed_ind-1).attr("editor_id");

    }


}




    this.switch({
      edId: ed_id,
      winId: param.winId
    });


}

editor.prototype.switchNext = function(param)
{

  var ed_length = $(".tab_box[win_id='"+param.winId+"']").length;
  var ed_ind;
  var ed_id;


    if(param.index == undefined){
      ed_ind = $(".tab_box[editor_id='"+param.edId+"']").index();
    }else{
       ed_ind = param.index;
    }


    if(ed_ind == ed_length-1){

       ed_id = $(".tab_box[win_id='"+param.winId+"']").eq(0).attr("editor_id");

    }else{
       ed_id = $(".tab_box[win_id='"+param.winId+"']").eq(ed_ind+1).attr("editor_id");

    }







    this.switch({
      edId: ed_id,
      winId: param.winId
    });


}
editor.prototype.close = function(id, array)
{

  if(array == undefined){
    var allTrue = true;
 }else{
   var allTrue = false;
 }
try{
  var savedData = JSON.parse(localStorage.getItem("editor_data"));
  var ed = this;
  ary.map(savedData, function(i){
    (id);
    if(ed.get(id).fileUrl == i.el.fileUrl){
      if(ed.get(id).type == i.el.type){
        if(allTrue){
          delete savedData[i.key];
        }else{
          if(array.localStorage){
            delete savedData[i.key];
          }
        }

      }
      localStorage.setItem("editor_data", JSON.stringify(savedData));
    }
  });
  $(".textArea"+id).remove();
  $(".cm_mx_id_"+id).remove();
  var tabBox = $(".tab_box[editor_id='"+id+"']");

  var winId =tabBox.attr("win_id");



  $("."+tabBox.attr("win_id")).attr("l", $("."+tabBox.attr("win_id")).attr("l")-1);
  var ed_ind = $(".tab_box[editor_id='"+id+"']").index();

  tabBox.remove();

  this.switchAuto({winId: winId, edId: id, index: ed_ind});



  localStorage.setItem("win_data", escapeCode($(".editorArea").html()));
}catch(e){

}
}
editor.prototype.new = function(param){

  var saved_code;


    $("."+param.in).attr("l", ($("."+param.in).attr("l")-0)+1);

    const textAreaId = makeid(10);
  var filename = "untitled";
  if(param.fileUrl != undefined)
  {
     filename = getFilename(param.fileUrl);
  }
  if(param.loaded == undefined)
  {
    if(param.fileUrl == "/untitled"){
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
    this.code[textAreaId] = "";

  }else {
    var ed_val = escapeCode(param.edVal);


    this.code[textAreaId] = ed_val;
  }
  saved_code = ed_val;


  $("."+param.in+" .tabsArea").append("<div class='tab_box' editor_id='"+textAreaId+"' win_id='"+param.in+"'><txt>"+
  filename+
  "</txt><div class=saved_state_icon></div><span><img src=assets/img/cancel_white_24dp.svg></img></span>"+
  "<div class='clickArea'></div></div>");



var win_dragger_structure = '<div class="win_drager_area win_drager_'+textAreaId+'">'+
'<div class="area ar_left_fh" pos="left_fh" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area ar_right_fh" pos="right_fh" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area ar_top_fw" pos="top_fw" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area ar_bottom_fw" pos="bottom_fw" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+

'<div class="area_left_fh prev_area" pos="left_fh" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area_right_fh prev_area" pos="right_fh" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area_top_fw prev_area" pos="top_fw" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'<div class="area_bottom_fw prev_area"pos="bottom_fw" ed_id="'+textAreaId+'" parent="'+param.in+'"></div>'+
'</div>';

  $("."+param.in+" .editArea").append("<textarea id=textArea"+textAreaId+">"+escapeCode(ed_val)+"</textarea>");
  $("."+param.in+" .editArea").append(win_dragger_structure);

  var file_extension = getExtension(filename);
  var editor_mode = getEditorType(file_extension);


  var e = new CodeMirror.fromTextArea($("#textArea"+textAreaId)[0], {
     lineNumbers: true,
     lineWrapping: true,
     mode: editor_mode,
     gutters: ["CodeMirror-lint-markers"],
     lint: true,
    matchBrackets: true,
     matchTags: {bothTags: true},
     extraKeys: {
       "'<'": completeAfter,
       "'/'": completeIfAfterLt,
       "' '": completeIfInTag,
       "'='": completeIfInTag,
       "Ctrl-Space": "autocomplete",
       "Ctrl-J": "toMatchingTag"
       },
       hintOptions: {schemaInfo: tags},
       foldGutter: true,
       styleActiveLine: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
       autoCloseTags: true,
       autoCloseBrackets: true,

       theme: 'one-dark',


 });

var enableAutoKey = false;
if(editor_mode == "css"){
  var enableAutoKey = true;
}
if(editor_mode == "application/x-httpd-php"){
  var enableAutoKey = true;
}
if(editor_mode == "javascript"){
  var enableAutoKey = true;
}
if(enableAutoKey == true ){
  e.on("keydown", function(cm, x){
 var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(x.which != 38 && x.which != 40 && x.which != 27){

    setTimeout(function(){

      e.execCommand("autocomplete");

  }, 300);
};



});
}

var cd = this.code;

   localStorage.setItem(param.fileUrl, e.getValue());

   e.on("change", function(cm, cd){

     var code = editor.code[textAreaId];

     if(code == e.getValue())
     {

       localStorage.setItem(param.fileUrl+"_state", "saved");
       $(e.getWrapperElement()).attr("saved", 'true');
       $(".tab_box[editor_id='"+textAreaId+"']").find(".saved_state_icon").addClass("displayz");
     }else {


        localStorage.setItem(param.fileUrl+"_state", "unsaved");
       $(e.getWrapperElement()).attr("saved", 'false');
        $(".tab_box[editor_id='"+textAreaId+"']").find(".saved_state_icon").removeClass("displayz");
       $(".tab_box[editor_id='"+textAreaId+"']").find(".saved_state_icon").css("background", "orange");
       $(".tab_box[editor_id='"+textAreaId+"']").find(".saved_state_icon").show();
     }
     localStorage.setItem(param.fileUrl, e.getValue());



 });
   e.setSize("100%", "100%");
   $(e.getWrapperElement()).addClass("cm_mx_win_id_"+param.in);
   $(e.getWrapperElement()).addClass("cm_mx_id_"+textAreaId);
   $(e.getWrapperElement()).attr("ed_id", textAreaId);

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

   ary.map(this.data, function(i){

        if(i.el.length != 0){
        if(i.el.fileUrl == param.fileUrl){

          if(i.el.type == "editor"){
            i.el.parentId = param.in;
              ("Already");
            return false;
          }
        }
      }
    });

   if (checkArrayIsExists){
      this.data.push({
        fileUrl: param.fileUrl,
        parentId: param.in,
        stat: "saved",
        type: "editor"
      });
    };
    $("#textArea"+textAreaId)[0].remove();
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
  this.close(param.editorId, {
    localStorage: false
  });
};

function switchTab(param)
{

}
 var editor = new editor();
