import * as React from 'react';
/** Palabra en minúsculas, una letra por cuadro de color plano (patrón why/how/who).
 * @startingPoint section="Gráfico" subtitle="Letras en cuadros de color" viewport="700x200" */
export interface LetterTilesProps{word:string;colors?:string[];size?:number;gap?:number;style?:React.CSSProperties;}
export function LetterTiles(props:LetterTilesProps):JSX.Element;
