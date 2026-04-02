"use client";

import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../../lib/supabase-client';
import Avatar from '../../ui/Avatar';
import toast from 'react-hot-toast';
import Image from 'next/image';
import type { RealtimeChannel } from '@supabase/supabase-js';

type Post = {
  id: string;
  user_id: string;
  content: string | null;
  image_path?: string | null;
  likes: number;
  created_at: string;
};

export default function Feed({ currentUserId }: { currentUserId?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [profiles, setProfiles] = useState<Record<string, { id: string; nombre?: string; username?: string }>>({});

  useEffect(() => {
    let channel: RealtimeChannel | undefined;
    async function load() {
      try {
        const { data } = await supabase.from('comunidad_posts').select('*').order('created_at', { ascending: false }).limit(10);
        if (data) setPosts(data as Post[]);
        // fetch profiles for initial posts
        if (data && data.length) await loadProfilesForPosts(data as Post[]);
      } catch (e) {
        console.error('Failed to load posts', e);
        toast.error('Error cargando publicaciones');
      }

      channel = supabase
        .channel('public:comunidad_posts')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comunidad_posts' }, (payload: { new: Post }) => {
          setPosts((p) => [payload.new, ...p]);
          loadProfilesForPosts([payload.new]);
        })
        .subscribe();
    }

    load();

    return () => { if (channel) { try { supabase.removeChannel(channel); } catch {} } };
  }, []);

  async function loadProfilesForPosts(postsBatch: Post[]) {
    const ids = Array.from(new Set(postsBatch.map(p => p.user_id).filter(Boolean)));
    const missing = ids.filter(id => !!id && !profiles[id]);
    if (missing.length === 0) return;
    try {
      const { data } = await supabase.from('users').select('id, nombre, username').in('id', missing);
      if (data) {
        const map: Record<string, { id: string; nombre?: string; username?: string }> = {};
        data.forEach((r: { id: string; nombre?: string; username?: string }) => { map[r.id] = r; });
        setProfiles(prev => ({ ...prev, ...map }));
      }
    } catch { /* ignore */ }
  }

  const [loadingMorePosts, setLoadingMorePosts] = useState(false);

  const loadMore = async () => {
    if (!posts.length) return;
    setLoadingMorePosts(true);
    try {
      const last = posts[posts.length - 1];
      const { data, error } = await supabase.from('comunidad_posts').select('*').lt('created_at', last.created_at).order('created_at', { ascending: false }).limit(10);
      if (error) throw error;
      if (data && data.length) {
        setPosts(prev => [...prev, ...(data as Post[]).reverse()]);
        await loadProfilesForPosts(data as Post[]);
      } else {
        toast('No hay más publicaciones', { icon: 'ℹ️' });
      }
    } catch (e) {
      console.error('loadMore failed', e);
      toast.error('Error cargando más publicaciones');
    } finally {
      setLoadingMorePosts(false);
    }
  };

  const createPost = async () => {
    const txt = content.trim();
    // either text or image required
    if (!txt && !selectedFile && !previewUrl) return;
    setContent('');
    try {
      let imageUrl: string | null = previewUrl;
      if (selectedFile && !previewUrl && currentUserId) {
        imageUrl = await uploadFile(selectedFile);
      }
      await supabase.from('comunidad_posts').insert([{ user_id: currentUserId || 'anon', content: txt || null, image_path: imageUrl }]);
      // reset
      setSelectedFile(null);
      setPreviewUrl(null);
      toast.success('Publicación creada');
    } catch (e) {
      console.error('createPost failed', e);
      toast.error('Error al crear la publicación');
    }
  };

  const uploadFile = async (file: File) => {
    if (!file || !currentUserId) return null;
    try {
      const path = `${currentUserId}/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from('comunidad').upload(path, file, { cacheControl: '3600', upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('comunidad').getPublicUrl(path);
      const publicUrl = data?.publicUrl || null;
      return publicUrl;
    } catch (e) {
      console.error('Upload failed', e);
      return null;
    }
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Composer */}
      <div className="mb-6 p-4 rounded-2xl shadow-sm">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Avatar name={(currentUserId || 'U')} size={48} className="ring-1 ring-primary/10" />
          </div>
          <div className="flex-1">
            <div className="relative">
              <textarea
                className="w-full p-3 rounded-xl resize-none shadow-sm transition focus:shadow-md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="¿Qué quieres compartir?"
                rows={3}
                onKeyDown={(e) => {
                  // Ctrl/Cmd+Enter to send
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    createPost();
                  }
                }}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button
                  className="p-2 rounded-md transition"
                  title="Emoji"
                  onClick={() => toast('Emoji picker placeholder')}
                >
                  {/* Emoji icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a7 7 0 100 14A7 7 0 009 2zM7.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM13 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM6.5 11.75a4.5 4.5 0 006.999 0 .75.75 0 10-1.199-.9 3 3 0 01-4.602 0 .75.75 0 10-1.198.9z"/></svg>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.currentTarget.value = ''; }} />
                <button
                  className="p-2 rounded-md transition"
                  title="Agregar imagen"
                  onClick={() => fileRef.current?.click()}
                >
                  {/* Image icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3.5 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM5 13.5l3.5-4.5 2.5 3 3.5-4.5L15 13.5H5z"/></svg>
                </button>
                <button
                  onClick={createPost}
                  className="px-3 py-2 rounded-md shadow hover:brightness-95 transition-flex flex items-center gap-2"
                  title="Publicar"
                >
                  {/* Send icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.94 2.94A1.5 1.5 0 014.5 2h11a1 1 0 01.97 1.242l-2.2 7.334a2 2 0 01-1.868 1.44l-3.09.12a1 1 0 01-.9-.553L6.03 7.64a2 2 0 00-1.09-.963L2.94 4.18a1.5 1.5 0 010-1.24z"/></svg>
                  <span className="text-sm">Publicar</span>
                </button>
              </div>
            </div>

            {previewUrl && (
              <div className="mt-3 rounded-lg overflow-hidden shadow-sm relative h-48">
                <div className="relative w-full h-full">
                  <Image src={previewUrl} alt="preview" fill className="object-cover transform transition duration-300 hover:scale-105" unoptimized />
                </div>
                <button onClick={() => { setPreviewUrl(null); setSelectedFile(null); }} className="absolute top-2 right-2 rounded-full p-1 hover:scale-105 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => {
          const prof = profiles[post.user_id];
          return (
            <article key={post.id} className="p-4 rounded-2xl shadow-sm hover:shadow-md transition group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Avatar name={prof?.nombre || prof?.username || post.user_id} size={48} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{prof ? (prof.nombre || prof.username) : post.user_id}</div>
                      <div className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition">
                      <button className="p-2 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"/></svg></button>
                    </div>
                  </div>
                  {post.content && <div className="mt-3 text-gray-800 dark:text-gray-100 leading-relaxed">{post.content}</div>}
                  {post.image_path && (
                    <div className="mt-3 rounded-lg overflow-hidden relative h-auto">
                      <div className="relative w-full" style={{ minHeight: 240 }}>
                        <Image src={post.image_path} alt="post" fill className="w-full max-h-96 object-cover transform transition duration-300 hover:scale-105 rounded" unoptimized />
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-2 px-2 py-1 rounded transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg>
                      <span> {post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 px-2 py-1 rounded transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M18 10c0 3.866-3.582 7-8 7a9.872 9.872 0 01-3-.5L2 17l1.5-3A7.972 7.972 0 012 10C2 6.134 5.582 3 10 3s8 3.134 8 7z"/></svg>
                      <span>Comentar</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <div className="flex justify-center mt-4">
          <button onClick={loadMore} disabled={loadingMorePosts} className="px-4 py-2 transition">{loadingMorePosts ? 'Cargando...' : 'Cargar más'}</button>
        </div>
      </div>
    </div>
  );
}
