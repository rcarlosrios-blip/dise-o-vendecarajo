const { Label: L2, Stat: S2, Signature: Sig2, LetterTiles: LT2 } = window.RobertoROsLinkedInDesignSystem_eebb3e;
function PostStat(){return <div style={{width:1080,height:1080,background:'var(--red)',color:'var(--paper)',fontFamily:'var(--font-sans)',padding:72,boxSizing:'border-box',display:'flex',flexDirection:'column'}}>
  <div><L2 size="lg" tone="ink">Dato de la semana</L2></div>
  <div style={{marginTop:'auto'}}><S2 value="68%" caption="de los compradores B2B decide antes de hablar con un vendedor" size={340} tone="inverse"/></div>
  <Sig2 inverse handle="@robertorios" style={{marginTop:72}}/>
</div>;}
function PostQuote(){return <div style={{width:1080,height:1080,background:'var(--paper)',color:'var(--ink)',fontFamily:'var(--font-sans)',padding:72,boxSizing:'border-box',display:'flex',flexDirection:'column'}}>
  <div style={{fontFamily:'var(--font-mono)',fontSize:20,textTransform:'uppercase',letterSpacing:'0.02em'}}>Nota rápida · 09.10.2026</div>
  <h2 style={{fontWeight:700,fontSize:120,lineHeight:0.9,letterSpacing:'-0.045em',margin:'auto 0 0',textWrap:'balance'}}>Nadie compra un producto. Compran no equivocarse.</h2>
  <Sig2 handle="@robertorios" style={{marginTop:72}}/>
</div>;}
function Banner(){return <div style={{width:1584,height:396,background:'var(--ink)',color:'var(--paper)',fontFamily:'var(--font-sans)',display:'grid',gridTemplateColumns:'1fr auto',alignItems:'end',padding:'48px 72px',boxSizing:'border-box'}}>
  <div style={{paddingLeft:360}}><div style={{fontWeight:700,fontSize:96,lineHeight:0.9,letterSpacing:'-0.05em'}}>Vende con método.</div><div style={{fontFamily:'var(--font-mono)',fontSize:22,letterSpacing:'0.02em',textTransform:'uppercase',marginTop:20}}>Roberto Ríos · Carajo Vende</div></div>
  <LT2 word="qué" size={88} gap={6}/>
</div>;}
Object.assign(window,{PostStat,PostQuote,Banner});
