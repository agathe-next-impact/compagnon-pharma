// All screens for the prototype
const { useState: uS, useEffect: uE, useMemo: uM } = React;

// ───── 1. Splash / Intro ─────────────────────────────────────
const ScreenIntro = ({ go, step = 0, setStep }) => {
  const slides = [
    {
      badge: "Karinthi · Compagnon",
      title: <>Votre rituel beauté,<br/><em>accompagné par votre pharmacie.</em></>,
      desc: "Conseils personnalisés, routine adaptée et expertise pharmacien — au creux de votre main.",
      glyph: "K"
    },
    {
      badge: "Confidentialité d'abord",
      title: <>Vos données <em>sensibles</em> restent sur votre téléphone.</>,
      desc: "Selfies, allergies, cycle, grossesse : stockage local chiffré, jamais envoyé à un serveur.",
      glyph: "✦"
    },
    {
      badge: "Local, comme vous",
      title: <>Pharmacie Karinthi.<br/><em>Votre officine, votre conseil.</em></>,
      desc: "Une équipe que vous connaissez, des produits que vous trouverez en rayon, des invitations aux rendez-vous.",
      glyph: "✿"
    }
  ];
  const cur = slides[step];
  const isLast = step === slides.length - 1;
  return (
    <>
      <div className="topbar">
        <div style={{ width: 40 }} />
        <KarinthiLogo size={20} />
        <div className="back" style={{ cursor: "pointer", fontSize: 12, padding: "0 14px", width: "auto" }} onClick={() => go("signup")}>Passer</div>
      </div>
      <div className="intro-stage fade-in" key={step}>
        <div className="intro-art">
          <div className="badge">{cur.badge}</div>
          <div className="glyph">{cur.glyph}</div>
          <div className="deco-line" />
          <div className="stamp">
            <span>EST. 2026</span>
            <div className="seal">K</div>
            <span>Paris XI<sup>e</sup></span>
          </div>
        </div>
        <div className="intro-copy">
          <h1 className="h-display">{cur.title}</h1>
          <p>{cur.desc}</p>
          <div className="intro-dots">
            {slides.map((_, i) => <span key={i} className={`intro-dot ${i === step ? "active" : ""}`} />)}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-primary btn-block" onClick={() => isLast ? go("signup") : setStep(step + 1)}>
              {isLast ? "Créer mon compte" : "Continuer"}
            </button>
          </div>
          {isLast && (
            <button className="btn btn-link" style={{ marginTop: 14, width: "100%" }} onClick={() => go("signin")}>J'ai déjà un compte</button>
          )}
        </div>
      </div>
    </>
  );
};

// ───── 2. Sign-up & magic link ───────────────────────────────
const ScreenSignup = ({ go }) => {
  const [email, setEmail] = uS("");
  const [first, setFirst] = uS("");
  const [postal, setPostal] = uS("");
  const [agree, setAgree] = uS(false);
  const ok = email.includes("@") && first.length > 1 && postal.length === 5 && agree;
  return (
    <>
      <TopBar title="Inscription" onBack={() => go("intro")} />
      <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
        <div style={{ padding: "8px var(--pad) 24px" }}>
          <h1 className="h-display" style={{ fontSize: 30, marginBottom: 6 }}>Bienvenue.</h1>
          <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 0 }}>Quelques informations essentielles pour préparer votre carte de membre.</p>
          <div style={{ height: 22 }} />
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.fr" />
          </div>
          <div className="field">
            <label>Prénom</label>
            <input value={first} onChange={e => setFirst(e.target.value)} placeholder="Camille" />
          </div>
          <div className="field">
            <label>Code postal</label>
            <input value={postal} onChange={e => setPostal(e.target.value.replace(/\D/g,"").slice(0,5))} placeholder="75011" />
          </div>
          <div className="callout" style={{ marginTop: 8, alignItems: "center" }} onClick={() => setAgree(!agree)}>
            <div className="ic" style={{ background: agree ? "var(--ink)" : "var(--paper)", color: agree ? "var(--paper)" : "var(--ink)", borderColor: agree ? "var(--ink)" : "var(--line)" }}>
              {agree && <Icon name="check" size={16} />}
            </div>
            <div>
              <div className="title">J'accepte les CGU et la politique de confidentialité</div>
              <div className="body">Données sensibles (allergies, cycle) stockées localement, jamais sur serveur.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-cta">
        <button className="btn btn-primary btn-block" disabled={!ok} style={{ opacity: ok ? 1 : 0.4 }} onClick={() => go("magic", { email, first, postal })}>
          Recevoir mon lien magique
        </button>
      </div>
    </>
  );
};

