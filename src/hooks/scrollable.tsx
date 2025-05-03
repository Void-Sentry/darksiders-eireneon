import { useEffect } from "react";

export const useScrollableObserver = (
  callback: () => void,
  isLoading: boolean,
  sectionRef: React.RefObject<HTMLElement | null>,
  endRef: React.RefObject<HTMLElement | null>,
) => {
    useEffect(() => {
      const section = sectionRef.current;
      const target = endRef.current;
      if (!section || !target) return;
      if (section.scrollHeight <= section.clientHeight) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isLoading) {
            callback();
          }
        },
        { threshold: 1.0 }
      );

      observer.observe(target);
      return () => observer.disconnect();
    }, [sectionRef, endRef, callback, isLoading]);
};
