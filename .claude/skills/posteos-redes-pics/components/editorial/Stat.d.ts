import * as React from 'react';
/** Cifra grande en peso light con leyenda corta en bold (patrón "73% believe…").
 * @startingPoint section="Editorial" subtitle="Cifra + leyenda" viewport="700x240" */
export interface StatProps{value:React.ReactNode;caption?:React.ReactNode;size?:number;tone?:'ink'|'inverse'|'red';align?:'left'|'center';style?:React.CSSProperties;}
export function Stat(props:StatProps):JSX.Element;
