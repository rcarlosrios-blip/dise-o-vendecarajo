import React from 'react';
export function ImageFrame({src,alt='',ratio='4/5',caption,tone='dark',fit='cover',style}){
  const bg=tone==='dark'?'var(--ink)':tone==='red'?'var(--red)':'var(--paper)';
  const fg=tone==='light'?'var(--mute)':'var(--paper)';
  return <figure style={{margin:0,display:'flex',flexDirection:'column',gap:10,...style}}>
    <div style={{aspectRatio:ratio,background:bg,overflow:'hidden',border:tone==='light'?'1px solid var(--ink)':'none',boxSizing:'border-box',display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
      {src?<img src={src} alt={alt} style={{width:'100%',height:'100%',objectFit:fit,display:'block'}}/>:<span style={{fontFamily:'var(--font-mono)',fontSize:16,letterSpacing:'0.02em',color:fg,textTransform:'uppercase'}}>{alt||'Imagen'}</span>}
    </div>
    {caption&&<figcaption style={{fontFamily:'var(--font-mono)',fontSize:16,letterSpacing:'0.02em',color:'inherit',opacity:.75}}>{caption}</figcaption>}
  </figure>;
}
