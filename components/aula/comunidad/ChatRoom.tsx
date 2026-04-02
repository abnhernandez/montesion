"use client";

import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../../lib/supabase-client';
import toast from 'react-hot-toast';
import type { RealtimeChannel } from '@supabase/supabase-js';

type Message = {
  id: string;
  room_id: string;
  user_id: string;
  content: string | null;
  metadata?: unknown;
  created_at: string;
};

type Profile = { id: string; nombre?: string | null; username?: string | null };

export default function ChatRoom({ roomId, currentUserId }: { roomId: string; currentUserId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const [loadingMore, setLoadingMore] = useState(false);

  const loadOlder = async () => {
    if (!messages.length) return;
    setLoadingMore(true);
    try {
      const first = messages[0];
      const { data, error } = await supabase.from('comunidad_messages').select('*').lt('created_at', first.created_at).eq('room_id', roomId).order('created_at', { ascending: false }).limit(50);
      if (error) throw error;
      if (data && data.length) {
        const older = (data.reverse() as Message[]);
        setMessages(prev => [...older, ...prev]);
        await loadProfilesForMessages(older);
      } else {
        toast('No hay mensajes anteriores', { icon: 'ℹ️' });
      }
    } catch (e) {
      console.error('loadOlder failed', e);
      toast.error('Error cargando mensajes antiguos');
    } finally {
      setLoadingMore(false);
    }
  };
  useEffect(() => {
    let channel: RealtimeChannel | undefined;
    async function load() {
      try {
        const { data, error } = await supabase
          .from('comunidad_messages')
          .select('*')
          .eq('room_id', roomId)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;
        if (data) {
          const reversed = data.reverse() as Message[];
          setMessages(reversed);
          await loadProfilesForMessages(reversed);
        }
      } catch (e) {
        console.error('Failed loading messages', e);
        toast.error('Error cargando mensajes');
      }

      // subscribe via channel to inserts
      channel = supabase
        .channel(`public:comunidad_messages:${roomId}`)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comunidad_messages', filter: `room_id=eq.${roomId}` }, (payload: { new: Message }) => {
          setMessages((prev) => {
            const next = [...prev, payload.new];
            loadProfilesForMessages([payload.new]);
            return next;
          });
        })
        .subscribe();
    }

    load();
    return () => {
      if (channel) {
        try { supabase.removeChannel(channel); } catch { /* ignore */ }
      }
    };
  }, [roomId]);

  async function loadProfilesForMessages(msgs: Message[]) {
    const ids = Array.from(new Set(msgs.map(m => m.user_id).filter(Boolean)));
    const missing = ids.filter(id => !!id && !profiles[id]);
    if (missing.length === 0) return;
    try {
      const { data } = await supabase.from('users').select('id, nombre, username').in('id', missing);
      if (data) {
        const map: Record<string, Profile> = {};
        data.forEach((p: Profile) => { map[p.id] = p; });
        setProfiles(prev => ({ ...prev, ...map }));
      }
    } catch { /* ignore */ }
  }

  const send = async () => {
    const content = text.trim();
    if (!content) return;
    setText('');
    try {
      await supabase.from('comunidad_messages').insert([{ room_id: roomId, user_id: currentUserId || 'anon', content }]);
      // toast.success('Enviado');
    } catch (e) {
      console.error('send failed', e);
      toast.error('No se pudo enviar el mensaje');
    }
  };

  const avatarFor = (uid?: string) => {
    const prof = uid ? profiles[uid] : undefined;
    const letter = prof?.nombre?.charAt(0) || prof?.username?.charAt(0) || (uid ? uid.charAt(0) : '?');
    return (
      <div className="h-8 w-8 rounded-full flex items-center justify-center font-semibold text-sm">{letter?.toUpperCase()}</div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-lg overflow-hidden">
        <div className="p-4 h-[520px] overflow-y-auto" style={{ background: '' }}>
          <div className="w-full flex justify-center mb-3">
            <button onClick={loadOlder} disabled={loadingMore} className="px-3 py-1 text-sm  rounded">{loadingMore ? 'Cargando...' : 'Cargar mensajes anteriores'}</button>
          </div>
          {messages.map((m) => {
            const isMe = m.user_id === currentUserId;
            const prof = profiles[m.user_id];
            return (
              <div key={m.id} className={`mb-4 flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                {!isMe && <div className="mr-3">{avatarFor(m.user_id)}</div>}
                <div className={`max-w-[78%] p-3 rounded-lg shadow-sm ${isMe ? '' : ''}`}>
                  <div className="text-xs mb-1">{prof ? (prof.nombre || prof.username) : m.user_id}</div>
                  <div className="break-words">{m.content}</div>
                  <div className={`text-[11px] mt-2 ${isMe ? '' : ''}`}>{new Date(m.created_at).toLocaleString()}</div>
                </div>
                {isMe && <div className="ml-3">{avatarFor(m.user_id)}</div>}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 flex gap-2 items-end">
          <textarea value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} rows={2} className="flex-1 px-3 py-2 rounded resize-none" placeholder="Escribe un mensaje y presiona Enter para enviar" />
          <button onClick={send} className="px-4 py-2 rounded">Enviar</button>
        </div>
      </div>
    </div>
  );
}
