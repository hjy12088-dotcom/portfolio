import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Box, X } from 'lucide-react';
import FallingBlocksBackground from './components/FallingBlocksBackground';

const WORK_ITEMS = [
  { id: 1, title: "Rhino_Rotry Tool", type: "3D MODELING", year: "2025", color: "var(--color-accent-1)", image: "/assets/rotary.png" },
  { id: 2, title: "Character Rendering", type: "RENDERING", year: "2025", color: "var(--color-accent-2)", image: "/assets/character.png" },
  { id: 3, title: "Air Conditioner Design", type: "PRODUCT DESIGN", year: "2025", color: "var(--color-accent-3)", image: "/assets/aircon.png" },
  { id: 4, title: "Rhino_Game Pad", type: "3D MODELING", year: "2025", color: "#000000", image: "/assets/gamepad.png" },
];

function App() {
  // Cursor State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });
  const [hoverState, setHoverState] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lang, setLang] = useState('ko'); // Language state: 'ko' or 'en'

  const TEXT = {
    ko: {
      heroTitle: "안녕하세요.",
      heroDesc: (
        <>
          디자인공학을 전공하며<br />
          구조와 인터랙션의 관계를 탐구하는 홍지연입니다.<br />
          AI를 사고 도구로 활용하여<br />
          안정적인 시스템 안에서 실험적인 디자인을 설계합니다.
        </>
      ),
      ready: "READY?",
      langBtn: "ENG"
    },
    en: {
      heroTitle: "HELLO.",
      heroDesc: (
        <>
          Majoring in Design Engineering,<br />
          I explore the relationship between structure and interaction.<br />
          Using AI as a thinking tool,<br />
          I design experimental works within stable systems.
        </>
      ),
      ready: "GET IN TOUCH",
      langBtn: "KOR"
    }
  };

  const content = TEXT[lang];

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Horizontal Scroll Logic
  const xInput = useTransform(mouseX, [0, window.innerWidth], [0, 1]);
  const slideX = useTransform(xInput, [0, 1], ["5%", "-95%"]); // Slide range adjusted for 4 cards

  return (
    <div style={{ width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* Background Falling Animation */}
      <FallingBlocksBackground />

      {/* Custom Cursor */}
      <motion.div
        className="cursor-dot"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: hoverState ? 3 : 1,
          rotate: hoverState ? 45 : 0
        }}
      />

      {/* HEADER */}
      <header style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        padding: '30px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 100, mixBlendMode: 'difference'
      }}>
        <div onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '-1px' }}>Jieyon Hong Portfolio</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.7 }}>
          MENU
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="section" style={{ height: '100vh', alignItems: 'flex-start' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ marginBottom: '60px' }}
        >
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.85 }}>
            PORTFOLIO
          </h1>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', opacity: 0.8, maxWidth: '600px', fontWeight: 500 }}>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{content.heroTitle}</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, wordBreak: 'keep-all' }}>
            {content.heroDesc}
          </p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '40px', left: '40px' }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </section>

      {/* WORKS GALLERY - MOUSE CONTROLLED */}
      <section style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '0 40px', marginBottom: '40px', opacity: 0.5 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>SELECTED_WORKS [HOVER TO NAVIGATE]</span>
        </div>

        <motion.div style={{ x: slideX, display: 'flex', gap: '60px', paddingLeft: '10vw', width: 'max-content' }}>

          {WORK_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              className="block-panel"
              onClick={() => setSelectedProject(item)}
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
              // Anti-Gravity Lite Interactions
              whileHover={{
                y: -10,
                rotate: 1,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                borderColor: item.color
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                width: '50vw',
                height: '60vh',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box size={32} color={item.color} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', opcode: 0.2, color: 'rgba(255,255,255,0.1)' }}>0{item.id}</span>
              </div>

              {/* Thumbnail Image */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }} />
              </div>

              <div>
                <h3 style={{ fontSize: '3rem', marginBottom: '10px' }}>{item.title}</h3>
                <div style={{ display: 'flex', gap: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: item.color }}>
                  <span>{item.type}</span>
                  <span>— {item.year}</span>
                </div>
              </div>
            </motion.div>
          ))}

        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ height: '50vh', background: '#1F2C3A', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <h2 style={{ fontSize: '4rem', marginBottom: '40px', color: 'var(--color-accent-1)' }}
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
        >
          READY?
        </h2>
        <div style={{ display: 'flex', gap: '40px', fontSize: '1.2rem', fontFamily: 'var(--font-display)', alignItems: 'center' }}>
          <a href="mailto:hoiizyeon@gmail.com" style={{ color: 'white', textDecoration: 'none' }}>MAIL</a>
          <a href="https://www.youtube.com/@hoii_z" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>YOUTUBE</a>
          <button
            onClick={() => setLang(prev => prev === 'ko' ? 'en' : 'ko')}
            style={{
              background: 'white', color: '#1F2C3A', border: 'none',
              padding: '10px 20px', fontFamily: 'var(--font-display)',
              fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            {content.langBtn}
          </button>
        </div>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)',
              zIndex: 200, padding: '40px', overflowY: 'auto'
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              onMouseEnter={() => setHoverState(true)}
              onMouseLeave={() => setHoverState(false)}
              style={{ position: 'fixed', top: '40px', right: '40px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={40} color="black" />
            </button>

            <div style={{ maxWidth: '800px', margin: '60px auto', paddingBottom: '100px' }}>
              <span style={{ color: selectedProject.color, fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>PROJECT 0{selectedProject.id}</span>
              <h2 style={{ fontSize: '4rem', marginBottom: '40px', lineHeight: 0.9, textTransform: 'uppercase', color: 'black' }}>{selectedProject.title}</h2>

              <div className="block-panel" style={{ padding: '40px', background: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                  <div>
                    <h4 style={{ marginBottom: '10px', opacity: 0.6, fontSize: '0.9rem' }}>YEAR</h4>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedProject.year}</p>
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '10px', opacity: 0.6, fontSize: '0.9rem' }}>TYPE</h4>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedProject.type}</p>
                  </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <h4 style={{ marginBottom: '10px', opacity: 0.6 }}>DESCRIPTION</h4>
                  <p style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
                    This is a placeholder description for <b>{selectedProject.title}</b>.
                    <br /><br />
                    Here you can add specific details about the project, the process, the tools used (Rhino, Rendering, etc.), and the outcome.
                  </p>
                </div>

                <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '2px solid black' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', opacity: 0.5 }}>IMAGE GALLERY</p>
                  <div style={{ width: '100%', minHeight: '400px', background: '#f9f9f9', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
