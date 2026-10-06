import { useEffect, useRef, useState } from 'react'
import { T, DODGES, FINAL_DODGES, LETTER_PHOTOS, OFFICIAL_FLOWERS } from './content'
import * as music from './audio'
import { Btn, Nudaeng, Particles, MusicBtn, Proposal, Photo, Flower, Burst } from './components'
const HEARTS = ['💗', '💖', '🤍', '✨']
const PETALS = ['🌸', '🌷', '🌼', '🩷']
const CONFETTI = ['#f8c3cf', '#ffd7bd', '#cde5f4', '#e5daf2', '#fff1c9', '🌸', '✨', '💖']

function Scene({ out, ms, className, children }) {
  return <main className={`scene ${out ? 'out' : ''} ${className}`} style={out ? { animationDuration: ms + 'ms' } : undefined}>{children}</main>
}

/* PAGE 1 */
const Landing = ({ go }) => (
  <>
    <div className="row">
      <h1 className="wei">{[...T.landing.title].map((c, i) => <span key={i} style={{ animationDelay: i * 0.08 + 's' }}>{c}</span>)}</h1>
      <Nudaeng size="lg" mood="three"  />
    </div>
    <Btn onClick={() => go('cards')}>{T.landing.btn}</Btn>
  </>
)

/* PAGE 2 */
function Cards({ go }) {
  const all = [...T.cards.list, T.cards.last]
  const [i, setI] = useState(0)
  const last = i >= all.length - 1
  const next = () => setI((v) => Math.min(v + 1, all.length - 1))
  return (
    <>
      <Nudaeng size="sm" mood="one" />
      <h2 className="hand head">{T.cards.heading}</h2>
      <div className="stack" onPointerUp={next}>
        {all.map((t, k) => (
          <div key={k} className={`note ${k === all.length - 1 ? 'big' : ''} ${k < i ? 'gone' : ''} ${k > i + 2 ? 'far' : ''}`}
            style={{ '--k': k - i, '--r': (k % 2 ? 3 : -3) + 'deg', zIndex: k < i ? 0 : 20 - (k - i) }}>{t}</div>
        ))}
      </div>
      {last ? <Btn className="late" onClick={() => go('game')}>{T.cards.btn}</Btn>
        : <><Btn onClick={next}>{T.cards.next}</Btn><small>{T.cards.hint}</small></>}
    </>
  )
}

/* PAGE 3 */
function Game({ go, setDusk }) {
  const [ph, setPh] = useState('q')
  useEffect(() => {
    const t = [setTimeout(() => setPh('fade'), 6000), setTimeout(() => { setPh('joke'); setDusk(true) }, 7600)]
    return () => t.forEach(clearTimeout)
  }, [])
  if (ph === 'joke')
    return (
      <>
        <Nudaeng mood="laugh" party />
        <h1 className="ha">{T.joke.a}</h1>
        <h2 className="hand big late" style={{ animationDelay: '1s' }}>{T.joke.b}</h2>
        <p className="late" style={{ animationDelay: '2.4s' }}>{T.joke.c}</p>
        <Btn className="late" style={{ animationDelay: '4s' }} onClick={() => go('ask', 1800)}>{T.joke.btn}</Btn>
      </>
    )
  return (
    <div className={`fadable ${ph === 'fade' ? 'fadeout' : ''}`}>
      <h2 className="hand head">{T.quiz.title}</h2>
      <div className="card">
        <Nudaeng mood="think" size="sm" />
        <p className="qq">{T.quiz.q}</p>
      </div>
    </div>
  )
}

/* PAGE 4 — first proposal */
function Ask({ go, onNo }) {
  const [st, setSt] = useState(0)
  useEffect(() => {
    const t = [
      setTimeout(() => { setSt(1); music.askTrack() }, 3000),
      setTimeout(() => setSt(2), 10500),
      setTimeout(() => setSt(3), 13000),
    ]
    return () => t.forEach(clearTimeout)
  }, [])
  if (st < 2) return <h2 key={st} className="fadeio hand big" style={{ animationDuration: st ? '7.5s' : '3s' }}>{st ? T.ask.b : T.ask.a}</h2>
  if (st === 2) return null
  return (
    <div className="slowin">
      <div className="vig" />
      <Proposal steps={T.steps} dodges={DODGES} question={T.ask.q} onNo={() => onNo(T.end.first, 'ask')} onYes={() => go('yes', 900)} />
    </div>
  )
}

