// Shared UI primitives
const { useState, useEffect, useRef, useMemo } = React;

// ─── Icons (single-stroke, line) ─────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.6 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round"
  };
  switch (name) {
    case "back": return <svg {...props}><path d="M15 18l-6-6 6-6"/></svg>;
    case "close": return <svg {...props}><path d="M18 6L6 18M6 6l12 12"/></svg>;
    case "chev-r": return <svg {...props}><path d="M9 18l6-6-6-6"/></svg>;
    case "chev-d": return <svg {...props}><path d="M6 9l6 6 6-6"/></svg>;
    case "search": return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case "filter": return <svg {...props}><path d="M3 6h18M6 12h12M10 18h4"/></svg>;
    case "home": return <svg {...props}><path d="M3 11l9-8 9 8"/><path d="M5 9v11h14V9"/></svg>;
    case "compass": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6 6-2z"/></svg>;
    case "card": return <svg {...props}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>;
    case "calendar": return <svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>;
    case "user": return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>;
    case "heart": return <svg {...props}><path d="M12 21s-7-4.5-9-10c-1-3 1-6 4-6 2 0 4 1 5 3 1-2 3-3 5-3 3 0 5 3 4 6-2 5.5-9 10-9 10z"/></svg>;
    case "bell": return <svg {...props}><path d="M6 8a6 6 0 1112 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10 21a2 2 0 004 0"/></svg>;
    case "qr": return <svg {...props}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M21 21v-4M14 18h3M18 14v3"/></svg>;
    case "sun": return <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>;
    case "leaf": return <svg {...props}><path d="M5 21c0-9 6-15 15-15 0 9-6 15-15 15z"/><path d="M5 21l9-9"/></svg>;
    case "shield": return <svg {...props}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/></svg>;
    case "spark": return <svg {...props}><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>;
    case "info": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v5h1"/></svg>;
    case "check": return <svg {...props}><path d="M20 6L9 17l-5-5"/></svg>;
    case "plus": return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "share": return <svg {...props}><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 11l8-4M8 13l8 4"/></svg>;
    case "map": return <svg {...props}><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>;
    case "phone": return <svg {...props}><path d="M5 4h4l2 5-2 1c1 3 3 5 6 6l1-2 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>;
    case "drop": return <svg {...props}><path d="M12 3c-4 5-7 8-7 12a7 7 0 0014 0c0-4-3-7-7-12z"/></svg>;
    case "wind": return <svg {...props}><path d="M3 8h12a3 3 0 100-6M3 16h16a3 3 0 110 6M3 12h10"/></svg>;
    case "moon": return <svg {...props}><path d="M21 12.5A9 9 0 1111.5 3a7 7 0 009.5 9.5z"/></svg>;
    case "settings": return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1A1.7 1.7 0 008.5 19a1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1A1.7 1.7 0 005 8.5a1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1A1.7 1.7 0 0015 5a1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>;
    case "logout": return <svg {...props}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>;
    default: return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
  }
};

// ─── Logo ────────────────────────────────────────────────────────
const KarinthiLogo = ({ size = 24, color = "currentColor" }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color }}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2 L12 22 M2 12 L22 12 M5 5 L19 19 M5 19 L19 5" strokeWidth="0.7" opacity="0.5"/>
      <circle cx="12" cy="12" r="2.5" fill={color}/>
    </svg>
    <span style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: size * 0.85, letterSpacing: "-0.5px" }}>Karinthi</span>
  </span>
);

// ─── Phone status bar ────────────────────────────────────────────
const StatusBar = () => (
  <div className="phone-status">
    <span>9:41</span>
    <div className="status-icons">
      <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><circle cx="2" cy="8" r="1.5"/><circle cx="6" cy="8" r="1.5"/><rect x="9" y="4" width="2" height="4"/><rect x="12" y="1" width="2" height="7"/></svg>
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1"><path d="M1 5a8 8 0 0112 0M3.5 7a4.5 4.5 0 017 0M6 9a1.5 1.5 0 012 0"/></svg>
      <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="0.8"><rect x="0.5" y="0.5" width="18" height="9" rx="2"/><rect x="2" y="2" width="13" height="6" rx="1" fill="currentColor"/><rect x="19" y="3" width="2" height="4" fill="currentColor"/></svg>
    </div>
  </div>
);

// ─── Tab bar ─────────────────────────────────────────────────────
const TabBar = ({ active, onNav }) => {
  const tabs = [
    { id: "home", lbl: "Aujourd'hui", icon: "home" },
    { id: "catalog", lbl: "Catalogue", icon: "compass" },
    { id: "card", lbl: "Carte", icon: "card" },
    { id: "events", lbl: "Officine", icon: "calendar" },
    { id: "profile", lbl: "Profil", icon: "user" }
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <div key={t.id} className={`tab ${active === t.id ? "active" : ""}`} onClick={() => onNav(t.id)}>
          <span className="icon-wrap"><Icon name={t.icon} size={22} strokeWidth={active === t.id ? 2 : 1.5} /></span>
          <span className="lbl">{t.lbl}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Top bar ─────────────────────────────────────────────────────
const TopBar = ({ title, onBack, right }) => (
  <div className="topbar">
    {onBack ? (
      <div className="back" onClick={onBack}><Icon name="back" size={18} /></div>
    ) : <div style={{ width: 40 }} />}
    {title && <span className="title">{title}</span>}
    <div style={{ width: 40, display: "flex", justifyContent: "flex-end" }}>{right}</div>
  </div>
);

// ─── Bottle thumb (placeholder for product) ──────────────────────
const Bottle = ({ brand, accent }) => (
  <div className="product-thumb">
    <div className="bottle" style={accent ? { background: `linear-gradient(180deg, ${accent}33, ${accent}88)`, borderColor: `${accent}55` } : {}}>
      <div className="label-strip">{brand}</div>
    </div>
  </div>
);

// ─── Toast ───────────────────────────────────────────────────────
const Toast = ({ msg, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 1800); return () => clearTimeout(t); }, []);
  return <div className="toast">{msg}</div>;
};

// ─── QR placeholder (renders a deterministic pattern) ───────────
const QRPattern = ({ size = 180 }) => {
  const cells = 21;
  const grid = useMemo(() => {
    const arr = [];
    let seed = 7;
    for (let i = 0; i < cells * cells; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      arr.push((seed / 233280) > 0.5);
    }
    // Force corner finder patterns
    const finder = (cx, cy) => {
      for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
        const inBorder = x === 0 || x === 6 || y === 0 || y === 6;
        const inCenter = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        arr[(cy + y) * cells + (cx + x)] = inBorder || inCenter;
        if (x > 0 && x < 6 && y > 0 && y < 6 && !inCenter) arr[(cy + y) * cells + (cx + x)] = false;
      }
    };
    finder(0, 0); finder(cells - 7, 0); finder(0, cells - 7);
    return arr;
  }, []);
  const c = size / cells;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${cells} ${cells}`} style={{ display: "block" }}>
      {grid.map((on, i) => on ? (
        <rect key={i} x={i % cells} y={Math.floor(i / cells)} width="1" height="1" fill="#125773" />
      ) : null)}
    </svg>
  );
};

Object.assign(window, { Icon, KarinthiLogo, StatusBar, TabBar, TopBar, Bottle, Toast, QRPattern });
