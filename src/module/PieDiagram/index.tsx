import * as React from 'react'
import "./style.css"
export interface PieDiagramProps {
  title?: string
  children: React.ReactNode
  isShowData?: boolean
  isVertical?: boolean
  data?: object
  style?: string
  innerText?: string
  centerColor?: string
  textColor?: string
}

export function PieDiagram({
  children,
  title = '',
  isShowData = false,
  isVertical = false,
  data = {"test1": 1, "test2":2, "test3":3},
  style = "",
  innerText = "Summary",
  centerColor = "#222222",
  textColor = "#FFFFFF"
}: PieDiagramProps) {
  let colors = ["#FBDE37","#E25E65", "#31B07E","#937e88","#907e80","#937e00"]
  let canvasRef: React.RefObject<HTMLCanvasElement>;
  canvasRef = React.createRef();

  let ref : React.RefObject<HTMLDivElement>;
  ref = React.createRef();


  React.useEffect(()=>{
    setUpCanvas();
    if (ref.current){
      let newStyle = `${style}`;
      ref.current?.setAttribute("style", newStyle);
    }
  },[])
  const setUpCanvas = () => {
    var myCanvas = canvasRef.current;
    if (myCanvas){
      myCanvas.width = 300;
      myCanvas.height = 300;
      var _ctx = myCanvas.getContext("2d");

      var myPiechart = new PiechartType1(
        {
          canvas:myCanvas,
          data:data,
          colors: colors
        }
      );
      myPiechart.draw();
    }
  }
  var PiechartType1 = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.draw = function(){
      var total_value = 0;
      var color_index = 0;
      for (var categ in this.options.data){
        var val = this.options.data[categ];
        total_value += val;
      }
      var start_angle = 0;
      for (categ in this.options.data){
        val = this.options.data[categ];
        var slice_angle = 2 * Math.PI * val / total_value;
        drawPieSlice(
          this.ctx,
          this.canvas.width/2,
          this.canvas.height/2,
          Math.min(this.canvas.width/2,this.canvas.height/2),
          start_angle,
          start_angle+slice_angle,
          this.colors[color_index%this.colors.length],
          `${innerText} ${calculateSummary(data)}`,
          centerColor,
          textColor
        );
        start_angle += slice_angle;
        color_index++;
      }
    }
  }

  function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color, text, centerColor, textColor ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = centerColor;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius/1.4, 0, 360);
    ctx.closePath();
    ctx.moveTo(centerX,centerY);
    ctx.fill()
    ctx.moveTo(centerX,centerY);
    ctx.font = "22px Verdana";
    ctx.fillStyle = textColor
    ctx.textAlign = "center";
    ctx.textBaseline="middle";
    ctx.fillText(text, radius, radius);
  }

  function calculateSummary(data){
    let res = Object.values(data).reduce(function (previous, val) {
      return Number(previous) + Number(val);}, 0)
    return res
  }
  return (
    <div className={isVertical ? 'PieDiagram-main-column' : 'PieDiagram-main-row'} ref={ref}>
      {title && <p style={{color: "white"}}>{title}</p>}
      <div style={{color: "white", position: "relative"}}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={isVertical ? 'PieDiagram-additional-vertical' : 'PieDiagram-additional-horizontal'}>
        {isShowData && data && Object.entries(data).map(([key, val],ind) => {
            return <div className='PieDiagram-additional-row'>
              <div className='PieDiagram-additional-row-column'>
                <div className='PieDiagram-additional-row-icon' style={{backgroundColor: colors[ind]}}></div>
              </div>
              <div className='PieDiagram-additional-row-text'>{key}</div>
              <div className='PieDiagram-additional-row-text'>-</div>
              <div className='PieDiagram-additional-row-text'>{val}</div>
            </div>
          })
        }
      </div>
    </div>
  )
}