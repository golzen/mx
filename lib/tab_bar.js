$('body').on('click', '.add_box', function() {

  var win = $(this).attr("parent_id");
    editor.new({in: win});
});


$('body').on('click', '.tab_box', function() {

  var ed_id = $(this).attr("editor_id");
  var win_id = $(this).attr("win_id");


  editor.switch({
    edId: ed_id,
    winId: win_id
  });


});


var isDragging = false;

  $('body').on("mouseup", ".tab_box", function(e) {
    isDragging = false;
  });
    $('body').on("mousedown", ".tab_box", function(e) {

      isDragging = true;

        var el_w = $('.draggable').outerWidth(),
            el_h = $('.draggable').outerHeight();
        $('body').on("mousemove", function(e) {

            if (isDragging) {

              $(".draggable").show();

              $(".win_drager_area").css("display", 'block');

              if(e.pageY > $(".editorArea").offset().top){
                if(e.pageX > $(".editorArea").offset().left){
                  if(e.pageY < $(".editorArea").height()){
                    if(e.pageX < $(window).width()-25){
                      $(".area").show();
                    //  if(e.pageX < $(window).width())
                      $(".draggable").offset({
                          top: e.pageY,
                          left: e.pageX
                      });
              }
            }
            }
            }


          }else {
              $(".draggable").hide();
          }
        });


    }).on("mouseup", ".draggable", function(e) {

        if (isDragging) {
        var parent = $(".prev_area[sel=true]").attr('parent');
        var editor_id = $(".prev_area[sel=true]").attr('ed_id');
        var pos = $(".prev_area[sel=true]").attr('pos');
        console.log(editor_id);
        editor.move({axis: pos, parent: parent, editorId: editor_id});

          $(".prev_area").hide();
          $(".draggable").hide();
          $(".win_drager_area").hide();
          $(".prev_area").attr("sel", 'false');
          isDragging = false;
              console.log(isDragging);
          $(".draggable").hide();
        }
    });



var $dragging = null;

$('body').on("mouseenter", ".area", function(){

  if(isDragging){
      var loc = $(this).attr("pos");
      var parent = $(this).attr("parent");
      $(".prev_area").hide();
        $(".prev_area").attr("sel", 'false');
      $(".area_"+loc+"[parent='"+parent+"']").show();
      $(".area_"+loc+"[parent='"+parent+"']").attr("sel", 'true');
      console.log(parent+loc);
    }else {
    }
}).on("mouseup", ".area", function(){
      isDragging = false;
      $(".prev_area").hide();

});
