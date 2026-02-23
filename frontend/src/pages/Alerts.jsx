import React, { useState } from 'react';
import { Bell, ShieldAlert, AlertTriangle, AlertCircle, MapPin, Search, Filter, MoreHorizontal, Smartphone, Globe, ShieldCheck, Check } from 'lucide-react';

const ALERTS = [
    { id: 1, type: 'CRITICAL', title: 'Flood Risk: Kallai Bridge', loc: 'Kallai River Road', time: '2m ago', level: '94%', status: 'active' },
    { id: 2, type: 'WARNING', title: 'Capillary Rise Detected', loc: 'Mavoor Road Junction', time: '14m ago', level: '78%', status: 'acknowledged' },
    { id: 3, type: 'CRITICAL', title: 'Drainage Overload', loc: 'Kozhikode Beach South', time: '1h ago', level: '89%', status: 'resolved' },
    { id: 4, type: 'INFO', title: 'Maintenance Required', loc: 'Medical College Node', time: '3h ago', level: '15%', status: 'acknowledged' },
    { id: 5, type: 'WARNING', title: 'High Rainfall Rate', loc: 'Kommeri Residential', time: '5h ago', level: '62%', status: 'resolved' },
];

const TYPE_MAP = {
    CRITICAL: { icon: ShieldAlert, color: 'var(--c-red)' },
    WARNING: { icon: AlertTriangle, color: 'var(--c-amber)' },
    INFO: { icon: AlertCircle, color: 'var(--c-accent)' },
};

const STATUS_CLS = { active: 'badge--danger', acknowledged: 'badge--warning', resolved: 'badge--safe' };

function TypeIcon({ type }) {
    const { icon: Icon, color } = TYPE_MAP[type] || TYPE_MAP.INFO;
    return <Icon size={20} style={{ color, flexShrink: 0 }} />;
}

export default function Alerts() {
    const [filter, setFilter] = useState('ALL');
    const visible = filter === 'ALL' ? ALERTS : ALERTS.filter(a => a.type === filter);

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <div className="page-header__eyebrow"><Bell size={12} /> Emergency Dispatch & Response</div>
                    <h1 className="page-header__title">Incident Management</h1>
                </div>
                <div className="header-actions">
                    <div className="tabs">
                        <button className={`tab${filter === 'ALL' ? ' active' : ''}`} onClick={() => setFilter('ALL')}>All</button>
                        <button className={`tab${filter === 'CRITICAL' ? ' active' : ''}`} onClick={() => setFilter('CRITICAL')}>Critical</button>
                        <button className={`tab${filter === 'WARNING' ? ' active' : ''}`} onClick={() => setFilter('WARNING')}>Warnings</button>
                    </div>
                    <button className="btn btn--outline"><Check size={14} /> Mark All Read</button>
                </div>
            </header>

            <div className="dashboard-layout">
                {/* Incident table */}
                <div className="primary-view">
                    <div className="glass-panel" style={{ flex: 1 }}>
                        <div className="panel-header">
                            <div className="search-bar" style={{ width: 280, maxWidth: '100%' }}>
                                <Search size={13} style={{ color: 'var(--c-text-mute)', flexShrink: 0 }} />
                                <input type="text" placeholder="Search incidents…" />
                            </div>
                            <button className="btn btn--outline btn--sm"><Filter size={13} /> Filter</button>
                        </div>

                        {/* Table header */}
                        <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr 110px 140px 52px', padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--c-border)', fontSize: '0.65rem', fontWeight: 800, color: 'var(--c-text-mute)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                            <span>Risk</span><span>Incident</span><span>Location</span><span>Time</span><span>Status</span><span />
                        </div>

                        {visible.map(a => (
                            <div key={a.id} className="table-row" style={{ display: 'grid', gridTemplateColumns: '52px 1fr 1fr 110px 140px 52px', padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--c-border)', alignItems: 'center', gap: '0.5rem' }}>
                                <TypeIcon type={a.type} />
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{a.title}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--c-text-mute)', marginTop: 2 }}>Peak: {a.level}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--c-text-dim)', fontSize: '0.82rem' }}>
                                    <MapPin size={12} style={{ color: 'var(--c-accent)', flexShrink: 0 }} /> {a.loc}
                                </div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--c-text-mute)' }}>{a.time}</div>
                                <div><span className={`badge ${STATUS_CLS[a.status]}`}>{a.status}</span></div>
                                <button style={{ background: 'none', border: 'none', color: 'var(--c-text-mute)', cursor: 'pointer', padding: 4 }}><MoreHorizontal size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="secondary-view">
                    <div className="glass-panel" style={{ padding: '1.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <ShieldCheck size={18} style={{ color: 'var(--c-red)' }} />
                            <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700 }}>Action Required</h3>
                        </div>

                        <div style={{ background: 'rgba(240,82,82,0.04)', border: '1px solid rgba(240,82,82,0.12)', borderRadius: 'var(--r-lg)', padding: '1.25rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: 44, height: 44, background: 'rgba(240,82,82,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <ShieldAlert size={22} style={{ color: 'var(--c-red)' }} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 4 }}>Evacuation Protocol</div>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--c-text-dim)', lineHeight: 1.5 }}>AI confidence at Kallai River Bridge has reached 94%. Immediate SMS dispatch advised.</p>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <button className="btn btn--danger" style={{ justifyContent: 'center', fontSize: '0.78rem' }}><Smartphone size={13} /> Execute SMS</button>
                                <button className="btn btn--outline" style={{ justifyContent: 'center', fontSize: '0.78rem' }}>Dismiss</button>
                            </div>
                        </div>

                        <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, marginTop: '1.75rem', marginBottom: '1rem' }}>System Integrity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {[
                                { n: 'Emergency Gateway', s: 'ONLINE', icon: Globe },
                                { n: 'Municipal API', s: 'SECURE', icon: ShieldCheck },
                                { n: 'Sat-Comm Link', s: 'SYNCED', icon: Globe },
                            ].map(item => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '0.9rem 1.1rem', borderRadius: 'var(--r-md)', border: '1px solid var(--c-border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            <Icon size={14} style={{ color: 'var(--c-accent)' }} />
                                            <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>{item.n}</span>
                                        </div>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--c-green)', letterSpacing: '0.05em' }}>{item.s}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
