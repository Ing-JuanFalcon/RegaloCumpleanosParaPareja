import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { WelcomeScene } from './scenes/WelcomeScene'
import { MemoryScene } from './scenes/MemoryScene'
export default function App() { const [scene,setScene]=useState(0); return <div className="app-shell"><div className="paper-grain" aria-hidden="true"/><AnimatePresence mode="wait" initial={false}>{scene===0?<WelcomeScene key="welcome" onBegin={()=>setScene(1)}/>:<MemoryScene key="memory"/>}</AnimatePresence></div> }
