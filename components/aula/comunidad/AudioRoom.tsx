"use client";

import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../../lib/supabase-client';
import type { RealtimeChannel } from '@supabase/supabase-js';

type SignalRow = {
  id: string;
  room_id: string;
  sender_id: string;
  type: string;
  payload: unknown;
  created_at: string;
};

export default function AudioRoom({ roomId, currentUserId }: { roomId: string; currentUserId?: string }) {
  const [status, setStatus] = useState('idle');
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    let subscribed = true;

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStreamRef.current = stream;
        setStatus('ready');
        // subscribe to signals
        channelRef.current = supabase
          .channel(`public:comunidad_webrtc_signals:${roomId}`)
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comunidad_webrtc_signals', filter: `room_id=eq.${roomId}` }, (payload: { new: SignalRow }) => {
            if (!subscribed) return;
            const sig = payload.new;
            if (sig.sender_id === currentUserId) return; // ignore our own
            handleSignal(sig);
          })
          .subscribe();
      } catch (e) {
        console.error('getUserMedia failed', e);
        setStatus('failed');
      }
    };

    start();

    return () => {
      subscribed = false;
      if (channelRef.current) { try { supabase.removeChannel(channelRef.current); } catch {} }
      if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
      if (localStreamRef.current) { localStreamRef.current.getTracks().forEach(t => t.stop()); }
    };
  }, [roomId, currentUserId]);

  const createPeer = () => {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        sendSignal('ice', e.candidate);
      }
    };
    pc.ontrack = (e) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = e.streams[0];
        remoteAudioRef.current.play().catch(() => {});
      }
    };
    // add local tracks
    localStreamRef.current?.getTracks().forEach(track => pc.addTrack(track, localStreamRef.current!));
    pcRef.current = pc;
    return pc;
  };

  const sendSignal = async (type: string, payload: unknown) => {
    try {
      await supabase.from('comunidad_webrtc_signals').insert([{ room_id: roomId, sender_id: currentUserId || 'anon', type, payload }]);
    } catch (e) { console.error('sendSignal failed', e); }
  };

  const startCall = async () => {
    setStatus('calling');
    const pc = createPeer();
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    await sendSignal('offer', offer);
  };

  const handleSignal = async (sig: SignalRow) => {
    if (!sig) return;
    const pc = pcRef.current || createPeer();
    if (sig.type === 'offer') {
      const offer = sig.payload as RTCSessionDescriptionInit;
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await sendSignal('answer', answer);
    } else if (sig.type === 'answer') {
      const answer = sig.payload as RTCSessionDescriptionInit;
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    } else if (sig.type === 'ice') {
      try { await pc.addIceCandidate(sig.payload as RTCIceCandidateInit); } catch (e) { console.warn('addIceCandidate failed', e); }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="p-4 rounded-lg">
        <div className="mb-4">
          <div>Estado: {status}</div>
          <div className="mt-2">Tu micrófono será usado para la demo. Asegúrate de tener permiso.</div>
        </div>

        <div className="flex gap-2">
          <button onClick={startCall} className="px-4 py-2 rounded">Iniciar/Ofrecer llamada</button>
          <button onClick={() => { if (pcRef.current) { pcRef.current.getSenders().forEach(s => { if (s.track) s.track.enabled = !s.track.enabled; }); }} } className="px-4 py-2 rounded">Mute/Unmute</button>
        </div>

        <audio ref={remoteAudioRef} autoPlay playsInline className="mt-4 w-full" />
      </div>
    </div>
  );
}