const ScreenMagic = ({ go, ctx }) => (
  <>
    <TopBar title="Vérification" onBack={() => go("signup")} />
    <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
      <div className="magic-page">
        <div className="magic-art">
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <div style={{ width: 120, height: 90, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "#fff", border: "1.5px solid var(--primary)", borderRadius: 6, transform: "rotate(-3deg)" }} />
              <div style={{ position: "absolute", inset: 0, background: "var(--surface-container)", border: "1.5px solid var(--primary)", borderRadius: 6 }}>
                <svg viewBox="0 0 120 90" width="100%" height="100%" preserveAspectRatio="none"><path d="M2 4 L60 50 L118 4" stroke="#125773" fill="none" strokeWidth="1.5"/></svg>
              </div>
              <div style={{ position: "absolute", top: -12, right: -10, width: 32, height: 32, borderRadius: 999, background: "var(--secondary)", color: "var(--on-secondary)", display: "grid", placeItems: "center", fontSize: 16 }}>K</div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 14, left: 14, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>Lien envoyé · expire dans 15 min</div>
        </div>
        <h2 className="h-section" style={{ fontSize: 24, marginBottom: 8 }}>Consultez votre boîte mail.</h2>
        <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 0, marginBottom: 22 }}>
          Nous avons envoyé un lien à <strong style={{ color: "var(--ink)" }}>{ctx?.email || "vous@exemple.fr"}</strong>. Cliquez dessus pour valider votre identité.
        </p>
        <button className="btn btn-primary btn-block" onClick={() => go("diagPrompt", ctx)}>Simuler le clic sur le lien</button>
        <button className="btn btn-link" style={{ marginTop: 18, alignSelf: "center" }}>Renvoyer le lien</button>
      </div>
    </div>
  </>
);

