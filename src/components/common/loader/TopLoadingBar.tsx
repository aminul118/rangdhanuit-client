'use client';

import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { usePathname } from 'next/navigation';

const TopLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 200);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <LoadingBar
      color="#8b5cf6"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      height={3}
      shadow={true}
    />
  );
};

export default TopLoadingBar;
