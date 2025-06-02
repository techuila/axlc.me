import { useEffect, useState } from 'react';

import { Loader } from '@/partials/Loader';
import Portfolio from '@/partials/Portfolio';
import { type StoreState, useStore } from '@/store';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const setCurrentScene = useStore(
    (state: StoreState) => state.setCurrentScene
  );

  useEffect(() => {
    // Simulate loading assets
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            setCurrentScene(0);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [setCurrentScene]);

  return (
    <div className="relative min-h-screen w-full">
      {loading ? <Loader progress={progress} /> : <Portfolio />}
    </div>
  );
}

export default App;
