// App shell with navigation + tweaks panel
const { useState: aS, useEffect: aE } = React;

const TabRoot = ["home", "catalog", "card", "events", "profile"];

const VALID_ROUTES = new Set([
  "intro", "signup", "magic", "diagPrompt", "diag", "synth",
  "home", "catalog", "product", "routine", "card", "events", "profile"
]);

function initialRoute() {
  try {
    const sp = new URLSearchParams(window.location.search);
    const r = sp.get("route");
    if (r && VALID_ROUTES.has(r)) {
      const ctx = r === "product" ? { productId: sp.get("id") || "p1" } : {};
      return { name: r, ctx };
    }
  } catch (_) {}
  return { name: "intro", ctx: {} };
}

function App() {
  const [route, setRoute] = aS(initialRoute);
  const [introStep, setIntroStep] = aS(0);
  const [toastMsg, setToastMsg] = aS(null);
  const [tweaks, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS);

  // Apply density to root
  aE(() => {
    document.documentElement.dataset.density = tweaks.density || "comfort";
  }, [tweaks.density]);

  const go = (name, ctx) => {
    setRoute({ name, ctx: { ...(route.ctx || {}), ...(ctx || {}) } });
    // scroll to top
    setTimeout(() => {
      const el = document.querySelector(".phone-scroll");
      if (el) el.scrollTop = 0;
    }, 30);
  };
  const setCtx = (ctx) => setRoute(r => ({ ...r, ctx }));
  const toast = (msg) => setToastMsg(msg);

  const profile = {
    skinType: tweaks.skinType,
    lifeMoment: tweaks.lifeMoment,
    memberTier: tweaks.memberTier
  };

  // Decide what to render
  let screen = null;
  switch (route.name) {
    case "intro": screen = <ScreenIntro go={go} step={introStep} setStep={setIntroStep} />; break;
    case "signup": screen = <ScreenSignup go={go} />; break;
    case "magic": screen = <ScreenMagic go={go} ctx={route.ctx} />; break;
    case "diagPrompt": screen = <ScreenDiagPrompt go={go} ctx={route.ctx} />; break;
    case "diag": screen = <ScreenDiagnostic go={go} ctx={route.ctx} setCtx={setCtx} />; break;
    case "synth": screen = <ScreenSynthesis go={go} ctx={route.ctx} profile={profile} />; break;
    case "home": screen = <ScreenHome go={go} ctx={route.ctx} profile={profile} nav={(t) => go(t, route.ctx)} />; break;
    case "catalog": screen = <ScreenCatalog go={go} ctx={route.ctx} profile={profile} />; break;
    case "product": screen = <ScreenProduct go={go} ctx={route.ctx} profile={profile} toast={toast} />; break;
    case "routine": screen = <ScreenRoutine go={go} ctx={route.ctx} />; break;
    case "card": screen = <ScreenCard go={go} ctx={route.ctx} profile={profile} />; break;
    case "events": screen = <ScreenEvents go={go} ctx={route.ctx} />; break;
    case "profile": screen = <ScreenProfile go={go} ctx={route.ctx} profile={profile} />; break;
    default: screen = <ScreenHome go={go} ctx={route.ctx} profile={profile} nav={(t) => go(t, route.ctx)} />;
  }

  // Show tab bar only on rooted tabs
  const showTabs = TabRoot.includes(route.name);
  const activeTab = TabRoot.includes(route.name) ? route.name : null;

  return (
    <div className="app-shell">
      <div className="shell-side left">
        <div className="brand-mark">Karinthi</div>
        <div className="brand-tag">Compagnon parapharmacie · MVP</div>
        <h2>Le rituel beauté retrouve son officine.</h2>
        <p>Prototype interactif du compagnon Karinthi — onboarding, diagnostic, recommandations personnalisées, carte digitale, événements.</p>
        <p>Light mode élégant · cliquable bout en bout · cible cliente 25-55.</p>
        <div className="meta">
          <span className="pill">F01 Onboarding</span>
          <span className="pill">F02 Diagnostic</span>
          <span className="pill">F03 Catalogue</span>
          <span className="pill">F04 Recos</span>
          <span className="pill">F06 Officine</span>
          <span className="pill">F07 Fidélité</span>
        </div>
      </div>

      <div className="phone" data-screen-label={`Phone · ${route.name}`}>
        <StatusBar />
        <div className="phone-screen">
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
            {screen}
            {showTabs && <TabBar active={activeTab} onNav={(id) => go(id, route.ctx)} />}
          </div>
          {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg(null)} />}
        </div>
      </div>

      <div className="shell-side right">
        <div className="brand-tag">Pour</div>
        <h2>Pharmaciens<br/>titulaires.</h2>
        <p>Service additionnel offert à vos clientes membres. Conseil pharmacien comme caution premium.</p>
        <div className="meta">
          <span className="pill">7 Md€ marché</span>
          <span className="pill">+5 % / an</span>
          <span className="pill">RGPD-friendly</span>
        </div>
        <div style={{ marginTop: 22, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
          Activez le mode <strong style={{ color: "var(--ink)" }}>Tweaks</strong> dans la barre d'outils pour explorer les profils simulés et la densité d'affichage.
        </div>
      </div>

      {/* Tweaks panel */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Densité">
          <window.TweakRadio
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[{ value: "comfort", label: "Confort" }, { value: "compact", label: "Compact" }]}
          />
        </window.TweakSection>

        <window.TweakSection label="Profil simulé · type de peau">
          <window.TweakSelect
            value={tweaks.skinType}
            onChange={(v) => setTweak("skinType", v)}
            options={[
              { value: "seche", label: "Sèche" },
              { value: "mixte", label: "Mixte" },
              { value: "grasse", label: "Grasse" },
              { value: "normale", label: "Normale" },
              { value: "sensible", label: "Sensible" }
            ]}
          />
        </window.TweakSection>

        <window.TweakSection label="Moment de vie">
          <window.TweakSelect
            value={tweaks.lifeMoment}
            onChange={(v) => setTweak("lifeMoment", v)}
            options={[
              { value: "none", label: "Aucun" },
              { value: "grossesse", label: "Grossesse" },
              { value: "postpartum", label: "Post-partum" },
              { value: "menopause", label: "Ménopause" }
            ]}
          />
        </window.TweakSection>

        <window.TweakSection label="Statut membre">
          <window.TweakRadio
            value={tweaks.memberTier}
            onChange={(v) => setTweak("memberTier", v)}
            options={[
              { value: "Membre", label: "Membre" },
              { value: "Privilège", label: "Privilège" },
              { value: "Cercle", label: "Cercle" }
            ]}
          />
        </window.TweakSection>

        <window.TweakSection label="Navigation rapide">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[
              ["intro", "Intro"],
              ["signup", "Inscription"],
              ["diagPrompt", "Diagnostic"],
              ["synth", "Synthèse"],
              ["home", "Accueil"],
              ["catalog", "Catalogue"],
              ["product", "Fiche produit"],
              ["routine", "Routine"],
              ["card", "Carte"],
              ["events", "Officine"],
              ["profile", "Profil"]
            ].map(([k, l]) => (
              <button key={k} onClick={() => go(k, k === "product" ? { productId: "p1" } : route.ctx)} style={{
                padding: "8px 10px", fontSize: 11, borderRadius: 8, border: "1px solid var(--line)",
                background: route.name === k ? "var(--ink)" : "var(--paper)",
                color: route.name === k ? "var(--paper)" : "var(--ink)",
                cursor: "pointer", fontFamily: "Roboto", fontWeight: 500
              }}>{l}</button>
            ))}
          </div>
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
