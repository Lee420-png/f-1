import React from 'react';
import ChatInterface from './components/ChatInterface';
import { StrawHatIcon } from './components/Icons';

function App() {
  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white flex flex-col items-center justify-center p-2 sm:p-4 font-[Poppins]">
       <div className="w-full max-w-2xl h-[95vh] sm:h-[90vh] flex flex-col">
          <header className="text-center mb-4 p-2 flex items-center justify-center gap-4">
              <StrawHatIcon />
              <div>
                <h1 
                  className="text-3xl sm:text-4xl font-bold text-amber-300 tracking-wider"
                  style={{ 
                    fontFamily: "'Pirata One', cursive",
                    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  Luffy's Logbook
                </h1>
                <p className="text-slate-300 text-sm italic opacity-80 -mt-1">
                  Your AI guide to my nakama, Lincoln M's great adventure!
                </p>
              </div>
          </header>
          <ChatInterface />
       </div>
       <style>
        {`
          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #1B263B;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #4A6D7C;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #6A8D9C;
          }
          
          /* Keyframe animation for user messages */
          @keyframes slide-in-bottom {
            0% {
              transform: translateY(20px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-slide-in-bottom {
            animation: slide-in-bottom 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          }

          /* Keyframe animation for Luffy's messages */
          @keyframes pop-in {
            0% {
              transform: translateY(10px) scale(0.9);
              opacity: 0;
            }
            80% {
              transform: translateY(-2px) scale(1.05);
              opacity: 1;
            }
            100% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }

          .animate-pop-in {
            animation: pop-in 0.3s ease-out both;
          }
        `}
       </style>
    </div>
  );
}

export default App;
