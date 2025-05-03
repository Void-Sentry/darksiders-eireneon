import { searchResult, User } from "../atoms/usersAtom";
import { Profile } from "./Profile";
import { useAtom } from "jotai";

interface SearchProps {
    search: (name: string) => Promise<{ data: User[]; message: string; }>;
    searchQuery: any;
    setSearchQuery: any;
    follow: any;
    unfollow: any;
    toggleFollow: any;
}

export const Search = ({ search, searchQuery, setSearchQuery, follow, unfollow, toggleFollow }: SearchProps) => {
    const [result, setResult] = useAtom(searchResult);

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Buscar perfis"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                minLength={4}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim().length >= 4)
                        search(searchQuery).then(({ data }) => {
                            setResult(data);
                        });
                }}
                className="search-input"
                aria-label="Buscar perfis"
            />
            {result.map((user, index) => <Profile user={user} index={index} atom={searchResult} follow={follow} toggleFollow={toggleFollow} unfollow={unfollow} />)}
        </div>
    );
};
