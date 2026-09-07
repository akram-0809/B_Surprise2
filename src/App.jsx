import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check, Gamepad2, Headphones, Heart, Lock, Moon, Music2, PenLine, Play, RotateCcw, Shuffle, Sparkles, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

const CORRECT_PASSCODE = '08092004';
const BIRTH_DATE = '2004-09-08T00:00:00';
const VERSES = [
  ['أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', 'Unquestionably, by the remembrance of Allah hearts are assured.', 'Ar-Ra’d 13:28'],
  ['فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', 'For indeed, with hardship comes ease.', 'Ash-Sharh 94:5'],
  ['وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ', 'And when My servants ask you concerning Me, indeed I am near.', 'Al-Baqarah 2:186'],
  ['وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', 'And whoever relies upon Allah, He is sufficient for them.', 'At-Talaq 65:3'],
];
const NASHEEDS = [
  { title: 'Hasbi Rabbi', artist: 'Sami Yusuf', mood: 'A gentle beginning', url: 'https://www.youtube.com/results?search_query=Sami+Yusuf+Hasbi+Rabbi' },
  { title: 'Rahman Ya Rahman', artist: 'Mesut Kurtis', mood: 'For a peaceful heart', url: 'https://www.youtube.com/results?search_query=Mesut+Kurtis+Rahman+Ya+Rahman' },
  { title: 'The Way of Love', artist: 'Maher Zain', mood: 'Soft light for the evening', url: 'https://www.youtube.com/results?search_query=Maher+Zain+The+Way+of+Love' },
  { title: 'Mawlaya', artist: 'Harris J', mood: 'A little room to breathe', url: 'https://www.youtube.com/results?search_query=Harris+J+Mawlaya' },
];
const DUA_BUBBLES = [
  'May your heart always find its way back to peace.', 'May every quiet dua return to you as beautiful news.',
  'May Allah place barakah in the life you are building.', 'May your smile stay soft, even on the difficult days.',
  'May your rizq be wide, pure, and full of ease.', 'May you always feel held by mercy. Ameen.',
];
const PUZZLE_IMAGE = `${import.meta.env.BASE_URL}puzzle.jpg`;
const MEMORY_SYMBOLS = ['☾', '✦', '♡', '✿'];
const REASONS = [
  ['🌸', 'Your sincere heart', 'Your pure heart and unwavering faith bring light to everyone around you. May Allah protect your soul from every sorrow.'],
  ['✨', 'Your radiant smile', 'The way you smile effortlessly turns hard days into peace. May your 22nd year be full of boundless joy.'],
  ['📚', 'Your dedication to knowledge', 'Your discipline in your studies inspires me constantly. May Allah grant you ease, focus, and distinction.'],
  ['🤲', 'Our shared duas', 'The comfort of knowing you are praying for the future makes every test easier. May He accept every whisper.'],
  ['🌿', 'Your gentle demeanor', 'Your calm presence carries sakinah. May Allah envelop your physical and mental health in His mercy.'],
  ['💼', 'Your drive for halal rizq', 'Every effort towards a stable future is motivated by building a dignified life filled with barakah.'],
  ['💡', 'Your intellect and wisdom', 'I treasure every thoughtful conversation with you. Your perspective sharpens my mind and makes me better.'],
  ['🕊️', 'Your steadfast sabr', 'The patience and grace you embody reflect a noble character. May Allah reward your sabr without measure.'],
  ['🎓', 'Your academic ambitions', 'You carry your dreams with quiet confidence. May Allah make every challenging module clear.'],
  ['💍', 'The dua for our nikkah', 'May Allah unite us in a blessed nikkah without delay, so our halal journey can begin side by side.'],
  ['🌙', 'The calm in your voice', 'Hearing you speak settles whatever storm I am navigating. You are truly my favorite comfort.'],
  ['🗝️', 'Opening the right doors', 'May Allah unlock the opportunities that bring stability, barakah, and ease to your path.'],
  ['🌻', 'Your sincere kindness', 'The care you show to loved ones reflects the true beauty of your soul. May you always be surrounded by love.'],
  ['📖', 'Your moral compass', 'Your grounded values and strong character give me complete peace. May Allah keep you steadfast.'],
  ['🛡️', 'Divine protection', 'May Allah shield your body from illness, your mind from anxiety, and your heart from broken expectations.'],
  ['💫', 'Growing stronger together', 'Your presence makes me strive to be a more grounded, responsible, and grateful man.'],
  ['🤝', 'Harmonious paths', 'May Allah soften every heart, remove every obstacle, and make your family’s blessing smooth and joyful.'],
  ['🌷', 'Your beautiful humility', 'Despite your talents and accomplishments, you walk with such modesty. That is one of your sweetest charms.'],
  ['⏳', 'Every second of waiting', 'Every day spent working towards a blessed future is an investment in a lifetime of companionship.'],
  ['🕯️', 'A beacon of clarity', 'When life gets convoluted, you help me see what truly matters. I thank Allah for placing you in my destiny.'],
  ['🏰', 'Building a halal home', 'May Allah grant us a warm home filled with laughter, Quran recitation, mutual respect, and abundant barakah.'],
  ['🎉', 'Celebrating chapter 22', 'Happy 22nd birthday, my favorite person. May every heartfelt prayer become our reality. Ameen.'],
];

