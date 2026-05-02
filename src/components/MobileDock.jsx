"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const icons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3l9 9" />
      <path d="M9 21V12h6v9" />
      <path d="M3 12v9h18V12" />
    </svg>
  ),
  folder: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  ),
  pencil: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.232 5.232l3.536 3.536" />
      <path d="M9 11l-6 6v3h3l6-6" />
      <path d="M16 4l4 4-1.5 1.5-4-4L16 4z" />
    </svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9" />
      <path d="M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" />
      <path d="M3 12h18" />
    </svg>
  ),
  back: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="20" y1="12" x2="4" y2="12" />
      <polyline points="10 6 4 12 10 18" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { icon: icons.back, label: '返回', action: 'back' },
  { icon: icons.home, label: '首页', href: '/' },
  { icon: icons.folder, label: '作品', href: '/projects' },
  { icon: icons.pencil, label: '关于', href: '/about' },
  { icon: icons.globe, label: 'LAB', href: '/lab' },
];

export default function MobileDock() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setMounted(true);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  const handlePress = (item, index) => {
    setPressed(index);
    setTimeout(() => setPressed(null), 300);
    if (item.action === 'back') {
      router.back();
    } else {
      router.push(item.href);
    }
  };

  const isActive = (item) => {
    if (!item.href) return false;
    if (item.href === '/') return pathname === '/';
    return pathname === item.href || pathname.startsWith(item.href + '/');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(0,0,0,0.52)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: '9999px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '0.5rem 0.75rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {NAV_ITEMS.map((item, i) => {
        const active = isActive(item);
        const tapped = pressed === i;
        return (
          <button
            key={i}
            type="button"
            onTouchStart={() => setPressed(i)}
            onTouchCancel={() => setPressed(null)}
            onClick={() => handlePress(item, i)}
            aria-label={item.label}
            style={{
              width: 46,
              height: 46,
              borderRadius: '9999px',
              border: active
                ? '1px solid rgba(255,255,255,0.55)'
                : '1px solid rgba(255,255,255,0.10)',
              background: active
                ? 'rgba(255,255,255,0.14)'
                : tapped
                  ? 'rgba(255,255,255,0.10)'
                  : 'rgba(255,255,255,0.05)',
              color: active ? '#ffffff' : 'rgba(255,255,255,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              transform: tapped ? 'scale(0.88)' : 'scale(1)',
              flexShrink: 0,
              WebkitTapHighlightColor: 'transparent',
              outline: 'none',
            }}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
}
