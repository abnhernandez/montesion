"use client";

import React from 'react';
import Image from 'next/image';

export default function Avatar({ name, src, size = 40, className = '' }: { name?: string | null; src?: string | null; size?: number; className?: string }) {
  const initials = name ? name.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase() : undefined;
  const style = { height: size, width: size } as React.CSSProperties;

  if (src) {
    return (
      <div style={style} className={`rounded-full overflow-hidden ${className}`}>
        <Image src={src} alt={name || 'avatar'} width={size} height={size} className="object-cover rounded-full" unoptimized />
      </div>
    );
  }

  return (
    <div style={style} className={`rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold ${className}`}>
      <span className="text-sm">{initials ?? '?'}</span>
    </div>
  );
}
