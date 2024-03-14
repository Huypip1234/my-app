import React, { useEffect } from 'react';

const useMounted = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return { isMounted };
};

export default useMounted;
