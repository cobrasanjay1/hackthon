import React, { useState } from 'react';
import { Cpu, Radio, CheckCircle2, Zap, RefreshCw, Binary, AlertCircle } from 'lucide-react';

const STEPS = [
    { n: 1, title: 'Power on the ESP32 Node', desc: 'Connect device to a 5V USB source. The blue status LED will blink every 2 seconds when ready.' },
    { n: 2, title: 'Enter Device Credentials', desc: 'Locate the Serial ID sticker on the hardware enclosure and enter it below along with your protocol.' },
    { n: 3, title: 'Network Handshake', desc: 'The system registers GPS coordinates, syncs RTC, and provisions MQTT topics automatically.' },
];

const STATUS_MSGS = ['', 'Validating Serial ID…', 'Syncing RTC Clock…', 'Provisioning MQTT Broker…'];

export default function Hardware() {
    const [step, setStep] = useState(0);
    const [connecting, setConn] = useState(false);
    const [serialId, setSerialId] = useState('');
    const [protocol, setProtocol] = useState('wifi');

    function handleConnect(e) {
        e.preventDefault();
        setConn(true);
        setStep(1);
        setTimeout(() => setStep(2), 2000);
        setTimeout(() => setStep(3), 4000);
        setTimeout(() => { setConn(false); setStep(4); }, 6000);
    }

    function reset() { setStep(0); setConn(false); setSerialId(''); }

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <div className="page-header__eyebrow"><Cpu size={12} /> IoT Node Provisioning</div>
                    <h1 className="page-header__title">Edge Hardware Config</h1>
                </div>
                <div className="header-actions">
                    <button className="btn btn--outline"><RefreshCw size={14} /> Refresh Fleet</button>
                    <button className="btn btn--primary"><Zap size={14} /> OTA Update All</button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', flex: 1, minHeight: 0 }}>
                {/* Left: Steps + Form */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--c-border)' }}>
                        <div style={{ width: 42, height: 42, background: 'rgba(79,142,247,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent)' }}>
                            <Binary size={22} />
                        </div>
                        <div>
                            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem' }}>Register New IoT Sensor</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--c-text-mute)', marginTop: 3 }}>Follow the three steps below to add a node to the mesh.</div>
                        </div>
                    </div>

                    {/* Steps */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {STEPS.map(s => (
                            <div key={s.n} style={{ display: 'flex', gap: '1rem', padding: '1.1rem 1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--c-border)', borderRadius: 'var(--r-lg)', alignItems: 'flex-start' }}>
                                <div style={{ width: 28, height: 28, background: step >= s.n ? 'var(--c-green)' : 'var(--c-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#fff', flexShrink: 0, marginTop: 1, transition: 'background 0.4s' }}>
                                    {step > s.n ? '✓' : s.n}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 4 }}>{s.title}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--c-text-mute)', lineHeight: 1.5 }}>{s.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleConnect} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            <div className="form-group">
                                <label>Device Serial ID</label>
                                <input type="text" placeholder="e.g. AG-KOZ-092-X" value={serialId} onChange={e => setSerialId(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Transmission Protocol</label>
                                <select value={protocol} onChange={e => setProtocol(e.target.value)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--c-border)', borderRadius: 'var(--r-md)', padding: '0.7rem 1rem', color: 'var(--c-text)', fontSize: '0.88rem', outline: 'none' }}>
                                    <option value="wifi">WiFi — Static IP</option>
                                    <option value="lora">LoRaWAN — Gateway</option>
                                    <option value="gsm">GSM / LTE-M</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={connecting || step === 4}
                            style={{ justifyContent: 'center', padding: '0.85rem', fontSize: '0.9rem' }}
                        >
                            {connecting
                                ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', display: 'inline-block' }} /> Establishing Link…</>
                                : step === 4 ? '✓ Device Registered' : 'Authenticate & Connect Node'
                            }
                        </button>
                    </form>
                </div>

                {/* Right: Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ flex: 1, padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, marginBottom: '1.5rem' }}>Connection Status</h3>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 'var(--r-lg)', background: 'rgba(0,0,0,0.15)', padding: '2rem', textAlign: 'center', minHeight: 200 }}>
                            {step === 0 && !connecting && (
                                <>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                        <Radio size={30} style={{ color: 'var(--c-text-mute)' }} />
                                    </div>
                                    <div style={{ fontWeight: 600, color: 'var(--c-text-dim)', marginBottom: 6 }}>Awaiting device</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--c-text-mute)' }}>Fill in the form and submit to begin provisioning.</div>
                                </>
                            )}
                            {connecting && (
                                <>
                                    <div style={{ width: 56, height: 56, border: '3px solid rgba(79,142,247,0.15)', borderTopColor: 'var(--c-accent)', borderRadius: '50%', animation: 'spin 1.2s linear infinite', marginBottom: '1.5rem' }} />
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{STATUS_MSGS[step]}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--c-text-mute)' }}>Step {step} of 3 — do not unplug device</div>
                                </>
                            )}
                            {step === 4 && !connecting && (
                                <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,217,160,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                                        <CheckCircle2 size={32} style={{ color: 'var(--c-green)' }} />
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--c-green)', marginBottom: 6 }}>Node Registered!</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--c-text-dim)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                                        Device <strong style={{ fontFamily: 'var(--font-mono)' }}>{serialId || 'AG-NEW'}</strong> is now streaming data to the mesh.
                                    </div>
                                    <button className="btn btn--outline btn--sm" onClick={reset}>+ Register Another</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Signal info */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.1rem' }}>
                            <Zap size={14} style={{ color: 'var(--c-accent)' }} />
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Telemetry</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { l: 'Signal Strength', v: '-64 dBm', c: 'var(--c-green)' },
                                { l: 'Battery', v: '98%', c: 'var(--c-green)' },
                                { l: 'Firmware', v: 'v2.0.4', c: 'var(--c-text-dim)' },
                                { l: 'Protocol', v: protocol.toUpperCase(), c: 'var(--c-accent)' },
                            ].map(row => (
                                <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                                    <span style={{ color: 'var(--c-text-mute)' }}>{row.l}</span>
                                    <strong style={{ fontFamily: 'var(--font-mono)', color: row.c }}>{row.v}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
