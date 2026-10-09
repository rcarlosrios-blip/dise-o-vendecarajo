import React from 'react';
export function ColumnText({columns=[],size=22,inverse=false,style}){
  const fg=inverse?'var(--paper)':'var(--ink)';
  return <div style={{display:'grid',gridTemplateColumns:`repeat(${columns.length||1},minmax(0,1fr))`,gap:'var(--canvas-gutter)',color:fg,fontFamily:'var(--font-sans)',...style}}>
    {columns.map((c,i)=><div key={i} style={{borderTop:'1px solid '+fg,paddingTop:size*0.5}}>
      <div style={{fontWeight:700,fontSize:size*1.1,letterSpacing:'-0.02em',marginBottom:size*0.45}}>{c.label}</div>
      <div style={{fontWeight:400,fontSize:size,lineHeight:1.3,textWrap:'pretty'}}>{c.text}</div>
    </div>)}
  </div>;
}
