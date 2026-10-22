import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures every route transition automatically resets
 * the scroll position to the top of the viewport.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname, search]);

  return null;
}

