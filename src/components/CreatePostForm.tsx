import { usePost } from "../hooks/usePost";
import "../styles/CreatePostForm.css";
import { useState } from "react";
import type React from "react";

export default function CreatePostForm({ feed }: { feed: () => Promise<void> }) {
  const [file, setFile] = useState<File>(new File([], ''));
  const [isExpanded, setIsExpanded] = useState(false);
  const [postText, setPostText] = useState("");
  const { make } = usePost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (postText.trim()) {
      make(postText, file).then(feed);
      setPostText("");
      setFile(new File([], ''));
      setIsExpanded(false);
    }
  };

  return (
    <div className={`create-post-container ${isExpanded ? "expanded" : ""}`}>
      {!isExpanded ? (
        <button className="create-post-button" onClick={() => setIsExpanded(true)} aria-label="Criar nova publicação">
          Criar publicação
        </button>
      ) : (
        <form className="create-post-form" onSubmit={handleSubmit}>
          <h3>Nova publicação</h3>

          <div className="form-group">
            <label htmlFor="post-text">O que você está pensando?</label>
            <textarea
              id="post-text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Compartilhe seus pensamentos..."
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image-url">Adicione uma imagem</label>
            <input
              type="file"
              id="image-url"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] as File)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {/* <small>Deixe em branco para usar uma imagem aleatória</small> */}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => setIsExpanded(false)}>
              Cancelar
            </button>
            <button type="submit" className="submit-button" disabled={!postText.trim()}>
              Publicar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
