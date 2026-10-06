// One audio engine for the whole app, so music never restarts between pages.
import { AUDIO } from './content'

const bg = new Audio(AUDIO.bg)
const pas = new Audio(AUDIO.pasilyo)
const ask = new Audio(AUDIO.ask)
ask.loop = true
ask.volume = 0
bg.loop = pas.loop = true
bg.volume = pas.volume = 0

let ctx, master, synthOn = false, muted = false, started = false, bgTarget = 0.22

const fade = (el, to, ms = 1500) => {
  const from = el.volume, t0 = performance.now()
  const id = setInterval(() => {
    const k = Math.min(1, (performance.now() - t0) / ms)
    el.volume = Math.max(0, Math.min(1, from + (to - from) * k))
    if (k === 1) clearInterval(id)
  }, 50)
}

const setBg = (v, ms = 1500) => {
  bgTarget = v
  if (synthOn) master.gain.setTargetAtTime(muted ? 0 : v * 1.5, ctx.currentTime, ms / 3000)
  else fade(bg, v, ms)
}

// Fallback ambient pad (Cmaj7 · Am7 · Fmaj7 · G) used when /audio/background.mp3 is missing.
function synth() {
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    synthOn = true
    const chords = [[130.8, 329.6, 392, 493.9], [110, 261.6, 329.6, 392], [87.3, 220, 261.6, 329.6], [98, 246.9, 293.7, 392]]
    let i = 0
    const play = () => {
      const t = ctx.currentTime
      chords[i++ % 4].forEach((f) => {
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.type = 'sine'; o.frequency.value = f
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(0.12, t + 1.2)
        g.gain.linearRampToValueAtTime(0, t + 4.4)
        o.connect(g); g.connect(master); o.start(t); o.stop(t + 4.5)
      })
    }
    play(); setInterval(play, 4000)
    setBg(bgTarget, 2500)
  } catch (e) { /* no audio available */ }
}

export function start() {
  if (started) return
  started = true
  bg.play().then(() => fade(bg, bgTarget, 2500)).catch(synth)
}

export function pasilyo() {
  pas.currentTime = 0
// in pasilyo(): add the fade(ask...) call
pas.play().then(() => { setBg(0, 1800); fade(ask, 0, 1800); fade(pas, 0.85, 1800) }).catch(() => {})
}

export function toggle() {
  muted = !muted
bg.muted = pas.muted = ask.muted = muted
  if (synthOn) setBg(bgTarget)
  return muted
}

/// first soundtrack fades out, proposal soundtrack fades in
export function askTrack() {
  setBg(0, 3000)
  ask.play()
    .then(() => fade(ask, 0.22, 3500))
    .catch(() => setBg(0.22, 1500))   // file missing → the first soundtrack comes back
}