function ReasonsAndDuas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef(null);
  const current = REASONS[currentIndex];
  const move = (direction) => setCurrentIndex((index) => (index + direction + REASONS.length) % REASONS.length);

  useEffect(() => {
    const interval = setInterval(() => move(1), 6500);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (event) => { touchStart.current = event.changedTouches[0].screenX; };
  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].screenX - touchStart.current;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return <section className="reasons-section page-section" id="reasons"><div className="section-kicker"><span>06</span><span>22 reasons & duas</span></div>
    <div className="reasons-heading"><div><span className="eyebrow">A little book of appreciation</span><h2>Twenty-two little<br /><em>ways you are loved.</em></h2></div><div className="bismillah-small" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div></div>
    <div className="reasons-book" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}><span className="book-flourish top-left">❦</span><span className="book-flourish top-right">❦</span><span className="book-flourish bottom-left">❦</span><span className="book-flourish bottom-right">❦</span><div className="reasons-header"><span>22 reasons & duas</span><strong>Reason {currentIndex + 1} of {REASONS.length}</strong></div><AnimatePresence mode="wait"><motion.div className="reason-content" key={currentIndex} initial={{ opacity: 0, rotateY: currentIndex ? -18 : 0 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 18 }} transition={{ duration: .35 }}><div className="reason-icon-large">{current[0]}</div><h3>{current[1]}</h3><p>“{current[2]}”</p></motion.div></AnimatePresence><div className="reason-progress"><span style={{ width: `${((currentIndex + 1) / REASONS.length) * 100}%` }} /></div></div>
    <div className="reasons-controls"><button className="reason-button" onClick={() => move(-1)}>← Previous</button><span>Moves gently on its own · swipe on mobile</span><button className="reason-button" onClick={() => move(1)}>Next reason →</button></div>
  </section>;
}

