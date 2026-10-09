import * as React from 'react';
/** Columnas Contexto / Idea / Resultado con filete superior, como en los boards de casos.
 * @startingPoint section="Editorial" subtitle="Columnas Contexto · Idea · Resultado" viewport="700x200" */
export interface ColumnTextProps{columns:{label:React.ReactNode;text:React.ReactNode}[];size?:number;inverse?:boolean;style?:React.CSSProperties;}
export function ColumnText(props:ColumnTextProps):JSX.Element;
