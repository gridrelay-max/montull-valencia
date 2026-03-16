"use client";

import { useState, useEffect, useCallback } from "react";
import { ref, set, get, onValue } from "firebase/database";
import { database as db } from "@/lib/firebase";
import {
  PASSWORD, MEMBERS, MEMBER_COLORS, MEMBER_EMOJIS,
  DAYS, TYPE_ICONS, type Activity,
} from "@/lib/data";

/* ── Firebase helpers ────────────────── */

function votesRef(member: string) {
  return ref(db, `votes/${member}`);
}

function allVotesRef() {
  return ref(db, "votes");
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
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg, #0A0A0A 0%, #141414 50%, #0D0808 100%)",
    }}>
      <div style={{
        textAlign: "center", padding: 48, maxWidth: 420,
        animation: shake ? "shake 0.4s ease" : undefined,
      }}>
        <div style={{ fontSize: 52, marginBottom: 16, animation: "fadeUp 0.6s ease" }}>🍊</div>
        <h1 style={{
          fontSize: 28, fontWeight: 400, color: "#F5E6C8", margin: "0 0 4px",
          letterSpacing: 3, textTransform: "uppercase",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          animation: "fadeUp 0.6s ease 0.1s both",
        }}>MONTULL</h1>
        <p style={{
          fontSize: 13, color: "#8B7D6B", letterSpacing: 5, margin: "0 0 40px",
          textTransform: "uppercase",
          animation: "fadeUp 0.6s ease 0.2s both",
        }}>VALENCIA 2026</p>
        <div style={{ animation: "fadeUp 0.6s ease 0.3s both" }}>
          <input
            type="password"
            placeholder="Contraseña familiar"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && submit()}
            style={{
              width: "100%", padding: "14px 20px", fontSize: 16,
              background: "#1A1714", border: error ? "1px solid #C75B39" : "1px solid #3A3228",
              borderRadius: 8, color: "#E8E0D4", outline: "none",
              textAlign: "center", letterSpacing: 2,
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          {error && <p style={{ color: "#C75B39", fontSize: 13, marginTop: 10 }}>Contraseña incorrecta. Inténtalo de nuevo.</p>}
          <button
            onClick={submit}
            style={{
              marginTop: 16, padding: "12px 48px", fontSize: 14,
              background: "transparent", border: "1px solid #5B4D3A",
              borderRadius: 6, color: "#C4A87C", cursor: "pointer",
              letterSpacing: 2, textTransform: "uppercase",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              transition: "all 0.3s",
            }}
          >Entrar</button>
        </div>
        <p style={{
          fontSize: 11, color: "#4A4036", marginTop: 32,
          animation: "fadeUp 0.6s ease 0.5s both",
        }}>31 de marzo — 10 de abril · Planificador del Viaje Familiar</p>
      </div>
    </div>
  );
}

/* ── Member Select ───────────────────── */