function PlayAndPray() {
  const [puzzle, setPuzzle] = useState(() => [...Array(9).keys()].sort(() => Math.random() - 0.5));
  const [selectedTile, setSelectedTile] = useState(null);
  const [memory, setMemory] = useState(() => [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS].sort(() => Math.random() - 0.5).map((symbol, index) => ({ id: index, symbol, matched: false })));
  const [flipped, setFlipped] = useState([]);
  const [duaText, setDuaText] = useState('');
  const [duaCards, setDuaCards] = useState([]);

  const swapPuzzle = (slot) => {
    if (selectedTile === null) {
      setSelectedTile(slot);
      return;
    }
    const next = [...puzzle];
    [next[selectedTile], next[slot]] = [next[slot], next[selectedTile]];
    setPuzzle(next);
    setSelectedTile(null);
    if (next.every((tile, index) => tile === index)) confetti({ particleCount: 60, spread: 55, colors: ['#d8ae61', '#dfa4a2', '#becbb9'] });
  };

  const resetMemory = () => {
    setMemory([...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS].sort(() => Math.random() - 0.5).map((symbol, index) => ({ id: index, symbol, matched: false })));
    setFlipped([]);
  };

  const flipMemory = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || memory.find((card) => card.id === id)?.matched) return;
    const nextFlipped = [...flipped, id];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      const cards = nextFlipped.map((cardId) => memory.find((card) => card.id === cardId));
      if (cards[0].symbol === cards[1].symbol) {
        setMemory((current) => current.map((card) => nextFlipped.includes(card.id) ? { ...card, matched: true } : card));
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  const addDua = (event) => {
    event.preventDefault();
    const cleanText = duaText.trim();
    if (!cleanText) return;
    setDuaCards((current) => [{ text: cleanText, id: Date.now() }, ...current].slice(0, 5));
    setDuaText('');
    confetti({ particleCount: 25, spread: 35, origin: { y: 0.7 }, colors: ['#d8ae61', '#dfa4a2'] });
  };

  return <section className="play-section page-section" id="play"><div className="section-kicker"><span>05</span><span>Play & pray</span></div>
    <div className="play-heading"><div><span className="eyebrow">A few gentle games</span><h2>Make a little<br /><em>magic of your own.</em></h2></div><Gamepad2 className="game-icon" size={42} /></div>
    <div className="game-grid">
      <div className="game-panel puzzle-panel"><div className="game-panel-heading"><div><span className="game-label">01 / Assemble</span><h3>Piece by piece</h3></div><button className="tiny-button" onClick={() => { setPuzzle([...Array(9).keys()].sort(() => Math.random() - 0.5)); setSelectedTile(null); }} aria-label="Shuffle puzzle"><Shuffle size={15} /></button></div><p>Put the little picture back together. Tap two tiles to swap them.</p><div className="puzzle-board">{puzzle.map((tile, slot) => <button key={slot} className={`puzzle-tile ${selectedTile === slot ? 'selected' : ''}`} onClick={() => swapPuzzle(slot)} style={{ backgroundImage: `url(${PUZZLE_IMAGE})`, backgroundPosition: `${(tile % 3) * 50}% ${Math.floor(tile / 3) * 50}%` }} aria-label={`Puzzle tile ${slot + 1}`} />)}</div><span className="game-hint"><Sparkles size={13} /> A small patience practice</span></div>
      <div className="game-panel memory-panel"><div className="game-panel-heading"><div><span className="game-label">02 / Remember</span><h3>Find the pair</h3></div><button className="tiny-button" onClick={resetMemory} aria-label="Reset memory game"><RotateCcw size={15} /></button></div><p>Two little symbols belong together. Find all four pairs.</p><div className="memory-board">{memory.map((card) => <button key={card.id} className={`memory-card ${flipped.includes(card.id) || card.matched ? 'flipped' : ''}`} onClick={() => flipMemory(card.id)}><span>{flipped.includes(card.id) || card.matched ? card.symbol : '?'}</span></button>)}</div><span className="game-hint"><Check size={13} /> {memory.filter((card) => card.matched).length / 2} of 4 pairs found</span></div>
    </div>
    <div className="dua-maker"><div className="dua-maker-copy"><span className="game-label">03 / Make a dua</span><h3>Write something<br /><em>you want the sky to know.</em></h3><p>Your words become part of this little wall of light. Keep it heartfelt, keep it yours.</p></div><form className="dua-form" onSubmit={addDua}><label htmlFor="dua-note">Your dua, in your own words</label><textarea id="dua-note" value={duaText} onChange={(event) => setDuaText(event.target.value)} maxLength={150} placeholder="May Allah..." /><div className="dua-form-footer"><span>{duaText.length}/150</span><button className="gold-button" type="submit"><PenLine size={15} /> Place my dua</button></div></form></div>
    {duaCards.length > 0 && <div className="dua-wall">{duaCards.map((card, index) => <motion.div className={`dua-card dua-card-${index % 3}`} key={card.id} initial={{ opacity: 0, y: 25, rotate: index % 2 ? 3 : -3 }} animate={{ opacity: 1, y: 0, rotate: index % 2 ? 3 : -3 }}><Sparkles size={15} /><p>{card.text}</p><small>Ameen · from the heart</small></motion.div>)}</div>}
  </section>;
}

function AmbientSound({ enabled }) {
  const contextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  useEffect(() => {
    if (!enabled) {
      oscillatorsRef.current.forEach(({ oscillator, gain }) => {
        gain.gain.exponentialRampToValueAtTime(0.001, oscillator.context.currentTime + 0.5);
        oscillator.stop(oscillator.context.currentTime + 0.6);
      });
      oscillatorsRef.current = [];
      return undefined;
    }
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return undefined;
      const context = contextRef.current || new AudioContextClass();
      contextRef.current = context;
      oscillatorsRef.current = [174.61, 261.63, 329.63].map((note, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = index === 1 ? 'sine' : 'triangle';
        oscillator.frequency.value = note;
        gain.gain.value = index === 1 ? 0.008 : 0.004;
        oscillator.connect(gain).connect(context.destination);
        oscillator.start();
        return { oscillator, gain };
      });
    } catch { return undefined; }
    return undefined;
  }, [enabled]);
  return null;
}

