import { useEffect } from 'react';

import Portfolio from '@/partials/Portfolio';
import { type StoreState, useStore } from '@/store';

function App() {
  const setCurrentScene = useStore(
    (state: StoreState) => state.setCurrentScene
  );

  useEffect(() => {
    // Initialize the first scene
    setCurrentScene(0);
  }, [setCurrentScene]);

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="animate-fadeIn relative min-h-screen w-full">
      <Portfolio />
    </div>
  );
}

export default App;
