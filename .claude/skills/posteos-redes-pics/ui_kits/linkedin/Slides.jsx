const { Label, Stat, MetaBar, ColumnText, LetterTiles, ImageFrame, Signature } = window.RobertoROsLinkedInDesignSystem_eebb3e;
const A='../../assets/references/';
const cv=(bg,fg,extra)=>({width:1080,height:1350,background:bg,color:fg,fontFamily:'var(--font-sans)',padding:72,boxSizing:'border-box',display:'flex',flexDirection:'column',position:'relative',overflow:'hidden',...extra});
const H=(s,extra)=>({fontWeight:700,fontSize:s,lineHeight:0.9,letterSpacing:'-0.045em',margin:0,textWrap:'balance',...extra});
const N=6,HANDLE='@robertorios';
function SlideCover(){return <div style={cv('var(--ink)','var(--paper)')}>
  <MetaBar inverse kicker="Venta consultiva" title="Caso 04" mark="2026"/>
  <div style={{marginTop:48}}><Label size="lg">Caso de estudio</Label></div>
  <h1 style={H(132,{marginTop:36})}>El cliente no quiere tu demo.</h1>
  <div style={{flex:1,marginTop:48,minHeight:0}}><ImageFrame src={A+'ref-mesh-portrait.png'} ratio="auto" style={{height:'100%'}}/></div>
  <Signature inverse handle={HANDLE} page={'01 / 0'+N} style={{marginTop:40}}/>
</div>;}
function SlideProblem(){return <div style={cv('var(--paper)','var(--ink)')}>
  <MetaBar kicker="El problema" title="Lo que veo en 9 de cada 10 equipos" mark="02"/>
  <h2 style={H(150,{marginTop:120,fontWeight:800,fontStretch:'72%',textTransform:'uppercase',lineHeight:0.86,letterSpacing:'-0.03em'})}>Presentan antes de preguntar.</h2>
  <p style={{fontSize:34,lineHeight:1.3,maxWidth:'26ch',marginTop:56,letterSpacing:'-0.01em',textWrap:'pretty'}}>El vendedor llega con 40 slides. El cliente llega con un problema que nadie le preguntó.</p>
  <div style={{flex:1}}></div><Signature handle={HANDLE} page={'02 / 0'+N}/>
</div>;}
function SlideLetters(){return <div style={cv('var(--paper)','var(--ink)')}>
  <MetaBar kicker="El método" title="Tres preguntas antes de cualquier demo" mark="03"/>
  <div style={{display:'flex',flexDirection:'column',gap:14,marginTop:96}}>
    <LetterTiles word="qué" size={200} gap={10}/>
    <LetterTiles word="cómo" size={200} gap={10} colors={['ink','red']}/>
    <LetterTiles word="quién" size={168} gap={8} colors={['red','ink']}/>
  </div>
  <p style={{fontSize:30,lineHeight:1.3,maxWidth:'32ch',marginTop:56}}>¿Qué tiene que cambiar? ¿Cómo lo miden hoy? ¿Quién más decide?</p>
  <div style={{flex:1}}></div><Signature handle={HANDLE} page={'03 / 0'+N}/>
</div>;}
function SlideCase(){return <div style={cv('var(--paper)','var(--ink)')}>
  <MetaBar kicker="Distribuidora industrial" title="14 vendedores · 1 trimestre" mark="04"/>
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginTop:56,height:520}}>
    <ImageFrame alt="Foto del equipo en sesión" tone="light" ratio="auto" style={{height:'100%'}}/>
    <ImageFrame alt="Pizarra con el método" tone="light" ratio="auto" style={{height:'100%'}}/>
  </div>
  <ColumnText size={26} style={{marginTop:56}} columns={[{label:'Contexto',text:'Demos en la primera llamada. Cierre promedio: 45 días.'},{label:'Idea',text:'Prohibimos la demo hasta responder qué, cómo y quién.'},{label:'Resultado',text:'El cliente habló el 70% del tiempo. El ciclo bajó a 21 días.'}]}/>
  <div style={{flex:1}}></div><Signature handle={HANDLE} page={'04 / 0'+N}/>
</div>;}
function SlideStats(){return <div style={cv('var(--paper)','var(--ink)')}>
  <MetaBar kicker="Resultados" title="Después de 90 días" mark="05"/>
  <div style={{display:'flex',flexDirection:'column',gap:64,marginTop:96}}>
    <Stat value="73%" caption="de las oportunidades cerraron en la segunda reunión" size={260}/>
    <div style={{display:'flex',gap:96}}><Stat value="21d" caption="ciclo de venta (antes 45)" size={180} tone="red"/><Stat value="3×" caption="más respuestas a seguimiento" size={180} tone="red"/></div>
  </div>
  <div style={{flex:1}}></div><div style={{fontFamily:'var(--font-mono)',fontSize:18,color:'var(--mute)',marginBottom:24}}>Fuente: CRM del cliente, T2 2026 · n=212 oportunidades</div>
  <Signature handle={HANDLE} page={'05 / 0'+N}/>
</div>;}
function SlideCTA(){return <div style={cv('var(--red)','var(--paper)')}>
  <MetaBar inverse kicker="Carajo Vende" title="Roberto Ríos" mark="06"/>
  <h2 style={H(150,{marginTop:'auto'})}>Guarda esto. Mañana lo vas a usar.</h2>
  <p style={{fontSize:34,lineHeight:1.3,maxWidth:'24ch',marginTop:48,marginBottom:96}}>Comenta “MÉTODO” y te mando la guía de las tres preguntas.</p>
  <Signature inverse handle={HANDLE} page={'06 / 0'+N}/>
</div>;}
Object.assign(window,{SlideCover,SlideProblem,SlideLetters,SlideCase,SlideStats,SlideCTA});
