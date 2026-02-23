import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Waves, LayoutDashboard, FileBarChart, AlertCircle, Cpu, Settings2, Search, Bell, User } from 'lucide-react';
import './index.css';

import Dashboard from './pages/Dashboard';
import Hardware from './pages/Hardware';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

const NAV_ITEMS = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/analytics', icon: FileBarChart, label: 'Analytics' },
    { to: '/alerts', icon: AlertCircle, label: 'Incidents' },
    { to: '/hardware', icon: Cpu, label: 'Hardware' },
];

function Sidebar() {
    return (
        <aside className="app-sidebar">
            <div className="sidebar-logo">
                <Waves size={28} strokeWidth={2.5} />
            </div>
            <nav className="sidebar-nav">
                {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                        title={label}
                    >
                        <Icon size={19} />
                    </NavLink>
                ))}
            </nav>
            <div className="sidebar-bottom">
                <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} title="Settings">
                    <Settings2 size={19} />
                </NavLink>
                <button className="nav-item" title="Profile">
                    <User size={19} />
                </button>
            </div>
        </aside>
    );
}

function Navbar() {
    const { pathname } = useLocation();
    const labels = { '/': 'Command Center', '/analytics': 'Analytics', '/alerts': 'Incidents', '/hardware': 'Hardware', '/settings': 'Settings' };

    return (
        <header className="navbar">
            <div className="navbar__brand">
                <span className="navbar__name">FloodGuard <span>AI</span></span>
                <span className="v2">PRO</span>
            </div>

            <div className="search-bar">
                <Search size={14} style={{ color: 'var(--c-text-mute)', flexShrink: 0 }} />
                <input type="text" placeholder="Search sensors, logs, incidents…" />
                <kbd style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', padding: '2px 5px', borderRadius: '4px', color: 'var(--c-text-mute)', fontFamily: 'inherit', flexShrink: 0 }}>⌘K</kbd>
            </div>

            <div className="navbar__actions">
                <div style={{ position: 'relative', color: 'var(--c-text-mute)', cursor: 'pointer' }}>
                    <Bell size={18} />
                    <span style={{ position: 'absolute', top: '-3px', right: '-3px', width: '7px', height: '7px', background: 'var(--c-red)', borderRadius: '50%', border: '2px solid var(--c-bg)' }} />
                </div>
                <div style={{ width: '1px', height: '28px', background: 'var(--c-border)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', lineHeight: 1.2 }}>Gov. Kerala</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--c-green)', fontWeight: '800', letterSpacing: '0.05em' }}>STATION ALPHA</div>
                    </div>
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--c-accent), var(--c-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '-0.02em' }}>AD</div>
                </div>
            </div>
        </header>
    );
}

export default function App() {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="main-viewport">
                    <Navbar />
                    <main className="main">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/alerts" element={<Alerts />} />
                            <Route path="/hardware" element={<Hardware />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}