function StarField() {
  return <div className="star-field" aria-hidden="true">{Array.from({ length: 32 }, (_, index) => <i key={index} style={{ '--x': `${(index * 37) % 100}%`, '--y': `${(index * 61) % 100}%`, '--delay': `${(index % 7) * 0.7}s` }} />)}</div>;
}

function TimeSinceBirth() {
  const [age, setAge] = useState({ years: 21, days: 0, hours: 0 });
  useEffect(() => {
    const update = () => {
      const difference = Date.now() - new Date(BIRTH_DATE).getTime();
      const day = 86400000;
      setAge({ years: Math.floor(difference / (day * 365.25)), days: Math.floor((difference % (day * 365.25)) / day), hours: Math.floor((difference / 3600000) % 24) });
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);
  return <div className="time-chip"><span>{age.years}</span> years <b>•</b> <span>{age.days}</span> days <b>•</b> <span>{age.hours}</span> hours of light</div>;
}

function Gate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    if (code === CORRECT_PASSCODE) {
      confetti({ particleCount: 100, spread: 70, colors: ['#f1c46a', '#f49c9c', '#b8c9b0'] });
      onUnlock();
    } else {
      setError(true); setCode(''); setTimeout(() => setError(false), 700);
    }
  };
  return <motion.div className="gate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StarField /><div className={`gate-card ${error ? 'shake' : ''}`}>
    <div className="seal"><Moon size={20} /></div><span className="eyebrow">A private little universe</span>
    <h1>Bismillah,<br /><em>this one is yours.</em></h1><p>A small birthday letter, wrapped in duas and sent with love.</p>
    <form onSubmit={submit}><label htmlFor="birthday-code">The date that started everything</label><input id="birthday-code" inputMode="numeric" maxLength="8" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} placeholder="DDMMYYYY" autoFocus /><button className="gold-button" type="submit"><Lock size={15} /> Open your birthday</button></form>
    <small>Hint: your date of birth, written as DDMMYYYY</small>
  </div></motion.div>;
}

