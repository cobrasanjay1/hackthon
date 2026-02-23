import React from 'react';
import { AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { BarChart3, TrendingUp, CloudRain, CheckCircle2, Calendar, Download, Info } from 'lucide-react';

const WEEKLY = [
    { day: 'Mon', level: 45, rain: 10 },
    { day: 'Tue', level: 52, rain: 25 },
    { day: 'Wed', level: 88, rain: 65 },
    { day: 'Thu', level: 65, rain: 40 },
    { day: 'Fri', level: 48, rain: 15 },
    { day: 'Sat', level: 35, rain: 5 },
    { day: 'Sun', level: 42, rain: 12 },
];

const REGIONAL = [
    { name: 'Beach', val: 45 },
    { name: 'Mavoor', val: 78 },
    { name: 'Kallai', val: 94 },
    { name: 'Medical', val: 32 },
    { name: 'Kommeri', val: 41 },
];

const SEVERITY = [
    { label: 'Critical', pct: 12, color: 'var(--c-red)' },
    { label: 'Warning', pct: 25, color: 'var(--c-amber)' },
    { label: 'Normal', pct: 63, color: 'var(--c-green)' },
];

const TT = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'rgba(12,17,32,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', fontSize: '0.78rem' }}>
            <div style={{ color: 'var(--c-text-mute)', marginBottom: 6, fontWeight: 700 }}>{label}</div>
            {payload.map(p => (
                <div key={p.dataKey} style={{ color: p.color || 'var(--c-text)', fontWeight: 600 }}>{p.name}: {Math.round(p.value)}</div>
            ))}
        </div>
    );
};

export default function Analytics() {
    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <div className="page-header__eyebrow"><BarChart3 size={12} /> Historical Trends & Statistical Intelligence</div>
                    <h1 className="page-header__title">Data Analytics</h1>
                </div>
                <div className="header-actions">
                    <button className="btn btn--outline"><Calendar size={14} /> Date Range</button>
                    <button className="btn btn--primary"><Download size={14} /> Export CSV</button>
                </div>
            </header>

            {/* 3-col stats */}
            <div className="stats-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="stat-card">
                    <div className="stat-card__icon" style={{ background: 'rgba(79,142,247,0.12)', color: 'var(--c-accent)' }}><TrendingUp size={20} /></div>
                    <div className="stat-card__body">
                        <span className="stat-card__label">Peak Level (30d)</span>
                        <span className="stat-card__value">94.2<span style={{ fontSize: '1rem' }}>%</span></span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__icon" style={{ background: 'rgba(167,139,250,0.12)', color: 'var(--c-purple)' }}><CloudRain size={20} /></div>
                    <div className="stat-card__body">
                        <span className="stat-card__label">Total Rainfall</span>
                        <span className="stat-card__value">172<span style={{ fontSize: '1rem' }}>mm</span></span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__icon" style={{ background: 'rgba(16,217,160,0.12)', color: 'var(--c-green)' }}><CheckCircle2 size={20} /></div>
                    <div className="stat-card__body">
                        <span className="stat-card__label">Prediction Yield</span>
                        <span className="stat-card__value">98.4<span style={{ fontSize: '1rem' }}>%</span></span>
                    </div>
                </div>
            </div>

            {/* Charts layout */}
            <div className="dashboard-layout">
                <div className="primary-view">
                    {/* Area chart */}
                    <div className="glass-panel" style={{ padding: '1.75rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700 }}>Weekly Risk vs Rainfall</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--c-text-mute)', marginTop: 4 }}>7-day water level and rainfall correlation</p>
                        </div>
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={WEEKLY}>
                                <defs>
                                    <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--c-accent)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--c-accent)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--c-text-mute)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--c-text-mute)' }} />
                                <Tooltip content={<TT />} />
                                <Area type="monotone" dataKey="level" name="Water Level" stroke="var(--c-accent)" fill="url(#gL)" strokeWidth={2.5} />
                                <Line type="monotone" dataKey="rain" name="Rainfall" stroke="var(--c-purple)" strokeWidth={2} dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar chart */}
                    <div className="glass-panel" style={{ padding: '1.75rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700 }}>Regional Peak Comparison</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--c-text-mute)', marginTop: 4 }}>Max flood sensor readings per zone</p>
                        </div>
                        <ResponsiveContainer width="100%" height={230}>
                            <BarChart data={REGIONAL} barSize={38}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--c-text-mute)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--c-text-mute)' }} />
                                <Tooltip content={<TT />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                                <Bar dataKey="val" name="Level %" radius={[6, 6, 0, 0]}>
                                    {REGIONAL.map((_, i) => (
                                        <Cell key={i} fill={i === 2 ? 'var(--c-red)' : 'var(--c-accent)'} fillOpacity={0.8} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="secondary-view">
                    <div className="glass-panel" style={{ padding: '1.75rem', flex: 1 }}>
                        <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, marginBottom: '1.5rem' }}>Incident Distribution</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {SEVERITY.map(s => (
                                <div key={s.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.6rem' }}>
                                        <span style={{ fontWeight: 600 }}>{s.label}</span>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{s.pct}%</span>
                                    </div>
                                    <div style={{ height: 7, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 99, transition: 'width 1.2s ease' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="ai-report-box" style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--c-accent)', marginBottom: '0.75rem' }}>
                                <Info size={14} />
                                <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Forensic Insight</span>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: 'var(--c-text-dim)', lineHeight: 1.6 }}>
                                Kallai Bridge risk is trending <span className="highlight" style={{ color: 'var(--c-red)' }}>14% above</span> the 5-year average for this precipitation bracket. Recommend pre-emptive drainage activation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
