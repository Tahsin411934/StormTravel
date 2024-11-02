import React from 'react';

const LoadingIcon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1E1743]">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-bounce">
           <img src="loader.png" alt="" />
          </div>
        </div>
      </div>
      <h1 className="mt-5 text-white text-5xl font-Prata tracking-widest">ShareTrip</h1>
    </div>
  );
};

export default LoadingIcon;
