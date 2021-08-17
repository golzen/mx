$('body').on('click', '.add_box', function() {

  var win = $(this).attr("parent_id");
  editor.new({in: win});
});


$('body').on('click', '.clickArea', function() {

  var ed_id = $(this).parent().attr("editor_id");
  var win_id = $(this).parent().attr("win_id");


    editor.switch({
      edId: ed_id,
      winId: win_id
    });



});
$('body').on('mouseover', '.tab_box', function() {

  $(this).find("span").show();
  $(this).find(".saved_state_icon").hide();


});
$('body').on('mouseleave', '.tab_box', function() {

  $(this).find("span").hide();
  if(!$(this).find(".saved_state_icon").hasClass("displayz")){
    $(this).find(".saved_state_icon").show();
  }

});


$('body').on('click', '.tab_box span', function() {

  var ed_id = $(this).parent().attr("editor_id");
  var win_id = $(this).attr("win_id");


  editor.close(ed_id);



});

var isDragging = false;
var sel_ed_id;
var selected;

    $('body').on("mousedown", ".tab_box", function(e) {

      isDragging = true;

        var el_w = $('.draggable').outerWidth(),
            el_h = $('.draggable').outerHeight();

          sel_ed_id = $(this).attr("editor_id");
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


    });




$('body').on("mouseenter", ".area", function(){

  if(isDragging){
      $(".editArea").css("overflow", "hidden");
      var loc = $(this).attr("pos");
      var parent = $(this).attr("ed_id");
      $(".prev_area").hide();
      $(".prev_area").attr("sel", 'false');
      $(".editorTab").css("background", '#151515');
      $(".area_"+loc+"[ed_id='"+parent+"']").show();
      $(".area_"+loc+"[ed_id='"+parent+"']").attr("sel", 'true');

      selected = "area";
    }else {
    }
});

$('body').on("mouseenter", ".editorTab", function(){

  if(isDragging){
      $(".editArea").css("overflow", "auto");
      $(".prev_area").hide();
      $(".prev_area").attr("sel", 'false');
      $(".editorTab").attr("sel", 'false');
      $(this).attr("sel", "true");
      $(this).css("background", 'repeating-linear-gradient(45deg, transparent, transparent 10px, #21252b 10px, #282c34 20px');
      selected = "panel";
    }else {

      $(".editorTab").css("background", "#151515");
    }
});
$('body').on("mouseup", ".draggable", function(e) {

    if (isDragging) {

      if(selected == "area"){
        var parent = $(".prev_area[sel=true]").attr('parent');
        var editor_id = sel_ed_id;
        var pos = $(".prev_area[sel=true]").attr('pos');

        editor.move({axis: pos, parent: parent, editorId: editor_id});

          $(".prev_area").hide();
          $(".draggable").hide();
          $(".win_drager_area").hide();
          $(".editorTab").attr("sel", 'false');
          $(".editorTab").css("background", "#151515");
          $(".prev_area").attr("sel", 'false');
          $(".editArea").css("overflow", "auto");
          isDragging = false;

          $(".draggable").hide();
        }

        if(selected == "panel")
        {
          var parent = $(".editorTab[sel=true]").attr('parent');


          var editor_id = sel_ed_id;

          var fileUrl = editor.get(editor_id).fileUrl;
          var edVal = editor.get(editor_id).value;

          editor.new({in: parent, fileUrl: fileUrl, edVal: edVal});
          editor.close(editor_id);
          $(".prev_area").hide();
          $(".draggable").hide();
          $(".win_drager_area").hide();
          $(".editorTab").attr("sel", 'false');
          $(".prev_area").attr("sel", 'false');
          $(".editorTab").css("background", "#151515");
            isDragging = false;
            $(".draggable").hide();
        }
      }else{


      }
});
