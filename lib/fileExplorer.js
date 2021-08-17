var dirLoaded = false;
loadDir("/virtual-folio/", {appendAfter: false});





function loadDir(uri, param)
{

  $.getJSON("server/explorer.php?uri="+uri, function(result){
  rootPath = result.data;



          var i;
          var token = makeid(5);
          $(param.el).attr("token", token);
          var k = "<div class='file_explorer "+token+"'></div>";
          if(param.appendAfter == true){
            $(param.el).after(k);
          }else {
            $(".file_navigator").append(k);
          }




          for (i = 0; i < result.folders.length; i++) {
            var color;
            color = getFolderName(result.folders[i]);





            if(getFolderName(result.folders[i]) == "img" || getFolderName(result.folders[i]) == "logo" || getFolderName(result.folders[i]) == "image" || getFolderName(result.folders[i]) == "images" || getFolderName(result.folders[i]) == "imgs" || getFolderName(result.folders[i]) == "pictures")
            {
              color = "img";
            }
            var kx = ""+
            ' '+
            '<div class="list fol_typ '+color+'_col" typ="folder" url="'+result.folders[i]+'" title="'+result.folders[i]+'">'+
              '<span class="material-icons ico">chevron_right</span>'+
              '<span class="material-icons">folder</span>'+
              '<txt>'+getFolderName(result.folders[i])+'</txt>'+
            "</div>"+
            "";
            $(".file_navigator ."+token).append(kx);


          }
          for (i = 0; i < result.files.length; i++) {
              var color ="";
              color = getExtension(getFilename(result.files[i]));
              if(getExtension(getFilename(result.files[i])) == "png" || getExtension(getFilename(result.files[i])) == "jpeg" || getExtension(getFilename(result.files[i])) == "jpg" || getExtension(getFilename(result.files[i])) == "svg" || getExtension(getFilename(result.files[i])) == "gif")
              {
                          color = "img";
              }


          var kx = ""+

          '<div class="list file_typ '+color+'_fcol" typ="file" url="'+result.files[i]+'" title="'+result.files[i]+'">'+
            '<span class="material-icons" style="display:none">chevron_right</span>'+
            '<span class="material-icons" style="margin-left:35px;">code</span>'+
            '<txt>'+getFilename(result.files[i])+'</txt>'+
          "</div>";


              $(".file_navigator ."+token).append(kx);

          }
          console.log('work started');
          dirLoaded = true;


      });

}




function openFile(p)
{
  var uri = p.url.replace(rootPath, "");
    $.getJSON("server/explorer.php?uri="+uri, function(result){
      console.log(result);
    });
}
$('body').on('click', '.list', function() {

  var typ = $(this).attr("typ");
  if(typ == "folder"){
    if($(this).attr("opened") != "true"){
      if($(this).attr("load") != "true"){
        var url = $(this).attr("url");
        url = url.replace(rootPath, "");
        loadDir(url, {appendAfter: true, el: this});
        $(this).attr("opened", "true");
        $(this).find('.ico').html("expand_more");
        $(this).attr("load", "true");
      }else {
        var token = $(this).attr("token");
        $(this).attr("opened", "true");
        $('.file_navigator .'+ token).css("display", "block");
        $(this).find('.ico').html("expand_more");
      }
    }else {
      var token = $(this).attr("token");
      $('.file_navigator .'+ token).css("display", "none");
        $(this).attr("opened", "false");
        $(this).find('.ico').html("chevron_right");
    }
  //loadDir("/mxStudio/", {appendAfter: false});
}
  if(typ == "file"){
    var uri = $(this).attr("url");

    if(localStorage.getItem(uri)){
      editor.new({in: tab.activeTab, fileUrl: uri, edVal: localStorage.getItem(uri)});
    }
    else
    {
    var url = uri.replace(rootPath, "");
    gate.read(
      {
        url: "server/readFile.php",
        data:{
          uri: url
        },
        ondone: function(data){
          editor.new({in: tab.activeTab, fileUrl: uri, edVal: data, loaded: "true"});
        }

      });
  }
}
});
