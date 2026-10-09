import * as React from 'react';
/** Cabecera de board: kicker bold | título regular separado por filete vertical, marca a la derecha.
 * @startingPoint section="Editorial" subtitle="Cabecera tipo case board" viewport="700x120" */
export interface MetaBarProps{kicker:React.ReactNode;title?:React.ReactNode;mark?:React.ReactNode;inverse?:boolean;style?:React.CSSProperties;}
export function MetaBar(props:MetaBarProps):JSX.Element;
