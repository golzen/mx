function preview(a){

  //this.editor = a.editor;


}

preview.prototype.newTab = function(param){
  required(param.in);
  var saved_code;


    $("."+param.in).attr("l", ($("."+param.in).attr("l")-0)+1);

    const textAreaId = makeid(10);
  var filename = "untitled";
  if(param.fileUrl != undefined)
  {
     filename = '(P) '+getFilename(param.fileUrl);
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
  if(param.edId == undefined){
    var edId = "";
  }else{
    var edId = param.edId;
    param.fileUrl = editor.get(edId).fileUrl;
  }


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



var if_class = "cm_mx_win_id_"+param.in+ " "+"cm_mx_id_"+textAreaId;

$("."+param.in+" .editArea").append("<iframe typ='preview' file_url='"+param.fileUrl+"' class='"+if_class+"' src=''></iframe>");


var code = "<body><script src=https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js></script><script>var url = '"+param.fileUrl+"';</script><script src=http://localhost/mxStudio/iframe/main.js></script></body>";


var doc = document.getElementsByClassName(if_class)[0].contentWindow.document;
console.log(code);
doc.open();
doc.write(code);
doc.close();

var checkArrayIsExists =

ary.map(editor.data, function(i){

     if(i.el.length != 0){
     if(i.el.fileUrl == param.fileUrl){

       if(i.el.type == "preview"){
         editor.data[i.key].parentId = param.in;
           ("Already");
         return false;
       }
     }
   }
 });

if (checkArrayIsExists){
   editor.data.push({
     fileUrl: param.fileUrl,
     parentId: param.in,
     stat: "saved",
     type: "preview"
   });
 };
       editor.switch({
         edId: textAreaId,
         winId: param.in
       });

localStorage.setItem("editor_data", JSON.stringify(editor.data));





}

var preview = new preview();
