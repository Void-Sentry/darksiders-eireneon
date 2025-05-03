import { useFollow } from "../hooks/useFollow";
import { User } from "../atoms/usersAtom";
import { PrimitiveAtom } from "jotai";
import { useCallback } from "react";

export const Profile = ({ user, atom, index, follow, unfollow, toggleFollow }: { user: User; atom: PrimitiveAtom<User[]>; index: number; follow: any; unfollow: any; toggleFollow: any }) => {
    const actionHandler = useCallback(() => {
        user['isFollowing'] ? unfollow(user['userId']) : follow(user['userId']);
        toggleFollow(atom, index);
    }, [user, atom, index, toggleFollow, unfollow, follow]);

    return (
        <li key={user.userId} className="user-item">
            <div className="user-info">
                <img src={user.avatarUrl || "/placeholder.svg"} alt={user.displayName} className="user-avatar" loading="lazy" />
                <span className="user-name">{user.displayName}</span>
            </div>
            <button
                className={`follow-button ${user.isFollowing ? "following" : ""}`}
                aria-pressed={user.isFollowing}
                onClick={actionHandler}
            >
                {user.isFollowing ? "Deixar de seguir" : "Seguir"}
            </button>
        </li>
    );
};
