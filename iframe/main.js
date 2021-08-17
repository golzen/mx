var base = "http://localhost/virtual-folio/html/";
var prevCode = "";
function absolute(base, rel) {
         var st = base.split("/");
         var arr = rel.split("/");
         st.pop(); // ignore the current file name (or no string)
        // (ignore if "base" is the current folder without having slash in trail)
         for (var i = 0; i < arr.length; i++) {
             if (arr[i] == ".")
                 continue;
             if (arr[i] == "..")
                 st.pop();
             else {

             }
                 st.push(arr[i]);
         }
         return st.join("/");
     }

var code = localStorage.getItem(url);

setInterval(function(){
  if(prevCode != localStorage.getItem(url)){
    console.log("g");
    prevCode = localStorage.getItem(url);
    $('body').html(localStorage.getItem(url));
    $("link").each(function(){

    var atr = $(this).attr("href");
    var urlWhole = new URL(atr, base).href;

    $(this).attr("href", urlWhole);
    });

    $("img").each(function(){

    var atr = $(this).attr("src");
    var urlWhole = new URL(atr, base).href;

    $(this).attr("src", urlWhole);
    });

    $("script").each(function(){

    var atr = $(this).attr("src");
    var urlWhole = new URL(atr, base).href;

    $(this).attr("src", urlWhole);
    });
    $("a").each(function(){

    var atr = $(this).attr("href");
    var urlWhole = new URL(atr, base).href;

    $(this).attr("href", urlWhole);
    });
  }
}, 300);
