$(document).keydown(function(e) {
    if (e.keyCode == 187 && e.ctrlKey) {

        var e_fontSize = editor.fontSize-0;
        editor.fontSize = e_fontSize+1;
        editor.setFontSize(editor.fontSize);
        localStorage.setItem("fontSize", editor.fontSize);
        $('.CodeMirror').each(function(i, el){
          el.CodeMirror.refresh();
      });
        return false;
    }


    if (e.keyCode == 189 && e.ctrlKey) {

        var e_fontSize = editor.fontSize-0;
        editor.fontSize = e_fontSize-1;
        editor.setFontSize(editor.fontSize);
        localStorage.setItem("fontSize", editor.fontSize);
        $('.CodeMirror').each(function(i, el){
          el.CodeMirror.refresh();
      });
        return false;
    }

    if (e.keyCode == 83 && e.altKey) {

        var current_id = editor.activeEditor;

        editor.switchNext({
          edId: current_id,
          winId: editor.get(current_id).parentTab
        })
        return false;
    }
});
