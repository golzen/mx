$(".file_navigator").append("<div class='resizerHolder top-right' ></div>");

var isResizing = false;
/*Make resizable div by Hung Nguyen*/
function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizerHolder')
  const minimum_size = 175;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  const edi_original_width = $(".editorArea").width();
  const el_width = $(div).width();
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      isResizing = true;
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })

    function resize(e) {

      if(isResizing){
    
      $(".editor").fadeOut();
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)

        const ed_width = edi_original_width - (e.pageX - original_mouse_x);

        if (width > minimum_size) {
          element.style.width = width + 'px'

          $(".editorArea").css('width', ed_width);
        }
        var totalWidthUsed = ed_width + (width);

        if(totalWidthUsed > $(window).width()){
          $(".editorArea").css("width", "85%");
          $(".file_navigator").css("width", "14.9%");
        }

      }
      else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }
    }

    function stopResize() {

      if(isResizing){

      $(".editor").css("opacity", "0");
      $(".editor").css("display", "flex");
      $(".editor").animate({opacity: 1});
      document.querySelector(".CodeMirror").CodeMirror.refresh();
      window.removeEventListener('mousemove', resize);
      isResizing = false;
    }
  }
  }
}

makeResizableDiv('.file_navigator')
