function onLoad(p){
  this.funs = [
    {
    name: "editor",
    work: function(p){


        editor.new({in: p.in, fileUrl: p.fileUrl});

    },
  },
    {
      name: "preview",
      work: function(p){
        
        preview.newTab({
          in: p.in,
          fileUrl: p.fileUrl,
        });

      }
    }
  ];
}

onLoad.prototype.exec = function(p){
  var t = this;
  ary.map(t.funs, function(i){
    console.log(i.el.name, p.name);
    if(i.el.name == p.name){
      i.el.work(p.para);
      return false;
    }
  });
}

var onLoad = new onLoad();
function mx() {
  this.key = "";





}
var onLoadWork = new work();

mx.prototype.init = function()
{
  // init editor panel

  if(localStorage.getItem("win_data"))
  {
    var innerHtml = makeHTML(localStorage.getItem("win_data"));
    $(".editorArea").html(innerHtml);
    $(".editorArea .CodeMirror").remove();
    $(".editorArea textarea").remove();
    $(".editorArea .win_drager_area").remove();
    $(".tab_box").remove();

//    localStorage.removeItem('win_data');

  }
  if(localStorage.getItem('editor_data')){
    var savedData = localStorage.getItem('editor_data');
    var prev = true;
  }else {
    var prev = false;
  }
    localStorage.removeItem('editor_data');


  if(prev == true)
  {
      var savedData = JSON.parse(savedData);
      for(var i = 0; i < savedData.length; i++){

        if(savedData[i] != null){

        var fileUrl = savedData[i].fileUrl;
        var id = savedData[i].parentId;
        var typ = savedData[i].type;


        if(typ == "editor"){

          onLoad.exec({
            name: "editor",
            para: {in: id, fileUrl: fileUrl}
          });

        }else{

          onLoad.exec({
            name: typ,
            para: {in: id, fileUrl: fileUrl}
          });
          // editor.new({in: id, fileUrl: fileUrl, edVal: editor_value});
        }
          //editor.new({in: id, fileUrl: fileUrl});

        localStorage.setItem("win_data", escapeCode($(".editorArea").html()));


      }

    }
  }else {


    tab.new({size: [100,100], fileUrl: "/untitled"});

  }
    onLoadWork.start({
      onProgress: function(perc){




                    $(".progress_bar span").animate({width: perc+"%"});





      },
      onDone: function(){

          setTimeout(function(){
            $(".loader").animate({top: "-100%"});
          }, 1000);

        }

    });
}
mx.prototype.ready = function(){
  if(dirLoaded){
    clearInterval(infiniteTry);
    mx.init();

  }
}

var mx = new mx();

var infiniteTry = setInterval(mx.ready, 800);
