import React from 'react';
export function Stat({value,caption,size=160,tone='ink',align='left',style}){
  const fg=tone==='inverse'?'var(--paper)':tone==='red'?'var(--red)':'var(--ink)';
  return <div style={{display:'flex',flexDirection:'column',gap:size*0.08,alignItems:align==='left'?'flex-start':'center',textAlign:align,color:fg,fontFamily:'var(--font-sans)',...style}}>
    <div style={{fontWeight:300,fontSize:size,lineHeight:0.88,letterSpacing:'-0.05em',fontVariantNumeric:'tabular-nums'}}>{value}</div>
    {caption&&<div style={{fontWeight:700,fontSize:Math.max(16,size*0.17),lineHeight:1.15,letterSpacing:'-0.01em',maxWidth:'15ch',color:tone==='inverse'?'var(--paper)':'var(--ink)'}}>{caption}</div>}
  </div>;
}
