import React from 'react';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen bg-white shadow-xl relative overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
