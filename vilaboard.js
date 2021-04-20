
(function() {
    
    var $ = function(id){return document.getElementById(id)};
    var canvas = this.__canvas = new fabric.Canvas('c', {
      isDrawingMode: true,
      isFullScreen: false,
      selectedColor: "#000000",
      selectedStroke: "2px",
    });

    var parent = $('teach');

    canvas.setDimensions(
        {
            width: window.innerWidth,
            height: window.innerHeight - 100,
        }
    );
    document.addEventListener('keydown',function(event) {
        var active = canvas.getActiveObject();
        const key = event.key;
        if (key==="Delete"){
            canvas.remove(active);
        }
    });

    window.addEventListener("resize", function () {
        console.log(window.innerWidth,window.innerHeight);
        canvas.setDimensions(
            {
                width: window.innerWidth,
                height: window.innerHeight - 100,
            }
        );
        
       /*
        canvas.setDimensions(
            {
                width: parent.offsetWidth,
                height: parent.offsetHeight
            }
        );
        */
        
    })

    fabric.Object.prototype.transparentCorners = false;
  
    var drawingModeEl = $('drawing-mode'),
        drawingShadowWidth = $('drawing-shadow-width'),
        toolbarAddtext = $('addtextbt'),
        clearEl = $('clear-canvas');
  
    clearEl.onclick = function() { canvas.clear() };

    toolbarAddtext.onmouseup = function() {
        canvas.add(
            new fabric.Textbox(
                $('addtext').value,{
                    fill: canvas.selectedColor,
                }
            )
        );
    }
  
    $('select').onclick = function() { canvas.isDrawingMode = false; };
    $('draw').onclick = function() { canvas.isDrawingMode = true; };
    
    $('white').onclick  = function()  { canvas.freeDrawingBrush.color = canvas.selectedColor = this.value; }
    $('black').onclick  = function()  { canvas.freeDrawingBrush.color = canvas.selectedColor = this.value; }
    $('color1').onclick = function()  { canvas.freeDrawingBrush.color = canvas.selectedColor = this.value; }
    $('color2').onclick = function()  { canvas.freeDrawingBrush.color = canvas.selectedColor = this.value; }
    $('color3').onclick = function()  { canvas.freeDrawingBrush.color = canvas.selectedColor = this.value; }
    $('color4').onclick = function()  { canvas.freeDrawingBrush.color = canvas.selectedColor = this.value; }

    $('stroke1').onclick = function() { canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1 }
    $('stroke2').onclick = function() { canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1 }
    $('stroke3').onclick = function() { canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1 }
    $('stroke4').onclick = function() { canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1 }

  


    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
 
    if (canvas.freeDrawingBrush) {
        var brush = canvas.freeDrawingBrush;
        brush.color = "#000000";
        if (brush.getPatternSrc) {
          brush.source = brush.getPatternSrc.call(brush);
        }
        brush.width = 2;
        brush.shadow = new fabric.Shadow({
          blur: 5,
          offsetX: 4,
          offsetY: 4,
          affectStroke: true,
          color: "#00000022",
        });
      }

  })();

(function() {
window.addEventListener('load', function() {
var canvas = this.__canvas || this.canvas,
    canvases = this.__canvases || this.canvases;

canvas && canvas.calcOffset && canvas.calcOffset();

if (canvases && canvases.length) {
for (var i = 0, len = canvases.length; i < len; i++) {
    canvases[i].calcOffset();
}
}
});
})();