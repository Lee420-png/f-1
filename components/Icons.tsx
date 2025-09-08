import React from 'react';

// Paper airplane style send icon
export const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
);

// Generic user icon
export const UserIcon: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center font-bold text-slate-300 border-2 border-slate-500">
        N
    </div>
);

// More detailed Luffy straw hat icon for messages
export const LuffyIcon: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center overflow-hidden border-2 border-red-500 shadow-md">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-110">
            <circle cx="50" cy="50" r="40" fill="#FBBF24"/>
            <path d="M50 10 C 25 10, 10 30, 10 50 C 10 52, 90 52, 90 50 C 90 30, 75 10, 50 10 Z" fill="#FCD34D" />
            <path d="M10 50 a 40 40 0 0 0 80 0 H 10 Z" fill="#FBBF24"/>
            <path d="M10 50 C 10 45, 90 45, 90 50 L 90 55 C 90 60, 10 60, 10 55 Z" fill="#EF4444"/>
            <ellipse cx="50" cy="28" rx="25" ry="18" fill="#FDE68A" opacity="0.5"/>
        </svg>
    </div>
);

// Header icon
export const StrawHatIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2C9.25,2,6.7,3.54,5.2,5.83L6.8,7.24C7.94,5.43,9.83,4.15,12,4.15c2.17,0,4.06,1.28,5.2,3.09l1.6-1.41C17.3,3.54,14.75,2,12,2z M12,6.15c-1.38,0-2.5,1.12-2.5,2.5S10.62,11.15,12,11.15s2.5-1.12,2.5-2.5S13.38,6.15,12,6.15z M19.43,8.67L17.7,10.09c0.91,1.4,1.3,3.06,1.3,4.91H5c0-1.85,0.39-3.51,1.3-4.91L4.57,8.67C3.19,10.65,2.5,13.06,2.5,15.75v1c0,0.55,0.45,1,1,1h17c0.55,0,1-0.45,1-1v-1C21.5,13.06,20.81,10.65,19.43,8.67z"/>
    </svg>
);


// Compass icon, slightly refined
export const CompassIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 group-hover:text-amber-300 flex-shrink-0 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
    </svg>
);