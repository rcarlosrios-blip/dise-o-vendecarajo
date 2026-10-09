import * as React from 'react';
/** Marco de imagen de esquinas rectas sobre fondo negro, rojo o blanco con filete; placeholder mono si no hay src.
 * @startingPoint section="Gráfico" subtitle="Marco de imagen / placeholder" viewport="700x300" */
export interface ImageFrameProps{src?:string;alt?:string;ratio?:string;caption?:React.ReactNode;tone?:'dark'|'red'|'light';fit?:'cover'|'contain';style?:React.CSSProperties;}
export function ImageFrame(props:ImageFrameProps):JSX.Element;
