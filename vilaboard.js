
(function() {
    
    var $ = function(id){return document.getElementById(id)};

    var canvas = this.__canvas = new fabric.Canvas('c', {
      isDrawingMode: true,
      isFullScreen: false,
      selectedColor: "#000000",
      selectedStroke: "2px",
      undo: [],
      redo: [],
      teachingmode: true,
      backgroundImage: null,
    });

    var parent = $('teach');

    canvas.setDimensions(
        {
            width: window.innerWidth,
            height: window.innerHeight - 75,
        }
    );
    document.addEventListener('keydown',function(event) {
        const active = canvas.getActiveObject();
        const key = event.key;
        if (key==="Delete"){ canvas.remove(active); }
        if (event.ctrlKey && key === 'z'){
            const pop = canvas.undo.pop();
            if (typeof pop !== 'undefined') {
                pop.undo();
            } 
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
    })

    fabric.Object.prototype.transparentCorners = false;
  
    var drawingModeEl = $('drawing-mode'),
        drawingShadowWidth = $('drawing-shadow-width'),
        toolbarAddtext = $('addtextbt');

    toolbarAddtext.onmouseup = function() {
        canvas.isDrawingMode = false;
        var text = new fabric.Textbox(
            $('addtext').value,{
                fill: canvas.selectedColor,
                fontFamily: 'sans-serif',
                statefullCache: true,
            }
        )
        if (canvas.teachingmode) text.setControlsVisibility({ bl: false, tl: false, tr: false, ml: false, mb: false, mt: false, mtr: false })
        canvas.add(text);
    }
  
    $('select').onclick = function() { canvas.isDrawingMode = false; };
    $('draw').onclick = function()   { canvas.isDrawingMode = true; };
    $('new').onclick = ()=> {canvas.clear()};
    $('del').onclick = ()=> {
        const obj = canvas.getActiveObject();
        canvas.remove(obj);
    };

    function setColor(color) {
        canvas.selectedColor = color;
        canvas.freeDrawingBrush.color = canvas.selectedColor;
        const obj = canvas.getActiveObject();
        if ( typeof obj !== 'undefined' && obj !== null) {
            if (obj instanceof fabric.Textbox) {
                obj.set('fill',color);            
            } else {
                obj.set('stroke',color);
            } 
            canvas.renderAll();
        }
    }
    
    $('white').onclick  = function()  {  setColor(this.getAttribute('value'))}
    $('black').onclick  = function()  {  setColor(this.getAttribute('value'))}
    $('color1').onclick = function()  {  setColor(this.getAttribute('value'))}
    $('color2').onclick = function()  {  setColor(this.getAttribute('value'))}
    $('color3').onclick = function()  {  setColor(this.getAttribute('value'))}
    $('color4').onclick = function()  {  setColor(this.getAttribute('value'))}
    

    $('stroke1').onclick = function() { canvas.freeDrawingBrush.width = parseInt(this.getAttribute('value'), 10) || 1 }
    $('stroke2').onclick = function() { canvas.freeDrawingBrush.width = parseInt(this.getAttribute('value'), 10) || 1 }
    $('stroke3').onclick = function() { canvas.freeDrawingBrush.width = parseInt(this.getAttribute('value'), 10) || 1 }
    $('stroke4').onclick = function() { canvas.freeDrawingBrush.width = parseInt(this.getAttribute('value'), 10) || 1 }

    $('t1').onclick = (e)=> {
        const src = e.target.src;
        document.body.style.backgroundImage = `url('${src}')`; 
    }
    $('t2').onclick = (e)=> {
        const src = e.target.src;
        document.body.style.backgroundImage = `url('${src}')`; 
    }
    $('t3').onclick = (e)=> {
        const src = e.target.src;
        document.body.style.backgroundImage = `url('${src}')`; 
    }

    canvas.on (
        'object:modified', () => {
            canvas.undo.push({'undo': ()=> canvas.remove(e.target), 'redo': ()=> canvas.add(e.target)});
        }
    )
    canvas.on (
        'object:added', (e) => {
            canvas.undo.push({
            'undo': ()=> {
                e.target.vilaundo = true;
                canvas.remove(e.target)
            }, 
            'redo': ()=> {
                canvas.add(e.target)
            },
            }
        );
        }
    )
    canvas.on (
        'object:removed', (e) => {
            canvas.undo.push({'undo': ()=>canvas.add(e.target), 'redo': ()=>canvas.remove(e.target)});
        }
        
    )


    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas,{
        statefullCache: true,
    });
 
    if (canvas.freeDrawingBrush) {
        var brush = canvas.freeDrawingBrush;
        brush.color = "#000000";
        
        if (brush.getPatternSrc) {
          brush.source = brush.getPatternSrc.call(brush);
        }
        brush.width = 2;
        brush.shadow = new fabric.Shadow({
          blur: 5,
          offsetX: 3,
          offsetY: 3,
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