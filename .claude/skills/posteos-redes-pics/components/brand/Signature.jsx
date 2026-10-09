import React from 'react';
export function Signature({name='Roberto Ríos',role='Carajo Vende',handle,page,inverse=false,style}){
  const fg=inverse?'var(--paper)':'var(--ink)';
  return <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:24,color:fg,fontFamily:'var(--font-sans)',borderTop:'1px solid '+fg,paddingTop:16,...style}}>
    <div style={{display:'flex',alignItems:'baseline',gap:16,flexWrap:'wrap'}}>
      <span style={{fontWeight:700,fontSize:30,letterSpacing:'-0.04em',lineHeight:1}}>{name}</span>
      <span style={{fontFamily:'var(--font-mono)',fontSize:18,letterSpacing:'0.02em',textTransform:'uppercase'}}>{role}</span>
    </div>
    <div style={{fontFamily:'var(--font-mono)',fontSize:18,letterSpacing:'0.02em',display:'flex',gap:20}}>{handle&&<span>{handle}</span>}{page&&<span>{page}</span>}</div>
  </div>;
}
