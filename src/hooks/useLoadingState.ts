import { useEffect, useState } from "react";

export const useLoadingState = (timeout: number = 2000) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), timeout);

    return () => clearTimeout(timer); 
  }, [timeout]);

  return isLoading;
};
