import { allFollowing, allRecommendations } from "../atoms/usersAtom";
import { useScrollableObserver } from "../hooks/scrollable";
import { useFollow } from "../hooks/useFollow";
import "../styles/FollowersList.css";
import { Profile } from "./Profile";
import { Search } from "./Search";
import { useRef } from "react";

function FollowersList() {
  const {
    isLoadingMoreRecommendations,
    loadMoreRecommendations,
    isLoadingMoreFollowers,
    recommendationsState,
    loadMoreFollowers,
    followingState,
    setSearchQuery,
    toggleFollow,
    searchQuery,
    unfollow,
    search,
    follow,
  } = useFollow();

  const recommendationsSectionRef = useRef<HTMLDivElement>(null);
  const recommendationsEndRef = useRef<HTMLDivElement>(null);
  const followersSectionRef = useRef<HTMLDivElement>(null);
  const followersEndRef = useRef<HTMLDivElement>(null);

  useScrollableObserver(loadMoreRecommendations, isLoadingMoreRecommendations, recommendationsSectionRef, recommendationsEndRef);
  useScrollableObserver(loadMoreFollowers, isLoadingMoreFollowers, followersSectionRef, followersEndRef);

  return (
    <div className="followers-panel" role="dialog" aria-label="Seguidores e recomendações">
      <Search
        search={search}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        follow={follow}
        toggleFollow={toggleFollow}
        unfollow={unfollow}
      />

      <div className="followers-section" ref={followersSectionRef}>
        <h2>Seguindo</h2>
        <ul className="users-list">
          {followingState.length > 0 ? (
            followingState.map((user, index) => (
              <Profile
                key={user.userId}
                user={user}
                index={index}
                atom={allFollowing}
                follow={follow}
                toggleFollow={toggleFollow}
                unfollow={unfollow}
              />
            ))
          ) : searchQuery ? (
            <li className="empty-message">Perfil não encontrado</li>
          ) : (
            <li className="empty-message">Você ainda não segue ninguém</li>
          )}
        </ul>

        {isLoadingMoreFollowers && (
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
            <span>Carregando mais perfis...</span>
          </div>
        )}

        <div ref={followersEndRef} className="intersection-target"></div>
      </div>

      <div className="recommendations-section" ref={recommendationsSectionRef}>
        <h2>Recomendações para seguir</h2>
        <ul className="users-list">
          {recommendationsState.map((user, index) => (
            <Profile
              key={user.userId}
              user={user}
              index={index}
              atom={allRecommendations}
              follow={follow}
              toggleFollow={toggleFollow}
              unfollow={unfollow}
            />
          ))}
        </ul>

        {isLoadingMoreRecommendations && (
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
            <span>Carregando mais recomendações...</span>
          </div>
        )}

        <div ref={recommendationsEndRef} className="intersection-target"></div>
      </div>
    </div>
  );
}

export default FollowersList;
