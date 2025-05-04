"use client"

import { postsAtom, isLoadingMorePostsAtom, loadMorePostsAtom, visiblePostsCountAtom } from "../atoms/postsAtom";
import CreatePostForm from "../components/CreatePostForm";
import FollowersList from "../components/FollowersList";
import { isSessionActive } from "../atoms/authAtom";
import { useState, useEffect, useRef } from "react";
import { useProfile } from "../hooks/useProfile";
import PostItem from "../components/PostItem";
import { Navigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useAtom } from "jotai";
import "../styles/FeedPage.css";

function FeedPage() {
  const isLoadingMorePosts = useAtom(isLoadingMorePostsAtom)[0];
  const [showFollowers, setShowFollowers] = useState(false);
  const [isSessionActiveState] = useAtom(isSessionActive);
  const [, loadMore] = useAtom(loadMorePostsAtom);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [count] = useAtom(visiblePostsCountAtom);
  const [posts] = useAtom(postsAtom);
  const { logout } = useProfile();
  const { feed } = usePost();
  
  if (!isSessionActiveState)
    return <Navigate to="/" replace />;

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMorePosts && posts.length >= count)
          loadMore();
      },
      { threshold: 0.5 },
    )

    observer.observe(bottomRef.current);

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    }
  }, [bottomRef, loadMore, isLoadingMorePosts])

  const toggleFollowersPanel = () => {
    setShowFollowers(!showFollowers);
  };

  useEffect(() => {
    feed();
  }, [feed]);

  return (
    <div className="feed-page">
      <header className="feed-header">
        <h1>Seu Feed</h1>
        <button className="logout-button" onClick={logout} aria-label="Sair da conta">
          Sair
        </button>
      </header>

      <div className="posts-container">
        <CreatePostForm feed={feed} />

        {posts.map((post, index) => (
          <PostItem key={post.id} post={post} index={index} />
        ))}

        {/* Loading indicator */}
        {isLoadingMorePosts && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando mais posts...</p>
          </div>
        )}

        {/* Intersection observer target */}
        <div ref={bottomRef} className="intersection-target"></div>
      </div>

      <button
        className={`followers-button ${showFollowers ? "active" : ""}`}
        onClick={toggleFollowersPanel}
        aria-expanded={showFollowers}
      >
        {showFollowers ? "Fechar" : "Seguidores"}
      </button>

      {showFollowers && <FollowersList feed={feed} />}
    </div>
  );
}

export default FeedPage;