function MemberSelect({ onSelect }: { onSelect: (m: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg, #0A0A0A 0%, #141414 50%, #0D0808 100%)",
      padding: 20,
    }}>
      <div style={{ textAlign: "center", maxWidth: 500, width: "100%" }}>
        <p style={{
          fontSize: 13, color: "#8B7D6B", letterSpacing: 4, margin: "0 0 8px",
          textTransform: "uppercase", animation: "fadeUp 0.5s ease both",
        }}>¿QUIÉN VOTA?</p>
        <h2 style={{
          fontSize: 24, fontWeight: 400, color: "#F5E6C8", margin: "0 0 8px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          animation: "fadeUp 0.5s ease 0.1s both",
        }}>Selecciona tu Nombre</h2>
        <p style={{
          fontSize: 13, color: "#6B6058", margin: "0 0 36px",
          animation: "fadeUp 0.5s ease 0.15s both",
        }}>Vota SÍ o NO en las actividades de cada día. Puedes cambiar tus votos en cualquier momento.</p>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: 12, animation: "fadeUp 0.5s ease 0.2s both",
        }}>
          {MEMBERS.map((m, i) => (
            <button
              key={m}
              onClick={() => onSelect(m)}
              onMouseEnter={() => setHovered(m)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "20px 16px", borderRadius: 12,
                background: hovered === m ? `${MEMBER_COLORS[m]}15` : "#151210",
                border: hovered === m ? `2px solid ${MEMBER_COLORS[m]}60` : "2px solid #2A2520",
                cursor: "pointer", transition: "all 0.25s",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                animation: `fadeUp 0.4s ease ${0.25 + i * 0.06}s both`,
              }}
            >
              <span style={{ fontSize: 28 }}>{MEMBER_EMOJIS[m]}</span>
              <span style={{
                fontSize: 15, fontWeight: 600, color: hovered === m ? MEMBER_COLORS[m] : "#C4B8A8",
                letterSpacing: 0.5,
              }}>{m}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Voting App ──────────────────────── */

type VoteMap = Record<string, string>;
type AllVotesMap = Record<string, VoteMap>;

function VotingApp({ member, onSwitchMember }: { member: string; onSwitchMember: () => void }) {
  const [votes, setVotes] = useState<VoteMap>({});
  const [allVotes, setAllVotes] = useState<AllVotesMap>({});
  const [selectedDay, setSelectedDay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Load my votes + subscribe to all votes in real-time
  useEffect(() => {
    setLoading(true);
    // Get my votes
    get(votesRef(member)).then(snap => {
      if (snap.exists()) setVotes(snap.val());
      else setVotes({});
      setLoading(false);
    }).catch(() => setLoading(false));

    // Real-time listener on all votes
    const unsub = onValue(allVotesRef(), (snap) => {
      if (snap.exists()) setAllVotes(snap.val());
      else setAllVotes({});
    });

    return () => unsub();
  }, [member]);

  const vote = useCallback(async (actId: string, val: string | null) => {
    const updated = { ...votes };
    if (val === null) {
      delete updated[actId];
    } else {
      updated[actId] = val;
    }
    setVotes(updated);
    setSaving(true);
    try {
      await set(votesRef(member), updated);
    } catch (e) {
      console.error("Error al guardar:", e);
    }
    setSaving(false);
  }, [votes, member]);

  const day = DAYS[selectedDay];

  const getVoteCounts = (actId: string) => {
    let yes: string[] = [], no: string[] = [];
    for (const m of MEMBERS) {
      if (allVotes[m]?.[actId] === "yes") yes.push(m);
      else if (allVotes[m]?.[actId] === "no") no.push(m);
    }
    return { yes, no };
  };

  const myProgress = DAYS.reduce((sum, d) => sum + d.activities.filter(a => votes[a.id]).length, 0);
  const totalActs = DAYS.reduce((sum, d) => sum + d.activities.length, 0);
  const progressPct = Math.round((myProgress / totalActs) * 100);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#0D0D0D", color: "#8B7D6B",
      }}>
        <p style={{ animation: "pulse 1.5s ease infinite" }}>Cargando tus votos...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #12100E 0%, #0A0A0A 100%)",
        borderBottom: "1px solid #1E1A16",
        padding: "16px 20px", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{MEMBER_EMOJIS[member]}</span>
              <div>
                <h1 style={{
                  fontSize: 17, fontWeight: 600, color: MEMBER_COLORS[member],
                  margin: 0, letterSpacing: 1,
                }}>Votos de {member}</h1>
                <p style={{ fontSize: 11, color: "#6B6058", margin: 0 }}>
                  {progressPct}% completado · {myProgress}/{totalActs} actividades votadas
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {saving && <span style={{ fontSize: 11, color: "#5B8C5A" }}>Guardando...</span>}
              <button
                onClick={() => setShowResults(!showResults)}
                style={{
                  padding: "7px 14px", borderRadius: 6, fontSize: 11,
                  background: showResults ? "#C4A87C20" : "transparent",
                  border: `1px solid ${showResults ? "#C4A87C" : "#3A3228"}`,
                  color: showResults ? "#C4A87C" : "#8B7D6B",
                  cursor: "pointer", letterSpacing: 1, textTransform: "uppercase",
                }}>
                {showResults ? "Ocultar Votos" : "Ver Todos"}
              </button>
              <button
                onClick={onSwitchMember}
                style={{
                  padding: "7px 14px", borderRadius: 6, fontSize: 11,
                  background: "transparent", border: "1px solid #3A3228",
                  color: "#8B7D6B", cursor: "pointer", letterSpacing: 1,
                  textTransform: "uppercase",
                }}>Cambiar</button>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: 10, height: 3, background: "#1E1A16", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${MEMBER_COLORS[member]}, ${MEMBER_COLORS[member]}80)`,
              borderRadius: 2, transition: "width 0.4s ease",
            }} />
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div style={{
        overflowX: "auto", whiteSpace: "nowrap", padding: "14px 20px",
        borderBottom: "1px solid #1A1610", WebkitOverflowScrolling: "touch",
      }}>
        <div style={{ display: "inline-flex", gap: 6 }}>
          {DAYS.map((d, i) => {
            const isSelected = i === selectedDay;
            const dayVoted = d.activities.filter(a => votes[a.id]).length;
            const dayTotal = d.activities.length;
            const allDone = dayVoted === dayTotal;
            return (
              <button key={i} onClick={() => setSelectedDay(i)} style={{
                display: "inline-flex", flexDirection: "column", alignItems: "center",
                padding: "10px 12px", borderRadius: 10, minWidth: 68,
                border: isSelected ? `2px solid ${d.color}80` : "2px solid transparent",
                background: isSelected ? `${d.color}12` : "#12100E",
                cursor: "pointer", position: "relative", transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 16, marginBottom: 2 }}>{d.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: isSelected ? d.color : "#6B6058" }}>{d.date}</span>
                <span style={{ fontSize: 9, color: isSelected ? "#8B7D6B" : "#4A4036" }}>{d.weekday}</span>
                <div style={{ marginTop: 4, width: 32, height: 2, background: "#2A2520", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${(dayVoted / dayTotal) * 100}%`,
                    background: allDone ? "#5B8C5A" : MEMBER_COLORS[member],
                    transition: "width 0.3s",
                  }} />
                </div>
                {allDone && <span style={{ position: "absolute", top: 2, right: 2, fontSize: 8, color: "#5B8C5A" }}>✓</span>}
                {d.canTravel && <span style={{
                  position: "absolute", top: 2, left: 2, fontSize: 7,
                  background: "#C75B3950", color: "#C75B39", borderRadius: 3,
                  padding: "1px 3px", fontWeight: 700,
                }}>VIAJE</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "20px 20px 100px" }}>
        {/* Day Header */}
        <div style={{
          background: `linear-gradient(135deg, ${day.color}10, transparent)`,
          border: `1px solid ${day.color}25`,
          borderRadius: 14, padding: "18px 22px", marginBottom: 20,
          animation: "fadeUp 0.3s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 30 }}>{day.icon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: day.color,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}>{day.theme}</h2>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B6058" }}>
                {day.date} · {day.weekday} · {day.label}
              </p>
            </div>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 13, color: "#8B7D6B", lineHeight: 1.5 }}>{day.note}</p>
          <p style={{ margin: "8px 0 0", fontSize: 11, color: "#5B4D3A" }}>
            Vota en cada actividad — ¿te gustaría hacer esto? 👍 SÍ o 👎 NO
          </p>
        </div>

        {/* Activities */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {day.activities.map((act, i) => {
            const myVote = votes[act.id];
            const counts = getVoteCounts(act.id);
            const isAlt = act.name.startsWith("ALT:") || act.name.startsWith("OPCIÓN");
            return (
              <div key={act.id} style={{
                padding: "14px 16px", borderRadius: 12,
                background: myVote === "yes" ? "#1A2418" : myVote === "no" ? "#1E1614" : "#12100E",
                border: myVote === "yes" ? "1px solid #5B8C5A30" : myVote === "no" ? "1px solid #8B4A3A30" : "1px solid #1E1A16",
                borderLeft: isAlt ? "3px solid #5B4D3A" : myVote === "yes" ? "3px solid #5B8C5A" : myVote === "no" ? "3px solid #8B4A3A" : "3px solid transparent",
                transition: "all 0.25s",
                animation: `slideIn 0.3s ease ${i * 0.03}s both`,
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    minWidth: 44, textAlign: "right" as const, fontSize: 11, color: "#5B4D3A",
                    fontWeight: 500, paddingTop: 3, fontVariantNumeric: "tabular-nums" as const,
                  }}>{act.time}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" as const }}>
                      <span style={{ fontSize: 14 }}>{TYPE_ICONS[act.type] || "📌"}</span>
                      <span style={{
                        fontSize: 13.5, fontWeight: 600,
                        color: myVote === "yes" ? "#A8D5A2" : myVote === "no" ? "#C4978A" : "#C4B8A8",
                      }}>{act.name}</span>
                      {act.free ? (
                        <span style={{
                          fontSize: 9, background: "#5B8C5A25", color: "#7BC67B",
                          padding: "2px 7px", borderRadius: 8, fontWeight: 600,
                        }}>GRATIS</span>
                      ) : (
                        <span style={{
                          fontSize: 9, background: "#C4956A20", color: "#C4956A",
                          padding: "2px 7px", borderRadius: 8, fontWeight: 600,
                        }}>€</span>
                      )}
                    </div>
                    <p style={{ margin: "5px 0 0", fontSize: 12, color: "#7B7060", lineHeight: 1.45 }}>{act.desc}</p>

                    {/* Vote buttons */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap" as const }}>
                      <button
                        className="vote-btn"
                        onClick={() => vote(act.id, myVote === "yes" ? null : "yes")}
                        style={{
                          padding: "6px 16px", borderRadius: 6, fontSize: 12,
                          fontWeight: 600, cursor: "pointer",
                          background: myVote === "yes" ? "#5B8C5A" : "transparent",
                          border: `1px solid ${myVote === "yes" ? "#5B8C5A" : "#3A3228"}`,
                          color: myVote === "yes" ? "#fff" : "#7B7060",
                        }}>
                        👍 {myVote === "yes" ? "¡SÍ!" : "Sí"}
                      </button>
                      <button
                        className="vote-btn"
                        onClick={() => vote(act.id, myVote === "no" ? null : "no")}
                        style={{
                          padding: "6px 16px", borderRadius: 6, fontSize: 12,
                          fontWeight: 600, cursor: "pointer",
                          background: myVote === "no" ? "#8B4A3A" : "transparent",
                          border: `1px solid ${myVote === "no" ? "#8B4A3A" : "#3A3228"}`,
                          color: myVote === "no" ? "#fff" : "#7B7060",
                        }}>
                        👎 {myVote === "no" ? "NO" : "No"}
                      </button>

                      {/* Show results */}
                      {showResults && (counts.yes.length > 0 || counts.no.length > 0) && (
                        <div style={{ display: "flex", gap: 5, marginLeft: 4, flexWrap: "wrap" as const, alignItems: "center" }}>
                          {counts.yes.map(m => (
                            <span key={m} title={`${m} votó SÍ`} style={{
                              fontSize: 10, padding: "2px 7px", borderRadius: 10,
                              background: `${MEMBER_COLORS[m]}20`, color: MEMBER_COLORS[m],
                              fontWeight: 600, border: `1px solid ${MEMBER_COLORS[m]}30`,
                            }}>{MEMBER_EMOJIS[m]} {m} ✓</span>
                          ))}
                          {counts.no.map(m => (
                            <span key={m} title={`${m} votó NO`} style={{
                              fontSize: 10, padding: "2px 7px", borderRadius: 10,
                              background: "#8B4A3A15", color: "#8B6B60",
                              fontWeight: 600, border: "1px solid #8B4A3A20",
                              textDecoration: "line-through",
                            }}>{MEMBER_EMOJIS[m]} {m}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Day nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12 }}>
          {selectedDay > 0 ? (
            <button onClick={() => setSelectedDay(selectedDay - 1)} style={{
              padding: "10px 20px", borderRadius: 8, fontSize: 12,
              background: "transparent", border: "1px solid #3A3228",
              color: "#8B7D6B", cursor: "pointer", letterSpacing: 1,
            }}>← {DAYS[selectedDay - 1].date}</button>
          ) : <div />}
          {selectedDay < DAYS.length - 1 ? (
            <button onClick={() => setSelectedDay(selectedDay + 1)} style={{
              padding: "10px 20px", borderRadius: 8, fontSize: 12,
              background: `${DAYS[selectedDay + 1].color}15`,
              border: `1px solid ${DAYS[selectedDay + 1].color}40`,
              color: DAYS[selectedDay + 1].color, cursor: "pointer",
              letterSpacing: 1,
            }}>{DAYS[selectedDay + 1].date} →</button>
          ) : <div />}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 32, padding: "20px 0", borderTop: "1px solid #1E1A16",
          fontSize: 12, color: "#4A4036", lineHeight: 1.6,
        }}>
          <p style={{ margin: "0 0 6px" }}>
            <strong style={{ color: "#6B6058" }}>¿Cómo funciona?</strong> Navega cada día y vota 👍 o 👎 en cada actividad.
            Tus votos se guardan automáticamente. Pulsa "Ver Todos" para ver qué votó cada uno.
            Cuando todos hayan votado, Ben compilará los resultados y creará el itinerario final.
          </p>
          <p style={{ margin: 0, color: "#3A3228" }}>
            <span style={{ color: "#5B8C5A" }}>VERDE</span> = gratis ·
            <span style={{ color: "#C4956A" }}> DORADO</span> = tiene coste ·
            <span style={{ color: "#C75B39" }}> VIAJE</span> = día de excursión (Abr 3-6)
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main App ────────────────────────── */

export default function Home() {
  const [stage, setStage] = useState<"password" | "member" | "voting">("password");
  const [member, setMember] = useState<string | null>(null);

  return stage === "password" ? (
    <PasswordGate onPass={() => setStage("member")} />
  ) : stage === "member" ? (
    <MemberSelect onSelect={(m) => { setMember(m); setStage("voting"); }} />
  ) : member ? (
    <VotingApp member={member} onSwitchMember={() => { setMember(null); setStage("member"); }} />
  ) : null;
}
