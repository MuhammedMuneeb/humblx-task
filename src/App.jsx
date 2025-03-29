import { Routes, Route } from 'react-router-dom';
import ConfigPage from './pages/ConfigPage';
import OutputPage from './pages/OutputPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ConfigPage />} />
      <Route path="/output" element={<OutputPage />} />
    </Routes>
  );
}

export default App;