export default function BirthdayWebsite() {
  const [unlocked, setUnlocked] = useState(false);
  const [sound, setSound] = useState(false);
  const [verseIndex, setVerseIndex] = useState(0);
  const [revealedDuas, setRevealedDuas] = useState([]);
  const [wish, setWish] = useState('Tap a star when one feels like it is meant for you.');
  useEffect(() => {
    if (!unlocked) return undefined;
    const interval = setInterval(() => setVerseIndex((current) => (current + 1) % VERSES.length), 6500);
    return () => clearInterval(interval);
  }, [unlocked]);
  const revealDua = (index) => { if (!revealedDuas.includes(index)) setRevealedDuas((current) => [...current, index]); setWish(DUA_BUBBLES[index]); };
  return <AnimatePresence mode="wait">{!unlocked ? <Gate key="gate" onUnlock={() => setUnlocked(true)} /> : <motion.div key="birthday" className="birthday-app" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <AmbientSound enabled={sound} /><StarField />
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">✦</span> Aeysha <small>/</small> 08.09</a><div className="topbar-actions"><span className="live-dot">A birthday in progress</span><button className="icon-button" onClick={() => setSound((current) => !current)} aria-label={sound ? 'Mute ambience' : 'Play ambience'}>{sound ? <Volume2 size={17} /> : <VolumeX size={17} />}</button></div></header>
    <main id="top">
      <section className="hero-section page-section"><div className="hero-copy"><span className="eyebrow">A soft place made for you</span><h1>Happy birthday,<br /><em>Aeysha Shaikh.</em></h1><p className="hero-lede">Today is a little reminder that the world became gentler the day you arrived in it.</p><div className="hero-actions"><a className="gold-button" href="#nasheed"><Headphones size={16} /> Enter the Nasheed Corner</a><a className="text-link" href="#letter">Scroll slowly <ArrowDown size={15} /></a></div><TimeSinceBirth /></div><div className="moon-portrait" aria-label="A glowing portrait of Aeysha surrounded by stars"><img className="hero-photo" src="/puzzle.jpg" alt="Aeysha wearing a white embroidered scarf" /><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /><div className="hero-note">08<br /><small>SEP</small></div></div><div className="scroll-cue"><span>01 — begin here</span><div /></div></section>
      <section className="marquee" aria-label="Birthday wishes"><div className="marquee-track">{Array.from({ length: 2 }, (_, copy) => <React.Fragment key={copy}><span>May your year be full of ease</span><b>✦</b><span>barakah in every direction</span><b>✦</b><span>and answered duas</span><b>✦</b></React.Fragment>)}</div></section>
      <section className="verse-section page-section" id="verse"><div className="section-kicker"><span>02</span><span>Ayah for this moment</span></div><div className="verse-layout"><div><span className="eyebrow">Let the words arrive</span><h2>Something peaceful<br />to carry with you.</h2><p className="muted">A quiet pause for the days that move too quickly. The ayah changes gently, like a thought returning at the right time.</p></div><div className="verse-card"><AnimatePresence mode="wait"><motion.div key={verseIndex} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}><div className="arabic" dir="rtl">{VERSES[verseIndex][0]}</div><p>“{VERSES[verseIndex][1]}”</p><strong>— {VERSES[verseIndex][2]}</strong></motion.div></AnimatePresence><div className="verse-progress">{VERSES.map((_, index) => <i className={index === verseIndex ? 'active' : ''} key={index} />)}</div></div></div></section>
      <section className="nasheed-section page-section" id="nasheed"><div className="section-kicker light"><span>03</span><span>Nasheed Corner</span></div><div className="nasheed-heading"><div><span className="eyebrow">Press play on a peaceful evening</span><h2>A little soundtrack<br /><em>for your softest self.</em></h2></div><div className="record"><div className="record-hole" /><span>listen<br />gently</span></div></div><div className="nasheed-ticker">{NASHEEDS.map((track, index) => <a className="track-card" href={track.url} target="_blank" rel="noreferrer" key={track.title}><span className="track-number">0{index + 1}</span><span className="play-circle"><Play size={13} fill="currentColor" /></span><span className="track-info"><strong>{track.title}</strong><small>{track.artist} · {track.mood}</small></span><ArrowUpRight className="track-arrow" size={16} /></a>)}</div><p className="nasheed-note"><Music2 size={15} /> Curated for calm. Let one play in the background while you wander through the rest of this little place.</p></section>
      <section className="dua-section page-section" id="duas"><div className="section-kicker"><span>04</span><span>Duas, scattered like stars</span></div><div className="dua-intro"><div><span className="eyebrow">Pick a little light</span><h2>There are wishes<br />everywhere.</h2></div><div className="wish-display"><Sparkles size={17} /><p>{wish}</p></div></div><div className="star-grid">{DUA_BUBBLES.map((dua, index) => <button className={`dua-star ${revealedDuas.includes(index) ? 'revealed' : ''}`} key={dua} onClick={() => revealDua(index)}><span>✦</span><small>{revealedDuas.includes(index) ? dua : `wish ${String(index + 1).padStart(2, '0')}`}</small></button>)}</div></section>
      <PlayAndPray />
      <ReasonsAndDuas />
      <section className="letter-section page-section" id="letter"><div className="letter-paper"><div className="section-kicker"><span>06</span><span>A letter for your next chapter</span></div><h2>Dear Aeysha,</h2><div className="letter-body"><p>May this year feel less like something you have to prove and more like something you are allowed to receive.</p><p>May Allah put a calmness in your chest that no difficult day can take away. May He make your path clear, your friendships sincere, and your dreams bigger than your fear.</p><p>And on the days you forget how special you are, come back here. There will always be a little light waiting for you.</p></div><div className="signature">With endless duas,<br /><em>someone who is grateful for you</em> <Heart size={15} fill="currentColor" /></div></div></section>
      <section className="closing-section page-section"><div className="closing-glow"><Moon size={22} /><span>Alhamdulillah for you</span><h2>May your year be<br /><em>beautifully, quietly blessed.</em></h2><p>Happy birthday, Aeysha. Ameen.</p><a className="text-link light-link" href="#top"><ArrowUpRight size={15} /> Back to the beginning</a></div></section>
    </main><footer><span>Made with duas for Aeysha Shaikh</span><span>08 / 09 / 2004 → forever</span></footer>
  </motion.div>}</AnimatePresence>;
}
