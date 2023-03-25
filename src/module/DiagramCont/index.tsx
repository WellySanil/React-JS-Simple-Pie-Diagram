import * as React from 'react'
import { useEffect } from 'react'
import "./style.css"
export interface DiagramContProps {
  title?: string
  children: React.ReactNode
  style?: string
}

export function DiagramCont({
  children,
  title = 'Diagram',
  style = ""
}: DiagramContProps) {
  let ref : React.RefObject<HTMLDivElement>;
  ref = React.createRef();
  useEffect(()=>{
    if (ref.current){
      let newStyle = `${style}`;
      ref.current?.setAttribute("style", newStyle);
    }
  },[])
  return (
    <div className='DiagramCont-main' ref={ref}>
        {children}
    </div>
  )
}