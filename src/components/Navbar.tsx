import React from 'react';
import { Snowflake } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <nav
            className="w-full py-4 px-6 flex items-center justify-between shadow-md fixed top-0 left-0 z-50 bg-white"
            style={{
                backgroundColor: '#FFFFFF',
                color: '#D42426',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                zIndex: 50
            }}
        >
            <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="bg-red-50 p-2 rounded-lg" style={{ backgroundColor: '#FEF2F2', padding: '0.5rem', borderRadius: '0.5rem' }}>
                    <Snowflake size={24} className="text-santa-red" style={{ color: '#D42426' }} />
                </div>
                <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', color: '#1F2937' }}>
                    Santa's WishCraft
                </span>

            </div>
        </nav>
    );
};

export default Navbar;
