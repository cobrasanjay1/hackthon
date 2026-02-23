import React, { useState } from 'react';
import { Settings, Shield, Lock, Bell, Save, RefreshCw, Smartphone, Key, Info, Terminal, Globe, Zap } from 'lucide-react';

export default function SettingsPage() {
    const [critical, setCritical] = useState(85);
    const [warning, setWarning] = useState(60);
    const [notifs, setNotifs] = useState({ email: true, sms: true, push: false });
    const [mqtt, setMqtt] = useState('');

    function toggle(key) { setNotifs(n => ({ ...n, [key]: !n[key] })); }

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <div className="page-header__eyebrow"><Settings size={12} /> Global Configuration</div>
                    <h1 className="page-header__title">System Settings</h1>
                </div>
                <div className="header-actions">
                    <button className="btn btn--outline"><RefreshCw size={14} /> Reset Defaults</button>
                    <button className="btn btn--primary"><Save size={14} /> Commit Changes</button>
                </div>
            </header>

            <div className="dashboard-layout" style={{ gridTemplateColumns: '1fr 380px' }}>
                {/* Left */}
                <div className="primary-view">
                    {/* Thresholds */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--c-border)', marginBottom: '2rem' }}>
                            <div style={{ width: 40, height: 40, background: 'rgba(240,82,82,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Shield size={20} style={{ color: 'var(--c-red)' }} />
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.05rem' }}>Risk Threshold Calibration</div>
                                <div style={{ fontSize: '0.73rem', color: 'var(--c-text-mute)', marginTop: 3 }}>Define water-level percentages that trigger municipal alerts.</div>
                            </div>
                        </div>

                        {/* Critical slider */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.85rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Critical Alert Threshold</label>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--c-text-mute)', marginTop: 3 }}>Triggers city-wide evacuation protocol.</p>
                                </div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--c-red)', lineHeight: 1 }}>{critical}%</span>
                            </div>
                            <input type="range" min={70} max={95} value={critical} onChange={e => setCritical(+e.target.value)}
                                style={{ width: '100%', accentColor: 'var(--c-red)', cursor: 'pointer' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--c-text-mute)', marginTop: 6 }}>
                                <span>70%</span><span>95%</span>
                            </div>
                        </div>

                        {/* Warning slider */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.85rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Advisory Alert Threshold</label>
                                    <p style={{ fontSize: '0.72rem', color: 'var(--c-text-mute)', marginTop: 3 }}>Triggers municipal preparedness procedures.</p>
                                </div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--c-amber)', lineHeight: 1 }}>{warning}%</span>
                            </div>
                            <input type="range" min={40} max={69} value={warning} onChange={e => setWarning(+e.target.value)}
                                style={{ width: '100%', accentColor: 'var(--c-amber)', cursor: 'pointer' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--c-text-mute)', marginTop: 6 }}>
                                <span>40%</span><span>69%</span>
                            </div>
                        </div>
                    </div>

                    {/* API / Connectivity */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--c-border)', marginBottom: '2rem' }}>
                            <div style={{ width: 40, height: 40, background: 'rgba(79,142,247,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Lock size={20} style={{ color: 'var(--c-accent)' }} />
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.05rem' }}>Security & Connectivity</div>
                                <div style={{ fontSize: '0.73rem', color: 'var(--c-text-mute)', marginTop: 3 }}>Manage API keys and broker endpoints.</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label>Cloud Integration Key (AES-256)</label>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ flex: 1, position: 'relative' }}>
                                        <input type="password" defaultValue="********************************" style={{ paddingRight: '2.5rem' }} />
                                        <Key size={13} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text-mute)' }} />
                                    </div>
                                    <button type="button" className="btn btn--outline" style={{ padding: '0.7rem 1rem', flexShrink: 0 }}>
                                        <RefreshCw size={14} />
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>MQTT Local Broker URI</label>
                                <div style={{ position: 'relative' }}>
                                    <Terminal size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-accent)' }} />
                                    <input type="text" placeholder="mqtt://192.168.1.100:1883" value={mqtt} onChange={e => setMqtt(e.target.value)}
                                        style={{ paddingLeft: '2.25rem' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="secondary-view">
                    <div className="glass-panel" style={{ padding: '1.75rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, marginBottom: '1.25rem' }}>Notifications</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {[
                                { key: 'email', label: 'Email Reports', sub: 'Daily system digest', Icon: Globe },
                                { key: 'sms', label: 'SMS Dispatch', sub: 'Immediate critical alerts', Icon: Smartphone },
                                { key: 'push', label: 'Push Alerts', sub: 'Mobile app notifications', Icon: Bell },
                            ].map(({ key, label, sub, Icon }) => (
                                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--r-md)', border: '1px solid var(--c-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Icon size={17} style={{ color: 'var(--c-text-mute)' }} />
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{label}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--c-text-mute)' }}>{sub}</div>
                                        </div>
                                    </div>
                                    {/* Toggle */}
                                    <div
                                        onClick={() => toggle(key)}
                                        style={{ width: 42, height: 23, borderRadius: 99, background: notifs[key] ? 'var(--c-accent)' : 'rgba(255,255,255,0.08)', position: 'relative', cursor: 'pointer', transition: 'background 0.25s', flexShrink: 0 }}
                                    >
                                        <div style={{ width: 17, height: 17, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: notifs[key] ? 22 : 3, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="ai-report-box" style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--c-accent)', marginBottom: '0.85rem' }}>
                                <Info size={14} />
                                <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>System Core</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
                                {[
                                    ['Stack', 'v2.8.4-stable'],
                                    ['Calibration', '0.02ms delta'],
                                    ['ML Engine', 'RF v4-Alpha'],
                                    ['Last sync', new Date().toLocaleDateString()],
                                ].map(([k, v]) => (
                                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--c-text-mute)' }}>{k}</span>
                                        <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{v}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
