import { atom, PrimitiveAtom } from "jotai";

export interface User {
  userId: string;
  displayName: string;
  isFollowing: boolean;
  avatarUrl: string;
}

// All followers and recommendations data
export const allFollowing = atom<User[]>([]);
export const allRecommendations = atom<User[]>([]);
export const searchResult = atom<User[]>([]);

// Visible followers count (initially 5)
export const visibleFollowingCountAtom = atom<number>(5);
export const visibleFollowingPageAtom = atom<number>(1);

// Visible recommendations count (initially 5)
export const visibleRecommendationsCountAtom = atom<number>(5);
export const visibleRecommendationsPageAtom = atom<number>(1);

// Search query for followers
export const followersSearchQueryAtom = atom<string>("");

// Loading states
export const isLoadingMoreFollowersAtom = atom<boolean>(false);
export const isLoadingMoreRecommendationsAtom = atom<boolean>(false);

// Recommendations atom with pagination
export const recommendationsAtom = atom<User[]>((get) => {
  const visibleCount = get(visibleRecommendationsCountAtom);
  return get(allRecommendations).slice(0, visibleCount);
});

// Load more followers action
export const loadMoreFollowersAtom = atom(null, async (get, set) => {
  const currentCount = get(visibleFollowingCountAtom);

  set(isLoadingMoreFollowersAtom, true);
  set(visibleFollowingPageAtom, Math.min(currentCount + 1));
  set(isLoadingMoreFollowersAtom, false);
});

// Load more recommendations action
export const loadMoreRecommendationsAtom = atom(null, async (get, set) => {
  const currentCount = get(visibleRecommendationsCountAtom);

  set(isLoadingMoreRecommendationsAtom, true);
  set(visibleRecommendationsPageAtom, Math.min(currentCount + 1));
  set(isLoadingMoreRecommendationsAtom, false);
});

// Toggle follow atom
export const toggleFollowAtom = atom(null, (get, set, atom: PrimitiveAtom<User[]>, index: number) => {
  const list = get(atom);
  const profile = list[index];
  profile['isFollowing'] = !Boolean(profile['isFollowing']);

  set(atom, list);
});
