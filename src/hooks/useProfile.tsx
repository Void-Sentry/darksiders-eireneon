import { isSessionActive, logoutAtom } from '../atoms/authAtom';
import { useCallback, useState } from 'react';
import { http } from '../api/client';
import { useAtom } from 'jotai';

export function useProfile() {
  const [isSessionActiveState, setIsSessionActive] = useAtom(isSessionActive);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [, oidcLogout] = useAtom(logoutAtom);

  const feed = useCallback(async () => {
    try {
      setLoading(true);
      return await http(`/profile`, { method: 'GET' });
    } catch (err: any) {
      setError(err.message);
      setIsSessionActive(false);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const followers = useCallback(async () => {
    try {
      setLoading(true);
      return await http(`/profile/followers`, { method: 'GET' });
    } catch (err: any) {
      setError(err.message);
      setIsSessionActive(false);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const sessionActive = useCallback(async () => {
    try {
      setLoading(true);
      await http<any>('/profile/session', { method: 'GET' });
      setIsSessionActive(!isSessionActiveState);
    } catch(err: any) {
      setError(err.message);
      setIsSessionActive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const swap = useCallback(async (token: string): Promise<any> => {
    try {
      setLoading(true);
      await http<any>('/profile/session', {
        method: 'POST',
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await http('/profile/session', { method: 'DELETE' });
      oidcLogout()
    } catch (err: any) {
      setError(err.message);
      setIsSessionActive(false);
      oidcLogout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sessionActive,
    followers,
    loading,
    logout,
    error,
    feed,
    swap,
  };
}
