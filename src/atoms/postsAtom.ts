import { atom } from "jotai";

export interface Post {
  id: string;
  image_blob: string;
  content: string;
  likes: number;
  liked: boolean;
  created_at: number;
}

// Generate 30 posts for testing infinite scroll
// const generatePosts = (count: number): Post[] => {
//   const posts: Post[] = [];
//   for (let i = 1; i <= count; i++) {
//     posts.push({
//       id: i,
//       image_blob: `https://picsum.photos/id/${i + 10}/400/300`,
//       content: `Post #${i}: ${getRandomText()}`,
//       likes: Math.floor(Math.random() * 50),
//       liked: false,
//     });
//   }
//   return posts;
// };

// const getRandomText = () => {
//   const texts = [
//     "Explorando novos horizontes! 🌄 #aventura #natureza",
//     "Momentos especiais com amigos são insubstituíveis! 👫 #amizade",
//     "Novo projeto em andamento! Mal posso esperar para compartilhar os resultados. 💻 #desenvolvimento",
//     "Aprendendo algo novo todos os dias. A jornada do conhecimento nunca termina! 📚 #aprendizado",
//     "Que dia incrível! Gratidão por todas as experiências. ✨ #gratidão",
//     "Compartilhando ideias e inspirações. 💡 #criatividade",
//     "Celebrando pequenas vitórias! 🎉 #conquistas",
//     "Reflexões sobre o futuro e novas possibilidades. 🔮 #reflexão",
//     "Conectando com pessoas incríveis nesta jornada. 🤝 #networking",
//     "Buscando equilíbrio entre trabalho e vida pessoal. ⚖️ #equilíbrio",
//   ]
//   return texts[Math.floor(Math.random() * texts.length)]
// }

// All posts data
const allPosts = atom<Post[]>([]);

// Visible posts (initially 10)
export const visiblePostsCountAtom = atom<number>(10);
export const postsPageAtom = atom<number>(1);

// Posts atom with pagination
export const postsAtom = atom(
  (get) => {
    const visibleCount = get(visiblePostsCountAtom);
    return get(allPosts).slice(0, visibleCount);
  },
  (get, set, update: Post[]) => {
    // const currentPosts = get(allPosts);
    set(allPosts, update);
  }
);

// Loading more posts state
export const isLoadingMorePostsAtom = atom<boolean>(false);

// Load more posts action
export const loadMorePostsAtom = atom(null, (get, set) => {
  const currentPage = get(postsPageAtom);

  // Set loading state
  set(isLoadingMorePostsAtom, true)

  // Update visible posts count
  set(postsPageAtom, Math.min(currentPage + 1))

  // Reset loading state
  set(isLoadingMorePostsAtom, false)
})

// Toggle like atom
export const toggleLikeAtom = atom(null, (get, set, index: number) => {
  const list = get(postsAtom);
  const post = list[index];
  post['likes'] = post['liked'] ? post['likes'] - 1 : post['likes'] + 1;
  post['liked'] = !Boolean(post['liked']);

  list[index] = post;

  set(postsAtom, list);
})

// Create post atom
// export const createPostAtom = atom(null, (get, set, { text, imageUrl }: { text: string; imageUrl?: string }) => {
//   const newPost: Post = {
//     id: Date.now(),
//     text,
//     imageUrl: imageUrl || `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/300`,
//     likes: 0,
//     liked: false,
//   }

//   // Add to beginning of all posts
//   get(postsAtom).unshift(newPost)

//   // Force update of the derived atom
//   const currentCount = get(visiblePostsCountAtom)
//   set(visiblePostsCountAtom, currentCount)
// })
