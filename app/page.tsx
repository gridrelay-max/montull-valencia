"use client";

import { useState, useEffect, useCallback } from "react";
import { ref, set, get, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import {
  PASSWORD, MEMBERS, MEMBER_COLORS, MEMBER_EMOJIS,
  DAYS, TYPE_ICONS, type Activity,
} from "@/lib/data";

/* ── Firebase helpers ────────────────── */

function votesRef(member: string) {
  if (!database) throw new Error("Database not initialized");
  return ref(database, `votes/${member}`);
}

function allVotesRef() {
  if (!database) throw new Error("Database not initialized");
  return ref(database, "votes");
}

/* ── Password Gate ───────────────────── */

function PasswordGate({ onPass }: { onPass: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = () => {
    if (pw.toLowerCase().trim() === PASSWORD) {
      onPass();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #0A0A0A 0%, #141414 50%, #0D0808 100%)" }}>
      <div style={{ textAlign: "center", padding: "48px", maxWidth: "420px" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px", animation: "fadeUp 0.6s ease" }}>🍊</div>
        <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#F5E6C8", margin: "0 0 4px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', Georgia, serif", animation: "fadeUp 0.6s ease 0.1s both" }}>MONTULL</h1>
        <p style={{ fontSize: "13px", color: "#8B7D6B", letterSpacing: "5px", margin: "0 0 40px", textTransform: "uppercase", animation: "fadeUp 0.6s ease 0.2s both" }}>VALENCIA 2026</p>
        
        <div style={{ animation: "fadeUp 0.6s ease 0.3s both" }}>
          <input
            type="password"
            placeholder="Contraseña familiar"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            style={{
              width: "100%",
              padding: "14px 20px",
              fontSize: "16px",
              background: "#1A1714",
              border: error ? "1px solid #B44" : "1px solid #3A3228",
              borderRadius: "8px",
              color: "#E8E0D4",
              outline: "none",
              textAlign: "center",
              letterSpacing: "2px",
              fontFamily: "'DM Sans', sans-serif",
              animation: shake ? "shake 0.6s" : "none",
            }}
          />
          <button
            onClick={submit}
            style={{
              marginTop: "16px",
              padding: "12px 48px",
              fontSize: "14px",
              background: "transparent",
              border: "1px solid #5B4D3A",
              borderRadius: "6px",
              color: "#C4A87C",
              cursor: "pointer",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              transition: "all 0.3s",
            }}
          >
            Entrar
          </button>
          {error && (
            <p style={{ fontSize: "12px", color: "#B44", marginTop: "12px" }}>
              Contraseña incorrecta
            </p>
          )}
        </div>
        
        <p style={{ fontSize: "11px", color: "#4A4036", marginTop: "32px", animation: "fadeUp 0.6s ease 0.5s both" }}>
          31 de marzo — 10 de abril · Planificador del Viaje Familiar
        </p>
      </div>
    </div>
  );
}

/* ── Member Selection ────────────────── */

function MemberSelector({ onSelect }: { onSelect: (m: string) => void }) {
  return (
    <div style={{ minHeight: "100vh", padding: "32px 16px", background: "linear-gradient(160deg, #0A0A0A 0%, #141414 50%, #0D0808 100%)" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🍊</div>
        <h2 style={{ fontSize: "20px", color: "#F5E6C8", marginBottom: "8px", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "2px" }}>
          ¿Quién eres?
        </h2>
        <p style={{ fontSize: "12px", color: "#8B7D6B", marginBottom: "32px" }}>Selecciona tu nombre para votar</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
          {MEMBERS.map((m) => (
            <button
              key={m}
              onClick={() => onSelect(m)}
              style={{
                padding: "20px 16px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${MEMBER_COLORS[m]}40`,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${MEMBER_COLORS[m]}15`;
                e.currentTarget.style.borderColor = `${MEMBER_COLORS[m]}80`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = `${MEMBER_COLORS[m]}40`;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>{MEMBER_EMOJIS[m]}</div>
              <div style={{ fontSize: "15px", fontWeight: 600, color: MEMBER_COLORS[m] }}>{m}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main App (simplified for testing) ────────────────── */

export default function Page() {
  const [authed, setAuthed] = useState(false);
  const [member, setMember] = useState<string | null>(null);

  if (!authed) {
    return <PasswordGate onPass={() => setAuthed(true)} />;
  }

  if (!member) {
    return <MemberSelector onSelect={setMember} />;
  }

  return (
    <div style={{ minHeight: "100vh", padding: "32px 16px", background: "#0A0A0A", color: "#E8E0D4" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", color: "#F5E6C8", fontFamily: "'Cormorant Garamond', serif" }}>
            Hola, {member}! {MEMBER_EMOJIS[member]}
          </h1>
          <p style={{ fontSize: "13px", color: "#8B7D6B", marginTop: "8px" }}>
            Votación del viaje Valencia 2026 - En desarrollo...
          </p>
          <button
            onClick={() => setMember(null)}
            style={{
              marginTop: "16px",
              padding: "8px 20px",
              background: "transparent",
              border: "1px solid #3A3228",
              borderRadius: "6px",
              color: "#8B7D6B",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Cambiar de usuario
          </button>
        </div>
        
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #3A3228", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#C4A87C", marginBottom: "16px" }}>
            🎉 La aplicación está funcionando!
          </p>
          <p style={{ fontSize: "13px", color: "#8B7D6B", lineHeight: "1.6" }}>
            El sistema de votación completo se está cargando.<br/>
            Pronto podrás votar en las actividades de cada día del viaje.
          </p>
        </div>
      </div>
    </div>
  );
}
