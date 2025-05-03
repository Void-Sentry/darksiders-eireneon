import { allFollowing, allRecommendations, followersSearchQueryAtom, isLoadingMoreFollowersAtom, isLoadingMoreRecommendationsAtom, loadMoreFollowersAtom, loadMoreRecommendationsAtom, toggleFollowAtom, User, visibleFollowingCountAtom, visibleFollowingPageAtom, visibleRecommendationsCountAtom, visibleRecommendationsPageAtom } from '../atoms/usersAtom';
import { useCallback, useEffect, useState } from 'react';
import { useProfile } from './useProfile';
import { http } from '../api/client';
import { useAtom } from 'jotai';

export function useFollow() {
  const [isLoadingMoreRecommendations] = useAtom(isLoadingMoreRecommendationsAtom);
  const [recommendationsState, setRecommendations] = useAtom(allRecommendations);
  const [, loadMoreRecommendations] = useAtom(loadMoreRecommendationsAtom);
  const [searchQuery, setSearchQuery] = useAtom(followersSearchQueryAtom);
  const [recommendationSize] = useAtom(visibleRecommendationsCountAtom);
  const [isLoadingMoreFollowers] = useAtom(isLoadingMoreFollowersAtom);
  const [recommendationPage] = useAtom(visibleRecommendationsPageAtom);
  const [, loadMoreFollowers] = useAtom(loadMoreFollowersAtom);
  const [followingState, setFollowers] = useAtom(allFollowing);
  const [followingSize] = useAtom(visibleFollowingCountAtom);
  const [followingPage] = useAtom(visibleFollowingPageAtom);
  const [error, setError] = useState<string | null>(null);
  const toggleFollow = useAtom(toggleFollowAtom)[1];
  const [loading, setLoading] = useState(false);
  const { logout } = useProfile();

  const following = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await http<{ message: string; data: User[] }>(`/follow/following?page=${followingPage}&size=${followingSize}`, { method: 'GET' });
      setFollowers(data);
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, [followingPage, followingSize, setFollowers]);

  const search = useCallback(async (name: string) => {
    try {
      setLoading(true);
      return await http<{ data: User[]; message: string; }>(`/follow/search?displayName=${name}`, { method: 'GET' });
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const recommendations = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await http<{ message: string; data: User[] }>(`/follow/recommendations?page=${recommendationPage}&size=${recommendationSize}`, { method: 'GET' });
      setRecommendations(data);
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, [recommendationPage, recommendationSize, setRecommendations]);

  const follow = useCallback(async (followId: string) => {
    try {
      setLoading(true);
      return await http(`/follow/${followId}`, { method: 'POST' });
    } catch (err: any) {
      setError(err.message);
      logout();
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const unfollow = useCallback(async (followId: string) => {
    try {
      setLoading(true);
      return await http(`/follow/${followId}`, { method: 'DELETE' });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    following();
  }, []);

  useEffect(() => {
    recommendations();
  }, []);

  return {
    search,
    recommendationsState,
    loadMoreRecommendations,
    isLoadingMoreRecommendations,
    follow,
    unfollow,
    isLoadingMoreFollowers,
    loadMoreFollowers,
    searchQuery,
    setSearchQuery,
    followingState,
    toggleFollow,
    loading,
    error,
  };
}
