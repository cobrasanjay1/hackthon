import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Radio, Droplets, AlertTriangle, CheckCircle, TrendingUp, Activity, Download } from 'lucide-react';

/* ── Local Kozhikode sensor nodes ────────────────────────── */
const SENSORS = [
    { id: 1, name: 'Kozhikode Beach', lat: 11.2588, lng: 75.7704, level: 42, rain: 12, risk: 'LOW' },
    { id: 2, name: 'Mavoor Road Jn.', lat: 11.2588, lng: 75.7891, level: 78, rain: 48, risk: 'MEDIUM' },
    { id: 3, name: 'Kallai Bridge', lat: 11.2330, lng: 75.8010, level: 94, rain: 82, risk: 'HIGH' },
    { id: 4, name: 'Medical College', lat: 11.2683, lng: 75.8365, level: 22, rain: 8, risk: 'LOW' },
    { id: 5, name: 'Kommeri Res.', lat: 11.2450, lng: 75.8150, level: 38, rain: 15, risk: 'LOW' },
];

/* ── Kerala-wide flood hotspots for heatmap view ─────────── */
const KERALA_HEATMAP = [
    // District centres + major flood-prone areas
    // Alappuzha (very high flood risk)
    { name: 'Alappuzha — Kuttanad', lat: 9.4981, lng: 76.3388, intensity: 95, dist: 'Alappuzha' },
    { name: 'Cherthala', lat: 9.6833, lng: 76.3342, intensity: 80, dist: 'Alappuzha' },
    { name: 'Harippad', lat: 9.2782, lng: 76.4707, intensity: 78, dist: 'Alappuzha' },
    // Ernakulam
    { name: 'Periyar River Basin', lat: 10.0449, lng: 76.3524, intensity: 72, dist: 'Ernakulam' },
    { name: 'Aluva', lat: 10.1007, lng: 76.3570, intensity: 68, dist: 'Ernakulam' },
    { name: 'Kakkanad', lat: 10.0131, lng: 76.4019, intensity: 45, dist: 'Ernakulam' },
    // Thrissur
    { name: 'Chalakudy River', lat: 10.3015, lng: 76.3322, intensity: 70, dist: 'Thrissur' },
    { name: 'Thrissur City', lat: 10.5276, lng: 76.2144, intensity: 50, dist: 'Thrissur' },
    // Kozhikode
    { name: 'Kallai Bridge', lat: 11.2330, lng: 75.8010, intensity: 94, dist: 'Kozhikode' },
    { name: 'Mavoor', lat: 11.2650, lng: 75.8950, intensity: 78, dist: 'Kozhikode' },
    { name: 'Kozhikode Beach', lat: 11.2588, lng: 75.7704, intensity: 42, dist: 'Kozhikode' },
    // Malappuram
    { name: 'Bharathapuzha', lat: 10.9693, lng: 76.2155, intensity: 65, dist: 'Malappuram' },
    { name: 'Tirur', lat: 10.9140, lng: 75.9227, intensity: 60, dist: 'Malappuram' },
    { name: 'Perinthalmanna', lat: 10.9785, lng: 76.2262, intensity: 55, dist: 'Malappuram' },
    // Palakkad
    { name: 'Palakkad Town', lat: 10.7867, lng: 76.6548, intensity: 48, dist: 'Palakkad' },
    { name: 'Chittur', lat: 10.6933, lng: 76.7431, intensity: 40, dist: 'Palakkad' },
    // Wayanad
    { name: 'Kalpetta', lat: 11.6085, lng: 76.0821, intensity: 58, dist: 'Wayanad' },
    { name: 'Mananthavady', lat: 11.8014, lng: 76.0048, intensity: 62, dist: 'Wayanad' },
    // Kannur
    { name: 'Kannur City', lat: 11.8745, lng: 75.3704, intensity: 52, dist: 'Kannur' },
    { name: 'Thalassery', lat: 11.7503, lng: 75.4892, intensity: 48, dist: 'Kannur' },
    // Kasaragod
    { name: 'Kasaragod Town', lat: 12.4996, lng: 74.9869, intensity: 38, dist: 'Kasaragod' },
    { name: 'Kanhangad', lat: 12.3476, lng: 75.0931, intensity: 42, dist: 'Kasaragod' },
    // Pathanamthitta
    { name: 'Pamba River', lat: 9.3885, lng: 76.7730, intensity: 85, dist: 'Pathanamthitta' },
    { name: 'Thiruvalla', lat: 9.3820, lng: 76.5734, intensity: 68, dist: 'Pathanamthitta' },
    // Kollam
    { name: 'Ashtamudi Lake', lat: 8.9003, lng: 76.5820, intensity: 62, dist: 'Kollam' },
    { name: 'Kollam City', lat: 8.8932, lng: 76.6141, intensity: 55, dist: 'Kollam' },
    // Thiruvananthapuram
    { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366, intensity: 30, dist: 'Thiruvananthapuram' },
    { name: 'Neyyar River', lat: 8.5080, lng: 77.0985, intensity: 38, dist: 'Thiruvananthapuram' },
    // Kottayam
    { name: 'Meenachil River', lat: 9.5916, lng: 76.5222, intensity: 72, dist: 'Kottayam' },
    { name: 'Kottayam City', lat: 9.5916, lng: 76.5222, intensity: 65, dist: 'Kottayam' },
    // Idukki
    { name: 'Periyar — Idukki', lat: 9.9189, lng: 77.0890, intensity: 55, dist: 'Idukki' },
    // Palakkad Gap area
    { name: 'Silent Valley', lat: 11.0818, lng: 76.4529, intensity: 50, dist: 'Palakkad' },
];

