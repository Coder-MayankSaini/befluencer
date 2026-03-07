import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="site-footer">
                <div className="footer-links">
                    <a href="#">About</a>
                    <a href="#">Blog</a>
                    <a href="#">Careers</a>
                    <a href="#">Contact</a>
                </div>
                <p>&copy; 2026 BeFluencer. All rights reserved.</p>
            </footer>
        </div>
    );
}
