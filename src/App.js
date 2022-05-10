
import { useEffect, useState } from 'react';
import './App.css';
import Dock from './component/Dock';
import Finder from './component/Dock/Task/Finder';
import Header from './component/Header';
import Loading from './component/Loading/Loading';
import './MacOS/scss/styles.scss'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="App">
        <Loading />
      </div>
    );
  }
  return (
    <div className="App">
      <Header />
      <Dock />
      <Finder />
    </div>
  );
}

export default App;
