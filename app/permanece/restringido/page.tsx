export default function Page() {
  return (
    <main className="page-shell">
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <section className="notice-card" aria-labelledby="notice-title">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">MS</span>
          <small>MONTE SION</small>
        </div>

        <div className="content">
          <div className="icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.5" />
              <path d="M10 5.75h4M10.5 18.25h3" />
              <path d="m9.5 11.75 1.65 1.65 3.35-3.4" />
            </svg>
          </div>
          <p className="eyebrow">REGISTRO DISPONIBLE EN MÓVIL</p>
          <h1 id="notice-title">Continúa desde tu celular</h1>
          <p className="description">
            El registro está disponible para teléfonos compatibles. Si necesitas
            asistencia, contacta a la organización.
          </p>
          <div className="help-note">
            <span className="help-dot" aria-hidden="true" />
            <span>Estamos aquí para ayudarte</span>
          </div>
        </div>
        <footer>MONTE SION <span aria-hidden="true">·</span> REGISTRO</footer>
      </section>

      <style>{`
        * { box-sizing: border-box; }
        .page-shell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;
          padding: 32px 20px;
          color: #f8f7f4;
          background: #101210;
          font-family: var(--font-geist-sans, Arial, sans-serif);
        }
        .glow { position: absolute; width: 380px; height: 380px; border-radius: 50%; filter: blur(100px); opacity: .16; pointer-events: none; }
        .glow-one { top: -190px; right: -100px; background: #d3a75d; }
        .glow-two { bottom: -240px; left: -150px; background: #8d7449; }
        .notice-card {
          position: relative;
          width: min(100%, 560px);
          overflow: hidden;
          border: 1px solid rgba(234, 211, 165, .16);
          border-radius: 24px;
          background: linear-gradient(145deg, rgba(35, 37, 32, .98), rgba(24, 26, 23, .98));
          box-shadow: 0 28px 90px rgba(0, 0, 0, .4);
        }
        .brand { display: flex; align-items: center; gap: 11px; padding: 25px 30px; border-bottom: 1px solid rgba(255,255,255,.07); }
        .brand-mark { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid rgba(218, 183, 119, .65); border-radius: 11px; color: #e4c487; font-size: 11px; font-weight: 700; letter-spacing: .04em; }
        .brand small { color: #e8e4da; font-size: 11px; font-weight: 700; letter-spacing: .19em; }
        .content { padding: 50px 48px 45px; }
        .icon-wrap { display: grid; place-items: center; width: 58px; height: 58px; margin-bottom: 30px; border: 1px solid rgba(218, 183, 119, .22); border-radius: 18px; background: rgba(218, 183, 119, .08); }
        .icon-wrap svg { width: 27px; height: 27px; stroke: #ddbd7f; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        .eyebrow { margin: 0 0 14px; color: #d2b579; font-size: 10px; font-weight: 700; letter-spacing: .16em; }
        h1 { max-width: 400px; margin: 0; color: #faf9f6; font-size: clamp(30px, 6vw, 40px); font-weight: 600; letter-spacing: -.045em; line-height: 1.12; }
        .description { max-width: 410px; margin: 18px 0 0; color: #b7b7af; font-size: 15px; line-height: 1.75; }
        .help-note { display: flex; align-items: center; gap: 10px; margin-top: 30px; color: #dedbd2; font-size: 13px; }
        .help-dot { width: 7px; height: 7px; border-radius: 50%; background: #d8b875; box-shadow: 0 0 12px rgba(216,184,117,.7); }
        footer { padding: 17px 30px; border-top: 1px solid rgba(255,255,255,.07); color: #777970; font-size: 9px; font-weight: 600; letter-spacing: .16em; }
        footer span { padding: 0 5px; color: #c4a66e; }
        @media (max-width: 520px) {
          .page-shell { padding: 20px 16px; }
          .notice-card { border-radius: 20px; }
          .brand { padding: 21px 23px; }
          .content { padding: 38px 25px 35px; }
          footer { padding: 16px 25px; }
        }
      `}</style>
    </main>
  );
}