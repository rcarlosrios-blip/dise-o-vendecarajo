import React from 'react';
const PAL={red:'var(--red)',ink:'var(--ink)'};
export function LetterTiles({word='',colors=['red','ink'],size=120,gap=6,style}){
  return <div style={{display:'flex',gap,fontFamily:'var(--font-sans)',...style}}>
    {[...word].map((ch,i)=>{const c=colors[i%colors.length];return <div key={i} style={{width:size,height:size,background:PAL[c]||c,color:'var(--paper)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:500,fontSize:size*0.82,lineHeight:1,letterSpacing:'-0.04em',paddingBottom:size*0.06,boxSizing:'border-box'}}>{ch===' '?'':ch}</div>;})}
  </div>;
}
