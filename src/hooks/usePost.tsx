import { Post, postsAtom, visiblePostsCountAtom, postsPageAtom } from '../atoms/postsAtom';
import { useCallback, useState } from 'react';
import { useProfile } from './useProfile';
import { http } from '../api/client';
import { useAtom } from 'jotai';

export function usePost() {
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useAtom(postsPageAtom);
  const [loading, setLoading] = useState(false);
  const [size] = useAtom(visiblePostsCountAtom);
  const [posts, setPosts] = useAtom(postsAtom);
  const { logout } = useProfile();

  const make = useCallback(async (content: string, file: File) => {
    const form = new FormData();
    form.append('content', content);
    form.append('file', file);

    try {
      setLoading(true);
      return await http('/post', { method: 'POST', body: form });
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (description: string, page: number, size: number) => {
    try {
      setLoading(true);
      return await http(`/post/search?description=${description}&page=${page}&size=${size}`, { method: 'GET' });
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const feed = useCallback(async () => {
    try {
      setLoading(true);
      const data = await http<{ message: Post[] }>(`/post?page=${page}&size=${size}`, { method: 'GET' });
      setPosts([...posts, ...data.message]);
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  const like = useCallback(async (postId: string) => {
    try {
      setLoading(true);
      return await http(`/post/${postId}/like`, { method: 'POST' });
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const dislike = useCallback(async (postId: string) => {
    try {
      setLoading(true);
      return await http(`/post/${postId}/dislike`, { method: 'DELETE' });
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    make,
    search,
    feed,
    like,
    dislike,
    loading,
    error,
  };
}