const LOGS = [
    { id: 1, time: '12:02:14', text: 'Sensor 3 (Kallai) water level > 90%', type: 'critical' },
    { id: 2, time: '12:02:45', text: 'AI risk model updated → Kallai: HIGH', type: 'warning' },
    { id: 3, time: '12:03:00', text: 'Municipal alert dispatched (ID #0292)', type: 'action' },
    { id: 4, time: '12:05:12', text: 'Satellite weather sync complete', type: 'info' },
    { id: 5, time: '12:07:31', text: 'Rainfall model retrained on 48h data', type: 'info' },
];

const RISK_COLOR = { HIGH: 'var(--c-red)', MEDIUM: 'var(--c-amber)', LOW: 'var(--c-green)' };
const BADGE_CLS = { HIGH: 'badge--danger', MEDIUM: 'badge--warning', LOW: 'badge--safe' };
const BADGE_TEXT = { HIGH: 'Critical', MEDIUM: 'Warning', LOW: 'Normal' };

/* Map colours for heatmap intensity (0–100) */
function heatColor(intensity) {
    if (intensity >= 80) return '#f05252'; // red
    if (intensity >= 60) return '#f59e0b'; // amber
    if (intensity >= 40) return '#3b82f6'; // blue
    return '#10d9a0';                       // green
}

function heatLabel(intensity) {
    if (intensity >= 80) return 'CRITICAL';
    if (intensity >= 60) return 'HIGH';
    if (intensity >= 40) return 'MEDIUM';
    return 'LOW';
}

function genChart() {
    return Array.from({ length: 14 }, (_, i) => ({
        t: `${i}:00`,
        level: 40 + Math.random() * 45,
        rain: 5 + Math.random() * 20,
    }));
}

function MapUpdater({ center, zoom }) {
    const map = useMap();
    useEffect(() => { map.setView(center, zoom, { animate: true }); }, [center, zoom, map]);
    return null;
}

const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'rgba(12,17,32,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', fontSize: '0.78rem' }}>
            <div style={{ color: 'var(--c-text-mute)', marginBottom: 6, fontWeight: 700 }}>{label}</div>
            {payload.map(p => (
                <div key={p.dataKey} style={{ color: p.color, fontWeight: 700 }}>
                    {p.name}: {Math.round(p.value)}{p.dataKey === 'level' ? '%' : 'mm'}
                </div>
            ))}
        </div>
    );
};

/* ── Heatmap Legend ─────────────────────────────────────── */
function HeatLegend() {
    return (
        <div style={{
            position: 'absolute', bottom: 24, left: 16, zIndex: 500,
            background: 'rgba(5,8,17,0.9)', border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)', borderRadius: 12, padding: '12px 16px',
            display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160,
        }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
                Flood Risk Index
            </div>
            {[
                { color: '#f05252', label: 'Critical  ≥ 80%' },
                { color: '#f59e0b', label: 'High      ≥ 60%' },
                { color: '#3b82f6', label: 'Medium    ≥ 40%' },
                { color: '#10d9a0', label: 'Low       < 40%' },
            ].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, opacity: 0.85, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{label}</span>
                </div>
            ))}
        </div>
    );
}

