function required(x) {
  if(x == undefined)
  {
    console.log("Some parameter are missing");
    return false;
  }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}

function getFilename(url)
{
   if (url)
   {
      var m = url.substring(url.lastIndexOf('/')+1);

         return m;
       }

}

function getExtension(name)
{
   return name.slice((name.lastIndexOf(".") - 1 >>> 0) + 2);
}

function getEditorType(ext)
{
  var r = "";
  if(ext == "html")
  {
    r = "htmlmixed";
  }
  if(ext == "css")
  {
    r = "css";
  }
  if(ext == "js")
  {
    r = "javascript";
  }
  if(ext == "")
  {
    r = "htmlmixed";
  }
  return r;

}
