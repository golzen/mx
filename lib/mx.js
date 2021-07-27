
function mx() {
  this.key = "";





}


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

    localStorage.removeItem('win_data');

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
        var fileUrl = savedData[i].fileUrl;
        var id = savedData[i].parentId;
        console.log("id: "+id);

        editor.new({in: id, fileUrl: fileUrl});



        localStorage.setItem("win_data", escapeCode($(".editorArea").html()));




    }
  }else {

    tab.new({size: [99,100], fileUrl: "/new"});

  }
}

var mx = new mx();

mx.init();
