"use client";

import { useState, useEffect } from "react";
import { ref, get, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { DAYS, MEMBERS, MEMBER_COLORS, type Activity } from "@/lib/data";

const ADMIN_PASSWORD = "valencia2026admin";

function AdminLogin({ onPass }: { onPass: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (pw === ADMIN_PASSWORD) {
      onPass();
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #0A0A0A 0%, #141414 50%, #0D0808 100%)" }}>
      <div style={{ textAlign: "center", padding: "48px", maxWidth: "420px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔐</div>
        <h1 style={{ fontSize: "24px", color: "#F5E6C8", marginBottom: "8px", fontFamily: "'Cormorant Garamond', serif" }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: "13px", color: "#8B7D6B", marginBottom: "32px" }}>
          Montull Valencia 2026
        </p>
        <input
          type="password"
          placeholder="Contraseña de admin"
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
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        <button
          onClick={submit}
          style={{
            marginTop: "16px",
            padding: "12px 48px",
            fontSize: "14px",
            background: "#C4A87C",
            border: "none",
            borderRadius: "6px",
            color: "#0A0A0A",
            cursor: "pointer",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
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
    </div>
  );
}

function AdminDashboard() {
  const [votes, setVotes] = useState<Record<string, Record<string, boolean>>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = async () => {
    if (!db) return;
    try {
      const snapshot = await get(ref(db, "votes"));
      if (snapshot.exists()) {
        setVotes(snapshot.val());
      }
    } catch (e) {
      console.error("Error loading votes:", e);
    }
    setLoading(false);
  };

  const getVoteSummary = (activityId: string) => {
    let yes = 0, no = 0;
    const yesMembers: string[] = [];
    const noMembers: string[] = [];

    MEMBERS.forEach(member => {
      const vote = votes[member]?.[activityId];
      if (vote === true) {
        yes++;
        yesMembers.push(member);
      } else if (vote === false) {
        no++;
        noMembers.push(member);
      }
    });

    return { yes, no, yesMembers, noMembers, total: MEMBERS.length };
  };

  const day = DAYS[selectedDay];

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0A0A", color: "#fff" }}>
        <p>Cargando votos...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#E8E0D4", padding: "24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🍊</div>
          <h1 style={{ fontSize: "28px", color: "#F5E6C8", marginBottom: "4px", fontFamily: "'Cormorant Garamond', serif" }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "#8B7D6B" }}>
            Montull Valencia 2026 - Resultados de Votación
          </p>
        </div>

        {/* Day Selector */}
        <div style={{ marginBottom: "24px", display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px" }}>
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              style={{
                padding: "12px 16px",
                background: selectedDay === i ? "#C4A87C" : "rgba(255,255,255,0.05)",
                border: "1px solid " + (selectedDay === i ? "#C4A87C" : "#3A3228"),
                borderRadius: "8px",
                color: selectedDay === i ? "#0A0A0A" : "#E8E0D4",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {d.date} - {d.label}
            </button>
          ))}
        </div>

        {/* Day Info */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #3A3228", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <span style={{ fontSize: "32px" }}>{day.icon}</span>
            <div>
              <h2 style={{ fontSize: "20px", color: "#F5E6C8", marginBottom: "4px", fontFamily: "'Cormorant Garamond', serif" }}>
                {day.label}
              </h2>
              <p style={{ fontSize: "13px", color: "#8B7D6B" }}>
                {day.date} ({day.weekday}) - {day.theme}
              </p>
            </div>
          </div>
          {day.canTravel && (
            <p style={{ fontSize: "12px", color: "#FFA500", marginTop: "8px" }}>
              🚗 Día de viaje - {day.note}
            </p>
          )}
        </div>

        {/* Activities with Votes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {day.activities.map((activity) => {
            const summary = getVoteSummary(activity.id);
            const popularity = summary.total > 0 ? (summary.yes / summary.total) * 100 : 0;

            return (
              <div
                key={activity.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid #3A3228",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#8B7D6B" }}>
                        {activity.time}
                      </span>
                      <span style={{ fontSize: "18px" }}>{activity.type}</span>
                    </div>
                    <h3 style={{ fontSize: "16px", color: "#F5E6C8", marginBottom: "6px", fontWeight: 600 }}>
                      {activity.name}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#8B7D6B", lineHeight: "1.5" }}>
                      {activity.desc}
                    </p>
                    {!activity.free && (
                      <p style={{ fontSize: "11px", color: "#FFA500", marginTop: "6px" }}>
                        💰 De pago
                      </p>
                    )}
                  </div>

                  {/* Vote Summary */}
                  <div style={{ marginLeft: "20px", textAlign: "center", minWidth: "120px" }}>
                    <div style={{ fontSize: "24px", fontWeight: 700, color: popularity >= 50 ? "#4CAF50" : "#FF6B6B", marginBottom: "4px" }}>
                      {Math.round(popularity)}%
                    </div>
                    <div style={{ fontSize: "12px", color: "#8B7D6B", marginBottom: "8px" }}>
                      {summary.yes} SÍ / {summary.no} NO
                    </div>
                    <div style={{ width: "100%", height: "6px", background: "#1A1714", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${popularity}%`, height: "100%", background: popularity >= 50 ? "#4CAF50" : "#FF6B6B", transition: "width 0.3s" }} />
                    </div>
                  </div>
                </div>

                {/* Who voted */}
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #3A3228", display: "flex", gap: "16px", fontSize: "12px" }}>
                  {summary.yesMembers.length > 0 && (
                    <div>
                      <span style={{ color: "#4CAF50", fontWeight: 600 }}>SÍ: </span>
                      {summary.yesMembers.map(m => (
                        <span key={m} style={{ marginRight: "6px", color: MEMBER_COLORS[m] }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                  {summary.noMembers.length > 0 && (
                    <div>
                      <span style={{ color: "#FF6B6B", fontWeight: 600 }}>NO: </span>
                      {summary.noMembers.map(m => (
                        <span key={m} style={{ marginRight: "6px", color: MEMBER_COLORS[m] }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);

  if (!authed) {
    return <AdminLogin onPass={() => setAuthed(true)} />;
  }

  return <AdminDashboard />;
}
