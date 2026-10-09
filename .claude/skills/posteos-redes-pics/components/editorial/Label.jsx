import React from 'react';
const TONES={red:['var(--red)','var(--paper)'],ink:['var(--ink)','var(--paper)'],paper:['var(--paper)','var(--ink)']};
const SIZES={sm:18,md:28,lg:44,xl:64};
export function Label({children,tone='red',size='md',style}){
  const [bg,fg]=TONES[tone]||TONES.red;const fs=SIZES[size]||size;
  return <span style={{display:'inline-flex',alignItems:'center',background:bg,color:fg,fontFamily:'var(--font-sans)',fontWeight:700,fontSize:fs,lineHeight:1,letterSpacing:'-0.02em',padding:'0.22em 0.42em 0.26em',borderRadius:'var(--radius-label)',whiteSpace:'nowrap',...style}}>{children}</span>;
}
