import { useState, useEffect, useRef, useCallback } from 'react';

export default function useInfiniteScroll(loadMoreItems, initialLoad = true) {
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    loadMoreItems().finally(() => setLoading(false));
  }, [loading, loadMoreItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    if (initialLoad) {
      loadMore();
    }
  }, [initialLoad, loadMore]);

  return { observerRef, loading };
}
