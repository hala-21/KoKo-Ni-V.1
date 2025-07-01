import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black/80 backdrop-blur-sm border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <img 
            src="https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_640.png" 
            alt="KoKo Ni Logo" 
            className="w-10 h-10 rounded-full"
          />
          <h1 
            className="text-4xl font-bold text-white tracking-wider"
            style={{
              fontFamily: 'Zen Kurenaido, Noto Sans JP, sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              background: 'linear-gradient(45deg, #ffffff, #e5e5e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            KoKo Ni!
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;