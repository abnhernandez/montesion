export function mobile(h: Headers) { const u=h.get('user-agent')||''; return /iPhone|Android.*Mobile/i.test(u)&&!/iPad|Tablet|Windows|CrOS|bot/i.test(u)&&h.get('sec-ch-ua-mobile')!=='?0'; }