const ScreenDiagPrompt = ({ go, ctx }) => (
  <>
    <TopBar onBack={() => go("magic", ctx)} />
    <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
      <div style={{ padding: "0 var(--pad) 24px" }}>
        <div className="intro-art" style={{ height: 240, marginBottom: 22 }}>
          <div className="badge">Étape suivante</div>
          <div className="glyph">⌘</div>
          <div className="deco-line" />
          <div className="stamp"><span>3 modules · 4 min</span><div className="seal">⌘</div><span>Personnalisé</span></div>
        </div>
        <h1 className="h-display" style={{ fontSize: 32, marginBottom: 10 }}>
          {ctx?.first ? `Bonjour, ${ctx.first}.` : "Bonjour."} <em>Faisons connaissance.</em>
        </h1>
        <p className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>
          Le diagnostic beauté nous permet de vous proposer une routine cohérente avec votre peau et vos préférences. 5 questions, environ 90 secondes.
        </p>
        <div className="card" style={{ marginTop: 22 }}>
          <div className="label">3 modules indépendants</div>
          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            {[
              { n: "01", t: "Diagnostic peau", d: "Type, préoccupations, exposition" },
              { n: "02", t: "Diagnostic cheveux", d: "Optionnel · 60 secondes" },
              { n: "03", t: "Bien-être & moments de vie", d: "Optionnel · 75 secondes" }
            ].map(m => (
              <div key={m.n} style={{ display: "grid", gridTemplateColumns: "32px 1fr auto", alignItems: "center", gap: 12 }}>
                <div style={{ fontFamily: "Roboto", fontWeight: 700, color: "var(--primary)" }}>{m.n}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{m.t}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{m.d}</div>
                </div>
                <Icon name="chev-r" size={16} color="var(--muted)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="bottom-cta" style={{ flexDirection: "column" }}>
      <button className="btn btn-primary btn-block" onClick={() => go("diag", { ...ctx, q: 0 })}>Commencer le diagnostic peau</button>
      <button className="btn btn-link" style={{ marginTop: 12 }} onClick={() => go("home", ctx)}>Passer pour l'instant</button>
    </div>
  </>
);

// ───── 3. Diagnostic ─────────────────────────────────────────
const ScreenDiagnostic = ({ go, ctx, setCtx }) => {
  const [q, setQ] = uS(ctx?.q || 0);
  const [answers, setAnswers] = uS(ctx?.answers || {});

  const questions = [
    {
      key: "skin",
      title: "Comment décririez-vous votre peau au réveil ?",
      desc: "Module 01 · Diagnostic peau",
      type: "single",
      options: window.PHARMA_DATA.SKIN_TYPES
    },
    {
      key: "concerns",
      title: "Quelles sont vos préoccupations principales ?",
      desc: "3 maximum",
      type: "multi",
      max: 3,
      options: window.PHARMA_DATA.CONCERNS.map(c => ({ id: c, name: c }))
    },
    {
      key: "sun",
      title: "Votre exposition solaire moyenne ?",
      desc: "Cela influence la photoprotection recommandée",
      type: "single",
      options: window.PHARMA_DATA.SUN_OPTS
    },
    {
      key: "habit",
      title: "Avez-vous une routine actuellement ?",
      desc: "Aucun jugement — pour adapter le rythme",
      type: "single",
      options: window.PHARMA_DATA.ROUTINE_HABIT
    }
  ];

  const cur = questions[q];
  const ans = answers[cur.key];
  const canNext = cur.type === "single" ? !!ans : (Array.isArray(ans) && ans.length > 0);

  const setAns = (val) => {
    if (cur.type === "single") {
      setAnswers({ ...answers, [cur.key]: val });
    } else {
      const list = Array.isArray(ans) ? [...ans] : [];
      const idx = list.indexOf(val);
      if (idx >= 0) list.splice(idx, 1);
      else if (!cur.max || list.length < cur.max) list.push(val);
      setAnswers({ ...answers, [cur.key]: list });
    }
  };

  const next = () => {
    if (q < questions.length - 1) setQ(q + 1);
    else { setCtx({ ...ctx, answers }); go("synth", { ...ctx, answers }); }
  };
  const prev = () => { if (q > 0) setQ(q - 1); else go("diagPrompt", ctx); };

  return (
    <>
      <TopBar title={`${q + 1} / ${questions.length}`} onBack={prev} />
      <div style={{ padding: "0 var(--pad)" }}>
        <div className="progress"><span style={{ width: `${((q + 1) / questions.length) * 100}%` }} /></div>
      </div>
      <div className="phone-scroll" style={{ position: "static", flex: 1 }} key={q}>
        <div className="fade-in" style={{ padding: "20px var(--pad) 24px" }}>
          <div className="label" style={{ marginBottom: 10 }}>{cur.desc}</div>
          <h2 className="h-section" style={{ fontSize: 24, marginBottom: 22, lineHeight: 1.15 }}>{cur.title}</h2>
          {cur.type === "single" && (
            <div style={{ display: "grid", gap: 10 }}>
              {cur.options.map(o => (
                <div key={o.id} className={`choice ${ans === o.id ? "selected" : ""}`} onClick={() => setAns(o.id)}>
                  {o.swatch && <div className="swatch" style={{ background: o.swatch }} />}
                  <div style={{ flex: 1 }}>
                    <div className="name">{o.name}</div>
                    {o.desc && <div className="desc">{o.desc}</div>}
                  </div>
                  {ans === o.id && <Icon name="check" size={18} />}
                </div>
              ))}
            </div>
          )}
          {cur.type === "multi" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cur.options.map(o => {
                const sel = (Array.isArray(ans) ? ans : []).includes(o.id);
                return (
                  <span key={o.id} className={`tag ${sel ? "selected" : ""}`} onClick={() => setAns(o.id)}>
                    {sel && <Icon name="check" size={12} />}
                    {o.name}
                  </span>
                );
              })}
              <div style={{ width: "100%", marginTop: 8, fontSize: 12, color: "var(--muted)" }}>
                {(Array.isArray(ans) ? ans.length : 0)} / {cur.max} sélectionné(s)
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bottom-cta">
        <button className="btn btn-primary btn-block" disabled={!canNext} style={{ opacity: canNext ? 1 : 0.4 }} onClick={next}>
          {q === questions.length - 1 ? "Voir ma synthèse" : "Continuer"}
        </button>
      </div>
    </>
  );
};

// ───── 4. Synthèse diagnostic + routine ──────────────────────
const ScreenSynthesis = ({ go, ctx, profile }) => {
  const skin = window.PHARMA_DATA.SKIN_TYPES.find(s => s.id === (profile?.skinType || "mixte"));
  const products = window.PHARMA_DATA.PRODUCTS.slice(0, 5);
  return (
    <>
      <TopBar title="Votre synthèse" right={<div onClick={() => go("home", ctx)} style={{ fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>Terminer</div>} />
      <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
        <div style={{ padding: "12px var(--pad) 32px" }}>
          <div className="label">Profil identifié</div>
          <h1 className="h-display" style={{ fontSize: 34, margin: "8px 0 14px" }}>
            Peau <em>{skin?.name?.toLowerCase() || "mixte"}</em>,<br/>légèrement déshydratée.
          </h1>
          <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, marginBottom: 22 }}>
            Votre barrière cutanée demande de la douceur. Les bons gestes : nettoyer sans détergent, hydrater couche par couche, protéger.
          </p>
          <div className="card" style={{ marginBottom: 18 }}>
            <div className="label" style={{ marginBottom: 10 }}>Indicateurs clés</div>
            <div className="synth-bars">
              {[
                { name: "Hydratation", v: 0.42 },
                { name: "Sébum", v: 0.55 },
                { name: "Sensibilité", v: 0.62 },
                { name: "Éclat", v: 0.48 }
              ].map(b => (
                <div key={b.name} className="bar">
                  <span className="name">{b.name}</span>
                  <div className="track"><span className="fill" style={{ width: `${b.v * 100}%` }} /></div>
                  <span className="val">{Math.round(b.v * 100)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pharmacist" style={{ marginBottom: 24 }}>
            <div className="avatar">L</div>
            <div style={{ flex: 1 }}>
              <div className="who">Conseil de Léa, pharmacienne</div>
              <div className="msg">"Visez d'abord la régularité — 3 produits bien choisis valent mieux qu'une routine de 8 étapes."</div>
            </div>
          </div>

          <div className="section-head" style={{ padding: 0, marginBottom: 12 }}>
            <h3 className="h-section" style={{ fontSize: 20 }}>Votre routine recommandée</h3>
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 0, marginBottom: 14 }}>5 produits du catalogue Karinthi, accessibles immédiatement.</p>
          <div style={{ display: "grid", gap: 10 }}>
            {products.map((p, i) => (
              <div key={p.id} className="card-flat" style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => go("product", { ...ctx, productId: p.id })}>
                <div style={{ width: 60, height: 60, borderRadius: 10, background: "var(--primary-container)", display: "grid", placeItems: "center", fontFamily: "Roboto", fontWeight: 700, color: "var(--primary)", fontSize: 18 }}>{i + 1}</div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>{p.brand}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2, lineHeight: 1.25 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{p.size} · {p.price} €</div>
                </div>
                <Icon name="chev-r" size={16} color="var(--muted)" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-cta" style={{ flexDirection: "column" }}>
        <button className="btn btn-primary btn-block" onClick={() => go("home", ctx)}>Voir mon espace</button>
        <button className="btn btn-link" style={{ marginTop: 10 }} onClick={() => go("routine", ctx)}>Voir la routine détaillée</button>
      </div>
    </>
  );
};

// ───── 5. Home ───────────────────────────────────────────────
const ScreenHome = ({ go, profile, ctx, nav }) => {
  const skin = window.PHARMA_DATA.SKIN_TYPES.find(s => s.id === (profile?.skinType || "mixte"));
  const isPregnant = profile?.lifeMoment === "grossesse";
  const tier = profile?.memberTier || "Privilège";
  const recos = window.PHARMA_DATA.PRODUCTS.slice(0, 6);
  const newToYou = window.PHARMA_DATA.PRODUCTS.slice(4, 9);

  return (
    <>
      <div className="topbar" style={{ paddingTop: 4 }}>
        <KarinthiLogo size={20} />
        <div style={{ display: "flex", gap: 6 }}>
          <div className="back" onClick={() => go("notifications", ctx)}><Icon name="bell" size={18} /></div>
          <div className="back" onClick={() => nav("card")}><Icon name="qr" size={18} /></div>
        </div>
      </div>
      <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
        <div className="home-hero">
          <div className="label">Mardi 12 mai</div>
          <div className="greeting">Bonjour <em>{ctx?.first || "Camille"}.</em></div>
          <div className="sub">Voici ce que j'ai pensé pour vous aujourd'hui.</div>
        </div>

        <div className="context-bar">
          <div className="context-chip"><span className="dot" /> 21 °C · UV modéré</div>
          <div className="context-chip"><Icon name="leaf" size={14} color="var(--sage)"/> Pollens graminées élevés</div>
          <div className="context-chip"><Icon name="drop" size={14} color="var(--primary)"/> Hum. 58 %</div>
        </div>

        {isPregnant && (
          <div style={{ padding: "0 var(--pad)" }}>
            <div className="callout" style={{ background: "rgba(184,89,58,0.06)", borderColor: "rgba(184,89,58,0.2)" }}>
              <div className="ic" style={{ background: "var(--paper)" }}><Icon name="info" size={16} color="var(--warn)" /></div>
              <div>
                <div className="title" style={{ color: "var(--warn)" }}>Période grossesse détectée</div>
                <div className="body">Le rétinol, salicylates {">"}2 % et certaines huiles essentielles sont automatiquement masqués.</div>
              </div>
            </div>
          </div>
        )}

        <div className="section-head"><h3 className="h-section">Pour vous aujourd'hui</h3><span className="more">Tout voir</span></div>
        <div className="product-rail">
          {recos.slice(0, 4).map(p => (
            <div key={p.id} className="product-card" onClick={() => go("product", { ...ctx, productId: p.id })}>
              <Bottle brand={p.brand} accent={p.id === "p1" ? "#556B47" : p.id === "p2" ? "#DFA897" : p.id === "p4" ? "#125773" : "#3F5033"} />
              <div className="brand">{p.brand}</div>
              <div className="pname">{p.name}</div>
              <div className="meta-row">
                <span className="price">{p.price} €</span>
                <span className="muted">{p.size}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "16px var(--pad) 0" }}>
          <div className="pharmacist">
            <div className="avatar">L</div>
            <div style={{ flex: 1 }}>
              <div className="who">Léa, votre pharmacienne</div>
              <div className="msg">"Avec les pollens élevés, pensez au sérum apaisant — j'en ai mis de côté."</div>
            </div>
            <Icon name="chev-r" size={18} color="rgba(251,248,242,0.6)" />
          </div>
        </div>

        <div className="section-head"><h3 className="h-section">Votre routine</h3><span className="more" onClick={() => go("routine", ctx)}>Détails</span></div>
        <div style={{ padding: "0 var(--pad)" }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span className="label">Matin · 3 étapes</span>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>~ 4 min</span>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {window.PHARMA_DATA.ROUTINE_STEPS.filter(s => s.phase === "Matin").map(s => (
                <div key={s.num} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 10, alignItems: "center" }}>
                  <div style={{ fontFamily: "Roboto", fontWeight: 700, color: "var(--primary)" }}>0{s.num}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{window.PHARMA_DATA.PRODUCTS.find(p => p.id === s.productId)?.name}</div>
                  </div>
                  <Icon name="check" size={16} color="var(--sage)" />
                </div>
              ))}
            </div>
            <div className="divider" />
            <button className="btn btn-ghost btn-sm" style={{ width: "100%" }} onClick={() => go("routine", ctx)}>Voir matin & soir</button>
          </div>
        </div>

        <div className="section-head"><h3 className="h-section">Votre cagnotte</h3></div>
        <div style={{ padding: "0 var(--pad)" }}>
          <div className="card" style={{ background: "linear-gradient(135deg, var(--green-100), var(--teal-100))", display: "grid", gridTemplateColumns: "1fr auto", gap: 14 }}>
            <div>
              <div className="label">Solde</div>
              <div style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: 36, letterSpacing: 0, margin: "4px 0", color: "var(--primary)" }}>14,80 €</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Statut <strong style={{ color: "var(--ink)" }}>{tier}</strong> · 226 € sur 12 mois</div>
            </div>
            <div className="tier-line" style={{ background: "transparent", border: "none", padding: 0 }}>
              <div className="seal">{tier[0]}</div>
            </div>
          </div>
        </div>

        <div className="section-head"><h3 className="h-section">À découvrir</h3><span className="more">Plus</span></div>
        <div className="product-rail" style={{ paddingBottom: 24 }}>
          {newToYou.map(p => (
            <div key={p.id} className="product-card" onClick={() => go("product", { ...ctx, productId: p.id })}>
              <Bottle brand={p.brand} accent={"#DFA897"} />
              <div className="brand">{p.brand}</div>
              <div className="pname">{p.name}</div>
              <div className="meta-row"><span className="price">{p.price} €</span></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ───── 6. Catalogue ──────────────────────────────────────────
const ScreenCatalog = ({ go, ctx, profile }) => {
  const [cat, setCat] = uS("Tous");
  const [q, setQ] = uS("");
  const products = window.PHARMA_DATA.PRODUCTS.filter(p => (cat === "Tous" || p.category === cat) && (q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <div className="topbar"><span style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: 22, color: "var(--on-surface)" }}>Catalogue</span><div className="back"><Icon name="filter" size={18} /></div></div>
      <div style={{ padding: "0 var(--pad)" }}>
        <div className="searchbar">
          <Icon name="search" size={18} color="var(--muted)" />
          <input placeholder="Rechercher un produit, une marque…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>
      <div className="cat-rail">
        {window.PHARMA_DATA.CATEGORIES.map(c => (
          <span key={c} className={`cat-chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</span>
        ))}
      </div>
      <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
        <div style={{ padding: "10px var(--pad) 4px", fontSize: 12, color: "var(--muted)" }}>
          {products.length} produits · classement par pertinence pour <strong style={{ color: "var(--ink)" }}>peau {(window.PHARMA_DATA.SKIN_TYPES.find(s => s.id === (profile?.skinType || "mixte"))?.name || "Mixte").toLowerCase()}</strong>
        </div>
        <div className="catalog-grid">
          {products.map(p => (
            <div key={p.id} className="product-card" onClick={() => go("product", { ...ctx, productId: p.id })}>
              <Bottle brand={p.brand} accent={p.category === "Visage" ? "#556B47" : p.category === "Corps" ? "#DFA897" : p.category === "Cheveux" ? "#125773" : "#3F5033"} />
              <div className="brand">{p.brand}</div>
              <div className="pname">{p.name}</div>
              <div className="meta-row">
                <span className="price">{p.price} €</span>
                {!p.stock && <span style={{ fontSize: 10, color: "var(--warn)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Rupture</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ───── 7. Product detail with INCI ───────────────────────────
const ScreenProduct = ({ go, ctx, profile, toast }) => {
  const id = ctx?.productId || "p1";
  const p = window.PHARMA_DATA.PRODUCTS.find(x => x.id === id) || window.PHARMA_DATA.PRODUCTS[0];
  const [tab, setTab] = uS("desc");
  const reserve = () => toast("Réservé · à retirer en officine");
  return (
    <>
      <TopBar onBack={() => go(ctx?.from || "catalog", ctx)} right={<div className="back" style={{ width: 36, height: 36 }}><Icon name="heart" size={16} /></div>} />
      <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
        <div style={{ padding: "0 var(--pad) 8px" }}>
          <div className="product-thumb" style={{ height: 280, marginBottom: 16, borderRadius: 24 }}>
            <div className="bottle" style={{ width: "50%", height: "82%", background: "linear-gradient(180deg, rgba(201,163,154,0.20), rgba(201,163,154,0.55))", borderColor: "rgba(201,163,154,0.4)" }}>
              <div className="label-strip">{p.brand}</div>
            </div>
          </div>
          <div className="brand" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>{p.brand}</div>
          <h1 className="h-display" style={{ fontSize: 26, lineHeight: 1.1, marginBottom: 6 }}>{p.name}</h1>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "Roboto", fontWeight: 700, fontSize: 22, letterSpacing: 0, color: "var(--primary)" }}>{p.price} €</span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>· {p.size}</span>
            {p.stock && <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--sage)", letterSpacing: "0.1em", textTransform: "uppercase" }}>● en stock officine</span>}
          </div>

          {profile?.lifeMoment === "grossesse" && p.inci?.some(i => i.name === "Salicylic Acid") && (
            <div className="callout" style={{ marginBottom: 16, background: "rgba(184,89,58,0.06)", borderColor: "rgba(184,89,58,0.2)" }}>
              <div className="ic"><Icon name="info" size={16} color="var(--warn)" /></div>
              <div>
                <div className="title" style={{ color: "var(--warn)" }}>Déconseillé pendant la grossesse</div>
                <div className="body">Contient de l'acide salicylique. Demandez conseil à votre pharmacien.</div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 6, padding: 4, background: "var(--paper-2)", borderRadius: 12, marginBottom: 16, border: "1px solid var(--line-2)" }}>
            {[["desc","Description"],["inci","INCI"],["use","Conseil"]].map(([k,l]) => (
              <button key={k} onClick={() => setTab(k)} style={{ flex: 1, padding: "10px", border: 0, borderRadius: 9, background: tab === k ? "var(--paper)" : "transparent", color: tab === k ? "var(--ink)" : "var(--muted)", fontWeight: tab === k ? 600 : 500, fontSize: 13, cursor: "pointer" }}>{l}</button>
            ))}
          </div>

          {tab === "desc" && (
            <div className="fade-in">
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", marginTop: 0 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                {(p.tags || []).map(t => <span key={t} className="tag" style={{ padding: "6px 10px", fontSize: 11, letterSpacing: "0.06em" }}>{t}</span>)}
              </div>
            </div>
          )}
          {tab === "inci" && (
            <div className="fade-in">
              <div className="label" style={{ marginBottom: 8 }}>{(p.inci || []).length} ingrédients · sources CosIng</div>
              {(p.inci || []).map(i => (
                <div key={i.name} className="ing-row">
                  <div className="ic">{i.name[0]}</div>
                  <div>
                    <div className="ing-name">{i.name}</div>
                    <div className="ing-fn">{i.fn}</div>
                  </div>
                  {i.flag === "good" && <span className="badge good">Recommandé</span>}
                  {i.flag === "warn" && <span className="badge warn">Vigilance</span>}
                </div>
              ))}
            </div>
          )}
          {tab === "use" && (
            <div className="fade-in">
              <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55 }}>Appliquer matin et/ou soir sur peau propre. Massage du centre vers l'extérieur, 30 secondes. Éviter le contour des yeux.</p>
              <div className="pharmacist" style={{ marginTop: 14 }}>
                <div className="avatar">L</div>
                <div style={{ flex: 1 }}>
                  <div className="who">Note de Léa</div>
                  <div className="msg" style={{ fontSize: 14 }}>"À combiner avec une protection SPF en journée. Texture qui plaît aux peaux mixtes."</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bottom-cta">
        <button className="btn btn-ghost" style={{ flex: 1 }}>Liste d'envies</button>
        <button className="btn btn-primary" style={{ flex: 1.4 }} onClick={reserve}>Réserver en officine</button>
      </div>
    </>
  );
};

// ───── 8. Routine détaillée ─────────────────────────────────
const ScreenRoutine = ({ go, ctx }) => {
  const [phase, setPhase] = uS("Matin");
  const steps = window.PHARMA_DATA.ROUTINE_STEPS.filter(s => s.phase === phase);
  return (
    <>
      <TopBar title="Routine personnalisée" onBack={() => go("home", ctx)} right={<Icon name="share" size={18} color="var(--ink-2)" />} />
      <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
        <div style={{ padding: "0 var(--pad) 24px" }}>
          <div className="label">Adaptée à votre profil</div>
          <h1 className="h-display" style={{ fontSize: 30, marginTop: 6 }}>Rituel <em>peau mixte</em>,<br/>5 gestes essentiels.</h1>
          <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 8 }}>Construite avec votre pharmacienne. Modifiable à tout moment.</p>

          <div style={{ display: "flex", gap: 6, padding: 4, background: "var(--paper-2)", borderRadius: 12, marginTop: 22, marginBottom: 16, border: "1px solid var(--line-2)" }}>
            {["Matin", "Soir"].map(ph => (
              <button key={ph} onClick={() => setPhase(ph)} style={{ flex: 1, padding: "12px", border: 0, borderRadius: 9, background: phase === ph ? "var(--ink)" : "transparent", color: phase === ph ? "var(--paper)" : "var(--muted)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                {ph === "Matin" ? <Icon name="sun" size={14} /> : <Icon name="moon" size={14} />} <span style={{ marginLeft: 6 }}>{ph}</span>
              </button>
            ))}
          </div>

          <div className="card">
            {steps.map(s => {
              const p = window.PHARMA_DATA.PRODUCTS.find(x => x.id === s.productId);
              return (
                <div key={s.num} className="routine-step">
                  <div className="num">{s.num}</div>
                  <div>
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                    {p && (
                      <div className="product-pill" onClick={() => go("product", { ...ctx, productId: p.id, from: "routine" })} style={{ cursor: "pointer" }}>
                        <div className="pill-thumb" />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.brand} · {p.price} €</div>
                        </div>
                        <Icon name="chev-r" size={14} color="var(--muted)" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="callout" style={{ marginTop: 16 }}>
            <div className="ic"><Icon name="info" size={16} /></div>
            <div>
              <div className="title">Tip de la semaine</div>
              <div className="body">La niacinamide se combine très bien avec votre crème barrière — pour les rougeurs liées aux pollens.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ───── 9. Member card ────────────────────────────────────────
const ScreenCard = ({ go, ctx, profile }) => {
  const tier = profile?.memberTier || "Privilège";
  return (
    <>
      <div className="topbar"><span style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: 22, color: "var(--on-surface)" }}>Carte</span><div className="back" onClick={() => go("settings", ctx)}><Icon name="settings" size={18} /></div></div>
      <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
        <div className="member-card">
          <div className="row">
            <div>
              <div className="who">Membre Karinthi</div>
              <div className="name">{ctx?.first || "Camille"} M.</div>
            </div>
            <div className="tier">{tier}</div>
          </div>
          <div className="qr"><QRPattern size={180} /></div>
          <div className="id-row">
            <span>N° KAR-2026-00482</span>
            <span>Expire 9:56</span>
          </div>
        </div>

        <div style={{ padding: "20px var(--pad) 8px" }}>
          <div className="label" style={{ marginBottom: 8 }}>À montrer en caisse</div>
          <p className="muted" style={{ fontSize: 13, lineHeight: 1.5, marginTop: 0 }}>Code rafraîchi toutes les 15 minutes. Fonctionne hors ligne — pratique en sous-sol.</p>
        </div>

        <div className="section-head"><h3 className="h-section">Cagnotte</h3></div>
        <div style={{ padding: "0 var(--pad)" }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 14 }}>
              <div>
                <div className="label">Solde disponible</div>
                <div style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: 38, letterSpacing: 0, marginTop: 2, color: "var(--primary)" }}>14,80 €</div>
              </div>
              <button className="btn btn-ghost btn-sm">Utiliser</button>
            </div>
            <div className="divider" style={{ margin: "12px 0" }} />
            <div className="stat-grid">
              <div className="stat"><div className="lbl">Achats 12 mois</div><div className="val">226 €</div></div>
              <div className="stat"><div className="lbl">Vers Cercle</div><div className="val">+574 €</div></div>
            </div>
          </div>
        </div>

        <div className="section-head"><h3 className="h-section">Avantages {tier}</h3></div>
        <div style={{ padding: "0 var(--pad) 24px", display: "grid", gap: 10 }}>
          {(tier === "Cercle"
            ? [["Atelier privé annuel","Invitation directe"],["Cagnotte 3 %","Au lieu de 2 %"],["Accès anticipé","Nouveautés en avant-première"],["Cadeau adhésion","Annuel"]]
            : tier === "Privilège"
            ? [["Échantillons à chaque visite","2 références"],["Cadeau anniversaire","Renforcé"],["Accès anticipé","Nouveaux arrivages"]]
            : [["Conseils personnalisés","Inclus"],["Attention anniversaire","Au jour J"],["Événements officine","Inscription prioritaire"]]
          ).map(([t, d]) => (
            <div key={t} className="card-flat" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--paper)", border: "1px solid var(--line)", display: "grid", placeItems: "center" }}>
                <Icon name="spark" size={16} color="var(--secondary)" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{d}</div>
              </div>
              <Icon name="check" size={16} color="var(--sage)" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ───── 10. Events ────────────────────────────────────────────
const ScreenEvents = ({ go, ctx }) => (
  <>
    <div className="topbar"><span style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: 22, color: "var(--on-surface)" }}>Officine</span><div className="back"><Icon name="map" size={18} /></div></div>
    <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
      <div style={{ padding: "8px var(--pad) 16px" }}>
        <div className="card" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, var(--primary), var(--teal-900))", color: "#fff", display: "grid", placeItems: "center", fontSize: 24 }}>K</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Pharmacie Karinthi</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>112 rue Oberkampf, Paris XI · 9h–20h</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><Icon name="map" size={14}/> Itinéraire</button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><Icon name="phone" size={14}/> Appeler</button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-head"><h3 className="h-section">Rendez-vous à venir</h3></div>
      <div style={{ padding: "0 var(--pad) 16px", display: "grid", gap: 10 }}>
        {window.PHARMA_DATA.EVENTS.map((e, i) => (
          <div key={i} className="event-card">
            <div className="event-date"><div className="d">{e.d}</div><div className="m">{e.m}</div></div>
            <div className="event-info">
              <div className="ev-name">{e.title}</div>
              <div className="ev-meta">{e.meta}</div>
            </div>
            <div className="event-go"><Icon name="chev-r" size={16} /></div>
          </div>
        ))}
      </div>

      <div className="section-head"><h3 className="h-section">L'équipe</h3></div>
      <div style={{ padding: "0 var(--pad) 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[["Léa","Titulaire · dermo-cosméto"],["Sophie","Préparatrice · bébé"],["Karim","Pharmacien · phyto"],["Inès","Préparatrice · maquillage"]].map(([n,r]) => (
          <div key={n} className="card-flat">
            <div style={{ width: "100%", aspectRatio: "1", borderRadius: 12, background: "var(--primary-container)", border: "0", display: "grid", placeItems: "center", marginBottom: 10 }}>
              <span style={{ fontFamily: "Roboto", fontWeight: 700, fontSize: 28, color: "var(--primary)" }}>{n[0]}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{n}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{r}</div>
          </div>
        ))}
      </div>
    </div>
  </>
);

// ───── 11. Profile / settings ────────────────────────────────
const ScreenProfile = ({ go, ctx, profile }) => {
  const [push, setPush] = uS({ anniv: true, weather: true, events: true, recos: true, restock: false, reactivation: false });
  return (
    <>
      <div className="topbar"><span style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: 22, color: "var(--on-surface)" }}>Profil</span><div className="back"><Icon name="logout" size={18} /></div></div>
      <div className="phone-scroll" style={{ position: "static", flex: 1 }}>
        <div style={{ padding: "8px var(--pad) 8px" }}>
          <div className="card" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--secondary)", display: "grid", placeItems: "center", fontFamily: "Roboto", fontWeight: 700, fontSize: 24, color: "var(--on-secondary)" }}>{(ctx?.first || "C")[0]}</div>
            <div>
              <div style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: 22, letterSpacing: 0 }}>{ctx?.first || "Camille"} M.</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{ctx?.email || "camille@exemple.fr"}</div>
            </div>
            <Icon name="chev-r" size={16} color="var(--muted)" />
          </div>
        </div>

        <div className="section-head"><h3 className="h-section">Profil cosmétique</h3><span className="more" onClick={() => go("diag", ctx)}>Refaire</span></div>
        <div style={{ padding: "0 var(--pad)" }}>
          <div className="card">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["Type peau", (window.PHARMA_DATA.SKIN_TYPES.find(s => s.id === (profile?.skinType || "mixte"))?.name) || "Mixte"], ["Préoccupations", "Hydratation, Éclat"], ["Exposition", "Modérée"], ["Période", profile?.lifeMoment === "grossesse" ? "Grossesse" : "—"]].map(([l, v]) => (
                <div key={l}>
                  <div className="label">{l}</div>
                  <div style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: 18, marginTop: 4, letterSpacing: 0, color: "var(--primary)" }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div className="callout" style={{ background: "transparent", border: "none", padding: 0 }}>
              <div className="ic"><Icon name="shield" size={16} color="var(--sage)" /></div>
              <div>
                <div className="title">Données sensibles : sur votre téléphone uniquement</div>
                <div className="body">Allergies, période, sensibilités — stockées localement et chiffrées. Suppression à tout moment.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-head"><h3 className="h-section">Notifications</h3></div>
        <div style={{ padding: "0 var(--pad)" }}>
          <div className="card">
            {[
              { k: "anniv", n: "Anniversaire & attentions", d: "Cadeau le jour J, tendresses" },
              { k: "weather", n: "Conseils contextuels", d: "Météo, pollen, saisons" },
              { k: "events", n: "Événements officine", d: "Ateliers, journées découverte" },
              { k: "recos", n: "Recommandations produits", d: "Sélection mensuelle" },
              { k: "restock", n: "Retour de stock", d: "Vos produits favoris" },
              { k: "reactivation", n: "Réactivation", d: "Si je vous oublie pendant 60+ jours" }
            ].map(p => (
              <div key={p.k} className="toggle">
                <div>
                  <div className="name">{p.n}</div>
                  <div className="desc">{p.d}</div>
                </div>
                <div className={`switch ${push[p.k] ? "on" : ""}`} onClick={() => setPush({ ...push, [p.k]: !push[p.k] })} />
              </div>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, marginTop: 12 }}>Maximum 3 push par semaine. Heures calmes 21h–9h. Vous pouvez tout couper depuis les réglages iOS.</p>
        </div>

        <div className="section-head"><h3 className="h-section">Parrainage</h3></div>
        <div style={{ padding: "0 var(--pad) 24px" }}>
          <div className="card" style={{ background: "linear-gradient(180deg, var(--paper-2), var(--paper))" }}>
            <div className="label">Votre code</div>
            <div style={{ fontFamily: "Roboto Mono", fontWeight: 500, fontSize: 28, letterSpacing: "0.05em", margin: "6px 0 8px", color: "var(--primary)" }}>CAMILLE-K48</div>
            <p className="muted" style={{ fontSize: 13, lineHeight: 1.5, marginTop: 0, marginBottom: 14 }}>10 € pour vous, 10 € pour votre filleul·e dès son premier achat.</p>
            <button className="btn btn-primary btn-block"><Icon name="share" size={16}/> Partager mon lien</button>
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, {
  ScreenIntro, ScreenSignup, ScreenMagic, ScreenDiagPrompt, ScreenDiagnostic, ScreenSynthesis,
  ScreenHome, ScreenCatalog, ScreenProduct, ScreenRoutine, ScreenCard, ScreenEvents, ScreenProfile
});
