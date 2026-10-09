import React from 'react';
export function MetaBar({kicker,title,mark,inverse=false,style}){
  const fg=inverse?'var(--paper)':'var(--ink)';
  return <div style={{display:'grid',gridTemplateColumns:'auto 1fr auto',alignItems:'stretch',color:fg,fontFamily:'var(--font-sans)',borderBottom:'1px solid '+fg,...style}}>
    <div style={{fontWeight:700,fontSize:36,letterSpacing:'-0.03em',lineHeight:1,padding:'0 24px 16px 0'}}>{kicker}</div>
    <div style={{borderLeft:'1px solid '+fg,fontWeight:400,fontSize:36,letterSpacing:'-0.03em',lineHeight:1,padding:'0 24px 16px'}}>{title}</div>
    <div style={{fontFamily:'var(--font-mono)',fontSize:18,letterSpacing:'0.02em',textTransform:'uppercase',alignSelf:'end',padding:'0 0 16px'}}>{mark}</div>
  </div>;
}
