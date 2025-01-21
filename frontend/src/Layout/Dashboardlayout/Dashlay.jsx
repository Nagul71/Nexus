import React, { useEffect, useState, useRef } from 'react';
import './dashlay.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import ChatList from '../../components/ChatList/ChatList';

function Dashlay() {
    const { isSignedIn, isLoaded } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate("/sign-in");
        }
    }, [isLoaded, isSignedIn, navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && 
                !menuRef.current.contains(event.target) && 
                !event.target.classList.contains('mobile-menu-toggle')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!isLoaded) return <div>Loading...</div>;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <button 
                className={`mobile-menu-toggle ${isMobileMenuOpen ? 'hidden' : ''}`} 
                onClick={toggleMobileMenu}
            >
                ☰
            </button>
            <div className={`overlay ${isMobileMenuOpen ? 'active' : ''}`} />
            <div className="dash">
                <div 
                    ref={menuRef}
                    className={`menu ${isMobileMenuOpen ? 'menu-open' : ''}`}
                >
                    <ChatList />
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Dashlay;