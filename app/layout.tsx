import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Montull · Valencia 2026",
  description: "Planificador de viaje familiar — Vota por las actividades",
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍊</text></svg>" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: #0A0A0A;
            color: #E8E0D4;
            font-family: 'DM Sans', system-ui, sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          ::-webkit-scrollbar { width: 6px; height: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #3A3228; border-radius: 4px; }
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes slideIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-12px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(6px)} }
          @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
          .vote-btn { transition: all 0.2s !important; }
          .vote-btn:active { transform: scale(0.92) !important; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
