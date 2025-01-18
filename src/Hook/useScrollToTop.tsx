import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Custom Hook: useScrollToTop
const useScrollToTop = (): void => {
  const { pathname } = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]); 
};

export default useScrollToTop;
