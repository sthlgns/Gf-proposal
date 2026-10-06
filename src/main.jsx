import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import * as music from './audio'

// Browsers block autoplay: start the music on the very first tap/click.
addEventListener('click', music.start, { once: true })
addEventListener('touchend', music.start, { once: true })

createRoot(document.getElementById('root')).render(<App />)