export default function Dashboard() {
    const [sensors, setSensors] = useState(SENSORS);
    const [selId, setSelId] = useState(3);
    const [mapTab, setMapTab] = useState('geo');   // 'geo' | 'heat'
    const [sideTab, setSideTab] = useState('nodes');
    const [chart, setChart] = useState(genChart);

    // Map view state driven by tab
    const geoCenter = [11.245, 75.8];
    const heatCenter = [10.85, 76.27];  // central Kerala

    const sel = sensors.find(s => s.id === selId) || sensors[0];

    useEffect(() => {
        const t = setInterval(() => {
            setSensors(prev => prev.map(s => {
                const lvl = Math.max(0, Math.min(100, s.level + (Math.random() * 4 - 2)));
                const risk = lvl > 85 ? 'HIGH' : lvl > 60 ? 'MEDIUM' : 'LOW';
                return { ...s, level: Math.round(lvl), risk };
            }));
            setChart(prev => [
                ...prev.slice(1),
                { t: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), level: sel.level, rain: sel.rain },
            ]);
        }, 4000);
        return () => clearInterval(t);
    }, [sel.level, sel.rain]);

    const highRisk = sensors.filter(s => s.risk === 'HIGH').length;
    const avgLevel = Math.round(sensors.reduce((a, s) => a + s.level, 0) / sensors.length);

    function selectSensor(s) { setSelId(s.id); }

    return (
        <div className="page-container">
            {/* ── Header ── */}
            <header className="page-header">
                <div>
                    <div className="page-header__eyebrow">
                        <span className="pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--c-accent)', display: 'inline-block' }} />
                        Live Intelligence · Kerala Flood Network
                    </div>
                    <h1 className="page-header__title">Flood Command Center</h1>
                </div>
                <div className="header-actions">
                    <div className="confidence-pill">
                        <span>AI Confidence</span>
                        <strong>94.2%</strong>
                    </div>
                    <button className="btn btn--outline"><Download size={14} /> Export</button>
                </div>
            </header>

            {/* ── Stat Cards ── */}
            <div className="stats-row">
                <div className="stat-card stat-card--blue">
                    <div className="stat-card__icon"><Droplets size={20} /></div>
                    <div className="stat-card__body">
                        <span className="stat-card__label">Water Avg</span>
                        <span className="stat-card__value">{avgLevel}<span style={{ fontSize: '1rem' }}>%</span></span>
                    </div>
                </div>
                <div className="stat-card stat-card--red">
                    <div className="stat-card__icon"><AlertTriangle size={20} /></div>
                    <div className="stat-card__body">
                        <span className="stat-card__label">Active Alerts</span>
                        <span className="stat-card__value">{highRisk}</span>
                    </div>
                </div>
                <div className="stat-card stat-card--purple">
                    <div className="stat-card__icon"><TrendingUp size={20} /></div>
                    <div className="stat-card__body">
                        <span className="stat-card__label">Weekly Rain</span>
                        <span className="stat-card__value">172<span style={{ fontSize: '1rem' }}>mm</span></span>
                    </div>
                </div>
                <div className="stat-card stat-card--green">
                    <div className="stat-card__icon"><CheckCircle size={20} /></div>
                    <div className="stat-card__body">
                        <span className="stat-card__label">Uptime</span>
                        <span className="stat-card__value">99.9<span style={{ fontSize: '1rem' }}>%</span></span>
                    </div>
                </div>
            </div>

            {/* ── Main Grid ── */}
            <div className="dashboard-layout" style={{ flex: 1, minHeight: 0 }}>
                <div className="primary-view">

                    {/* ── Map Panel ── */}
                    <div className="glass-panel" style={{ height: 420, position: 'relative' }}>
                        <div className="panel-header">
                            <div className="tabs">
                                <button
                                    className={`tab${mapTab === 'geo' ? ' active' : ''}`}
                                    onClick={() => setMapTab('geo')}
                                >
                                    Geo-Spatial
                                </button>
                                <button
                                    className={`tab${mapTab === 'heat' ? ' active' : ''}`}
                                    onClick={() => setMapTab('heat')}
                                >
                                    Kerala Heatmap
                                </button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.68rem', fontWeight: 800, color: 'var(--c-accent)' }}>
                                <span className="pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-accent)', display: 'inline-block' }} />
                                {mapTab === 'geo' ? 'LIVE STREAM' : `${KERALA_HEATMAP.length} ZONES MAPPED`}
                            </div>
                        </div>

                        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                            <MapContainer
                                center={geoCenter}
                                zoom={14}
                                zoomControl={true}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

                                {mapTab === 'geo' ? (
                                    <>
                                        <MapUpdater center={geoCenter} zoom={14} />
                                        {sensors.map(s => (
                                            <CircleMarker
                                                key={s.id}
                                                center={[s.lat, s.lng]}
                                                radius={s.risk === 'HIGH' ? 20 : 13}
                                                pathOptions={{
                                                    color: RISK_COLOR[s.risk],
                                                    fillColor: RISK_COLOR[s.risk],
                                                    fillOpacity: 0.35,
                                                    weight: 2,
                                                }}
                                                eventHandlers={{ click: () => selectSensor(s) }}
                                            >
                                                <Popup>
                                                    <div style={{ background: 'rgba(12,17,32,0.98)', color: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem' }}>
                                                        <strong style={{ display: 'block', marginBottom: 4 }}>{s.name}</strong>
                                                        Level: {s.level}% · {BADGE_TEXT[s.risk]}
                                                    </div>
                                                </Popup>
                                            </CircleMarker>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <MapUpdater center={heatCenter} zoom={7} />
                                        {KERALA_HEATMAP.map((pt, i) => (
                                            <CircleMarker
                                                key={i}
                                                center={[pt.lat, pt.lng]}
                                                radius={10 + pt.intensity * 0.18}
                                                pathOptions={{
                                                    color: heatColor(pt.intensity),
                                                    fillColor: heatColor(pt.intensity),
                                                    fillOpacity: 0.32 + pt.intensity * 0.003,
                                                    weight: 1.5,
                                                }}
                                            >
                                                <Popup>
                                                    <div style={{ background: 'rgba(12,17,32,0.98)', color: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem', minWidth: 190 }}>
                                                        <strong style={{ display: 'block', marginBottom: 4 }}>{pt.name}</strong>
                                                        <div style={{ color: heatColor(pt.intensity), fontWeight: 800 }}>{heatLabel(pt.intensity)}</div>
                                                        <div style={{ fontSize: '0.75rem', marginTop: 4, color: 'rgba(255,255,255,0.6)' }}>District: {pt.dist}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Risk Index: {pt.intensity}%</div>
                                                    </div>
                                                </Popup>
                                            </CircleMarker>
                                        ))}
                                    </>
                                )}
                            </MapContainer>

                            {/* Legend overlay for heatmap only */}
                            {mapTab === 'heat' && <HeatLegend />}
                        </div>
                    </div>

                    {/* ── Temporal Chart ── */}
                    <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, minHeight: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Activity size={16} style={{ color: 'var(--c-accent)' }} />
                                <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem' }}>
                                    Temporal Intelligence: {sel.name}
                                </span>
                            </div>
                            <div className="tabs">
                                <button className="tab active" style={{ fontSize: '0.72rem', padding: '0.3rem 0.7rem' }}>1h</button>
                                <button className="tab" style={{ fontSize: '0.72rem', padding: '0.3rem 0.7rem' }}>24h</button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={chart}>
                                <defs>
                                    <linearGradient id="gLevel" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f8ef7" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#4f8ef7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                                <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--c-text-mute)' }} interval="preserveStartEnd" />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--c-text-mute)' }} domain={[0, 100]} />
                                <Tooltip content={<ChartTooltip />} />
                                <Area type="monotone" dataKey="level" name="Water Level" stroke="#4f8ef7" fill="url(#gLevel)" strokeWidth={2.5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ── Right: Nodes / Logs sidebar ── */}
                <div className="secondary-view">
                    <div className="glass-panel" style={{ flex: 1 }}>
                        <div className="tab-nav">
                            <button className={sideTab === 'nodes' ? 'active' : ''} onClick={() => setSideTab('nodes')}>Nodes</button>
                            <button className={sideTab === 'logs' ? 'active' : ''} onClick={() => setSideTab('logs')}>SysLogs</button>
                        </div>
                        <div className="tab-body">
                            {sideTab === 'nodes' ? (
                                <div className="node-list">
                                    {sensors.map(s => (
                                        <div
                                            key={s.id}
                                            className={`node-item${s.id === selId ? ' selected' : ''}`}
                                            onClick={() => selectSensor(s)}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                                <span style={{ fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.3 }}>{s.name}</span>
                                                <span className={`badge ${BADGE_CLS[s.risk]}`}>{BADGE_TEXT[s.risk]}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${s.level}%`, background: RISK_COLOR[s.risk], borderRadius: 99, transition: 'width 1s ease' }} />
                                                </div>
                                                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: 36, textAlign: 'right' }}>{s.level}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="log-viewer">
                                    {LOGS.map(l => (
                                        <div key={l.id} className={`log-entry ${l.type}`}>
                                            <span className="l-time">{l.time}</span>
                                            {l.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--c-border)' }}>
                            <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                                <Download size={13} /> Full System Audit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