/* YES celebration */
function Yes({ go }) {
  const [s, setS] = useState(0)
  useEffect(() => {
    music.pasilyo()
    const t = [setTimeout(() => setS(1), 2200), setTimeout(() => setS(2), 5000), setTimeout(() => setS(3), 12000)]
    return () => t.forEach(clearTimeout)
  }, [])
  const k = Math.min(s, 2)
  return (
    <>
      {s >= 1 && <><div className="flash" /><Burst /></>}
      {s >= 2 && <Particles kind="fall" items={CONFETTI} count={26} />}
      <Particles kind="rise" items={HEARTS} count={14} />
      {s >= 2 && <div className="jumpin"><Nudaeng mood="heart" size="lg" party /></div>}
      <h1 key={k} className="big pop">{[T.yes.a, T.yes.b, T.yes.c][k]}</h1>
      {k === 2 && <svg className="ul" viewBox="0 0 300 20"><path pathLength="1" d="M5 12 C60 2 120 18 180 8 S270 10 295 6" /></svg>}
      {s >= 3 && <Btn className="late" onClick={() => go('letter', 900)}>{T.yes.btn}</Btn>}
    </>
  )
}
/* LETTER */
function Reveal({ children, onShow }) {
  const r = useRef()
  const [on, setOn] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); onShow && onShow(); o.disconnect() } }, { threshold: 0.3 })
    o.observe(r.current)
    return () => o.disconnect()
  }, [])
  return <p ref={r} className={`rv ${on ? 'on' : ''}`}>{children}</p>
}
function Letter({ go }) {
  const [done, setDone] = useState(false)
  const L = T.letter.paras
  return (
    <>
     {LETTER_PHOTOS.map((src, i) => <Photo key={i} src={src} i={i} />)}
    <h1 className="hand head">{T.letter.title}</h1>
      <div className="letter">{L.map((t, i) => <Reveal key={i} onShow={i === L.length - 1 ? () => setDone(true) : undefined}>{t}</Reveal>)}</div>
      {done && <div className="late"><Btn className="beat" onClick={() => go('final', 900)}>{T.letter.btn}</Btn></div>}
    </>
  )
}

/* FINAL confirmation */
function Final({ go, onNo }) {
  const [st, setSt] = useState(0)
  useEffect(() => { const t = setTimeout(() => setSt(1), 2600); return () => clearTimeout(t) }, [])
  if (!st) return <h2 className="fadeio hand big" style={{ animationDuration: '2.6s' }}>{T.final.a}</h2>
  return (
    <div className="card sweet">
      <Proposal steps={T.finalSteps} dodges={FINAL_DODGES} question={T.final.q} onNo={() => onNo(T.end.final, 'final')} onYes={() => go('official', 900)} />
    </div>
  )
}

const Official = () => (
  <>
    {OFFICIAL_FLOWERS.map((src, i) => <Flower key={i} src={src} i={i} />)}
    <Particles kind="fall" items={CONFETTI} count={14} />
    <div className="zo">
      <Nudaeng mood="flowers2" size="lg" party />
      <h1 className="big pop">{T.final.official}</h1>
      <h2 className="hand big late" style={{ animationDelay: '1.6s' }}>{T.final.hi}</h2>
      <div className="stamp">
        <b>{T.final.stamp}</b>
        <span>{T.final.stampDate || new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </div>
  </>
)

const End = ({ msg, back, go }) => (
  <>
    <Nudaeng mood="cry2" level={1} />
    <h2 className="hand big">{msg}</h2>
    <Btn className="late soft" style={{ animationDelay: '2.5s' }} onClick={() => go(back, 900)}>{T.end.back}</Btn>
  </>
)

export default function App() {
  const [scene, setScene] = useState('landing')
  const [out, setOut] = useState(false)
  const [ms, setMs] = useState(550)
  const [dusk, setDusk] = useState(false)
  const [wipe, setWipe] = useState(false)
  const [end, setEnd] = useState({ msg: '', back: 'ask' })

  const go = (s, d = 550) => {
    music.start(); setMs(d); setOut(true)
    if (s === 'yes') { setWipe(true); setTimeout(() => setWipe(false), 2100) }   // petal wipe
    setTimeout(() => {
      window.scrollTo(0, 0)
      if (s === 'letter') setDusk(false)
      setScene(s); setOut(false)
    }, d)
  }
  const onNo = (msg, back) => { setEnd({ msg, back }); go('end', 900) }
 const mood = scene === 'yes' ? 'glow'
  : ['letter', 'final', 'official'].includes(scene) ? 'letter'
  : dusk || scene === 'ask' ? 'dusk' : 'day'
const amb = scene === 'ask' ? ['fire', ['#ffe9a0'], 22] : mood === 'dusk' ? ['fall', PETALS, 18] : ['rise', HEARTS, 10]
  const S = {
    landing: <Landing go={go} />, cards: <Cards go={go} />, game: <Game go={go} setDusk={setDusk} />,
    ask: <Ask go={go} onNo={onNo} />, yes: <Yes go={go} />, letter: <Letter go={go} />,
    final: <Final go={go} onNo={onNo} />, official: <Official />, end: <End {...end} go={go} />,
  }
  return (
    <>
      {['day', 'dusk', 'glow'].map((m) => <div key={m} className={`bg ${m} ${m === mood ? 'on' : ''}`} />)}
      <Particles key={amb[0]} kind={amb[0]} items={amb[1]} count={amb[2]} />
      <Scene key={scene} out={out} ms={ms} className={`${scene === 'letter' ? 'top' : ''} ${scene === 'ask' || scene === 'yes' ? 'slow' : ''}`}>{S[scene]}</Scene>
      {wipe && <div className="wipe">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ top: ((i * 37) % 100) + '%', left: ((i * 53) % 100) + '%', fontSize: 1.5 + (i % 4) * 0.7 + 'rem' }}>🌸</i>)}</div>}
<MusicBtn />
      <MusicBtn />
    </>
  )
}
