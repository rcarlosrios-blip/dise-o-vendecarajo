import * as React from 'react';
/** Firma de pie de pieza: nombre en Archivo Bold (sin logo; rol por defecto "Carajo Vende"), rol en mono, handle y paginación.
 * @startingPoint section="Marca" subtitle="Firma / pie de slide" viewport="700x120" */
export interface SignatureProps{name?:string;role?:string;handle?:string;page?:string;inverse?:boolean;style?:React.CSSProperties;}
export function Signature(props:SignatureProps):JSX.Element;
