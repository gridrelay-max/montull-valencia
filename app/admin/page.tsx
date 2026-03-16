"use client";

import { useState, useEffect } from "react";
import { ref, get, set, onValue, push, remove } from "firebase/database";
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
  const [selectedDay, setSelectedDay] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Real-time listener for votes
  useEffect(() => {
    if (!db) return;
    const votesRef = ref(db, "votes");
    const unsubscribe = onValue(votesRef, (snapshot) => {
      if (snapshot.exists()) {
        setVotes(snapshot.val());
        setLastUpdate(new Date());
      } else {
        setVotes({});
      }
    });
    return () => unsubscribe();
  }, []);

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

  const deleteActivity = async (activityId: string) => {
    if (!confirm("¿Eliminar esta actividad?")) return;
    // Remove votes for this activity
    for (const member of MEMBERS) {
      if (db && votes[member]?.[activityId] !== undefined) {
        await set(ref(db, `votes/${member}/${activityId}`), null);
      }
    }
  };

  const day = DAYS[selectedDay];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#E8E0D4", padding: "24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🍊</div>
              <h1 style={{ fontSize: "28px", color: "#F5E6C8", marginBottom: "4px", fontFamily: "'Cormorant Garamond', serif" }}>
                Admin Dashboard
              </h1>
              <p style={{ fontSize: "13px", color: "#8B7D6B" }}>
                Montull Valencia 2026 - Resultados en Tiempo Real
              </p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(76, 175, 80, 0.1)", border: "1px solid #4CAF50", borderRadius: "8px" }}>
            <span style={{ fontSize: "12px", color: "#4CAF50" }}>
              🟢 Actualización en tiempo real
            </span>
            <span style={{ fontSize: "11px", color: "#8B7D6B" }}>
              Última actualización: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
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
          <p style={{ fontSize: "12px", color: "#8B7D6B", marginTop: "12px" }}>
            💡 Nota: Para editar actividades, edita el archivo lib/data.ts y redespliega la app.
          </p>
        </div>

        {/* Activities with Votes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {day.activities.map((activity) => {
            const summary = getVoteSummary(activity.id);
            const popularity = summary.total > 0 ? (summary.yes / summary.total) * 100 : 0;
            const notVoted = summary.total - summary.yes - summary.no;

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
                  <div style={{ marginLeft: "20px", textAlign: "center", minWidth: "140px" }}>
                    <div style={{ fontSize: "28px", fontWeight: 700, color: popularity >= 50 ? "#4CAF50" : "#FF6B6B", marginBottom: "4px" }}>
                      {Math.round(popularity)}%
                    </div>
                    <div style={{ fontSize: "13px", color: "#8B7D6B", marginBottom: "4px" }}>
                      ✓ {summary.yes} SÍ / ✗ {summary.no} NO
                    </div>
                    {notVoted > 0 && (
                      <div style={{ fontSize: "11px", color: "#666", marginBottom: "8px" }}>
                        ⏳ {notVoted} pendiente{notVoted !== 1 ? 's' : ''}
                      </div>
                    )}
                    <div style={{ width: "100%", height: "8px", background: "#1A1714", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${popularity}%`, height: "100%", background: popularity >= 50 ? "#4CAF50" : "#FF6B6B", transition: "width 0.3s" }} />
                    </div>
                  </div>
                </div>

                {/* Who voted */}
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #3A3228", display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "12px" }}>
                  {summary.yesMembers.length > 0 && (
                    <div>
                      <span style={{ color: "#4CAF50", fontWeight: 600 }}>✓ SÍ: </span>
                      {summary.yesMembers.map(m => (
                        <span key={m} style={{ marginRight: "8px", padding: "2px 6px", background: `${MEMBER_COLORS[m]}20`, color: MEMBER_COLORS[m], borderRadius: "4px", fontSize: "11px", fontWeight: 600 }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                  {summary.noMembers.length > 0 && (
                    <div>
                      <span style={{ color: "#FF6B6B", fontWeight: 600 }}>✗ NO: </span>
                      {summary.noMembers.map(m => (
                        <span key={m} style={{ marginRight: "8px", padding: "2px 6px", background: `${MEMBER_COLORS[m]}20`, color: MEMBER_COLORS[m], borderRadius: "4px", fontSize: "11px", fontWeight: 600 }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                  {notVoted > 0 && (
                    <div style={{ color: "#666" }}>
                      ⏳ Pendientes: {MEMBERS.filter(m => votes[m]?.[activity.id] === undefined).join(", ")}
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
