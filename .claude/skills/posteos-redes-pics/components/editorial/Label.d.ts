import * as React from 'react';
/** Etiqueta sólida roja o negra para categoría del post, máx. 1 por pieza.
 * @startingPoint section="Editorial" subtitle="Etiqueta de categoría" viewport="700x200" */
export interface LabelProps{children:React.ReactNode;tone?:'red'|'ink'|'paper';size?:'sm'|'md'|'lg'|'xl'|number;style?:React.CSSProperties;}
export function Label(props:LabelProps):JSX.Element;
