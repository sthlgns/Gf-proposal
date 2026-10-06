import { useEffect, useMemo, useRef, useState } from 'react'
import { IMG, T } from './content'
import * as music from './audio'

export const Btn = ({ className = '', ...p }) => <button className={`btn ${className}`} {...p} />

// Nudaeng mascot. mood: smile | one | two | sad | cry. Missing photo → friendly placeholder.
export function Nudaeng({ mood = 'smile', level = 0, size = '', party }) {
  const [bad, setBad] = useState(false)
  const src = IMG[mood] || IMG.smile
  useEffect(() => setBad(false), [src])
  return (
    <div className={`nd ${size} m-${mood} ${party ? 'party' : ''}`} style={{ '--lv': level }}>
      {bad ? <div className="nd-ph">🐶<small>{src}</small></div> : <img src={src} alt="Nudaeng" onError={() => setBad(true)} />}
      <span className="h h1">♥</span><span className="h h2">♥</span>
      {mood === 'cry' && <><span className="tear t1">💧</span><span className="tear t2">💧</span></>}
    </div>
  )
}

// Floating hearts / drifting petals / confetti. Items starting with '#' become colored paper pieces.
export function Particles({ items, count = 12, kind = 'rise' }) {
  const list = useMemo(() => Array.from({ length: count }, (_, i) => ({
    e: items[i % items.length], l: Math.random() * 100, d: Math.random() * 12, s: 0.8 + Math.random() * 1.1, t: 9 + Math.random() * 9,
  })), [])
  return (
    <div className={`particles ${kind}`}>
      {list.map((p, i) => (
        <i key={i} className={p.e[0] === '#' ? 'piece' : ''}
          style={{ '--l': p.l + '%', '--s': p.s, '--d': p.d, '--t': p.t + 's', animationDelay: -p.d + 's', background: p.e[0] === '#' ? p.e : undefined }}>
          {p.e[0] === '#' ? '' : p.e}
        </i>
      ))}
    </div>
  )
}

export function MusicBtn() {
  const [m, setM] = useState(false)
  return <button className="music" aria-label="Toggle music" onClick={() => { music.start(); setM(music.toggle()) }}>{m ? '🔇' : '🎵'}</button>
}

// The proposal. NO dodges (always inside the viewport) `dodges` times, then a press is a real NO.
export function Proposal({ steps, dodges, question, onYes, onNo }) {
  const [n, setN] = useState(0)
  const [pos, setPos] = useState(null)
  const [brk, setBrk] = useState([])
  const [spray, setSpray] = useState(null)
  const ref = useRef(), hd = useRef()
  const s = steps[Math.min(n, steps.length - 1)]

  const dodge = () => {
    const r = ref.current.getBoundingClientRect(), m = 14
    const to = {
      x: m + Math.random() * Math.max(0, innerWidth - r.width - 2 * m),
      y: m + Math.random() * Math.max(0, innerHeight - r.height - 2 * m),
    }
    setBrk((b) => [...b, { id: performance.now(), x: r.left, y: r.top }]) // 💔 floats up
    hd.current.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-7px)' }, { transform: 'translateX(7px)' }, { transform: 'translateX(0)' }], { duration: 280 }) // tiny shake
    if (!pos) {
      setPos({ x: r.left, y: r.top })
      requestAnimationFrame(() => requestAnimationFrame(() => setPos(to)))
    } else setPos(to)
  }
  const pressNo = () => { if (n >= dodges) return onNo(); setN(n + 1); dodge() }
  const yes = (e) => { // YES bursts into hearts where she tapped
    const r = e.currentTarget.getBoundingClientRect()
    setSpray({ x: e.clientX || r.left + r.width / 2, y: e.clientY || r.top + r.height / 2 })
    onYes()
  }

  return (
    <div className="prop" style={{ '--p': Math.max(0.45, 1.3 - n * 0.18) + 's' }}>
      <div className="spot" />
      <div className="hd" ref={hd}>
        <Nudaeng mood={s.mood} level={s.lv} />
        <h1 className="q">{question.split(' ').map((w, i) => <span key={i} className="w" style={{ animationDelay: 1 + i * 0.9 + 's' }}>{w} </span>)}</h1>
        <p className="note-line" key={n}>{s.note}&nbsp;</p>
      </div>
      <div className="pair">
        <button className={`yes ${spray ? 'gone' : ''}`} onClick={yes} style={{ '--s': 1 + n * 0.14 }}>{s.yes}</button>
        <div className="noslot">
          <button ref={ref} className={`no ${pos ? 'fixed' : ''}`} style={pos ? { left: pos.x, top: pos.y } : undefined} onClick={pressNo}>{T.ask.no}</button>
        </div>
      </div>
      {brk.map((b) => <span key={b.id} className="brk" style={{ left: b.x, top: b.y }} onAnimationEnd={() => setBrk((l) => l.filter((z) => z.id !== b.id))}>💔</span>)}
      {spray && Array.from({ length: 14 }, (_, i) => <i key={i} className="sp" style={{ left: spray.x, top: spray.y, '--a': i * 25.7 + 'deg', '--d': 60 + (i % 3) * 30 + 'px' }}>{i % 3 ? '💖' : '🌸'}</i>)}
    </div>
  )
}

// A taped photo. Missing file → small placeholder showing the expected filename.
export function Photo({ src, i }) {
  const [bad, setBad] = useState(false)
  return (
    <figure className={`pic p${i}`} style={{ '--i': i }}>
      {bad ? <div className="pic-ph">📷<small>{src}</small></div> : <img src={src} alt="" onError={() => setBad(true)} />}
    </figure>
  )
}

// Frameless flower PNG. Missing file → a 🌹 so you can still see the layout.
export function Flower({ src, i }) {
  const [bad, setBad] = useState(false)
  return (
    <div className={`flower f${i}`} style={{ '--i': i }}>
      {bad ? <span>🌹</span> : <img src={src} alt="" onError={() => setBad(true)} />}
    </div>
  )
}
// Confetti fired from both bottom corners.
const COL = ['#f8c3cf', '#ffd7bd', '#cde5f4', '#e5daf2', '#fff1c9', '#f6a9bd']
export function Burst() {
  const list = useMemo(() => Array.from({ length: 70 }, (_, i) => {
    const left = i % 2 === 0, a = ((Math.random() * 50 + 20) * Math.PI) / 180, v = 40 + Math.random() * 45
    return { left, c: COL[i % COL.length], dx: (left ? 1 : -1) * Math.cos(a) * v + 'vw', dy: -Math.sin(a) * v * 1.1 + 'vh' }
  }), [])
  return <div className="burst">{list.map((p, i) => <i key={i} style={{ '--dx': p.dx, '--dy': p.dy, background: p.c, [p.left ? 'left' : 'right']: 0 }} />)}</div>
}