function dialog(){

  this.n = -1;
  this.work = new work();
}




dialog.prototype.show = function(p){

var t = this;
this.n = this.n+1;
var cur_dialog = this;

var work = this.work;
work.push(function(){


  const token = makeid(5);

  var btns = "";
  p.btn.forEach(function(item, i){
    btns = btns+'<div class="btn i_'+i+'">'+p.btn[i].text+'</div>';
  });


  var html = '<div class="dialog" id="'+token+'">'+
  '    <div class="title">'+
  '      <h3>'+p.title+'</h3>'+
  '    </div>'+
  '    <div class="cont">'+
  '      <p>'+
          p.text+
  '        </p>'+
  '    </div>'+
  '    <div class="btnArea">'+
    btns+
  '    </div>'+
  '  </div>';

  $(".screen").append(html);
  $('.fadescreen').css("display", "block");
  $('.screen').css("display", "flex");
  setTimeout(function(){
    document.getElementById(token).style.minHeight = "200px";
  }, 200);

  p.btn.forEach(function(item, i){


    $(document).on('click', '#'+token+' .i_'+i, function(){

      var k =  token;
      if(p.autoClose == false){

      }else{

        cur_dialog.close(token);
      }
      setTimeout(function(){
        work.nxt();
      }, 300);

      p.btn[i].click(k);

    });

  });

});

if(this.n == 0){
  work.start({
    onDone: function(){
      t.n = -1;
    }
  });
}

}

dialog.prototype.close = function(i){

  document.getElementById(i).style.minHeight = "0";
  document.getElementById(i).style.maxHeight = "58px";
  setTimeout(function(){
    document.getElementById(i).style.display = "none";
    $(".screen").hide();
  }, 200);

  $(".fadescreen").fadeOut();


}
