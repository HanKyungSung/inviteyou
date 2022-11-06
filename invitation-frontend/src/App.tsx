import { Routes, Route } from 'react-router-dom';
import './style/style.css';
import CardBuilder from './CardBuilder';
import Landing from './component/Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/builder" element={<CardBuilder />} />
      <Route path="/Visual3" element={<CardBuilder />} />
    </Routes>
  );
}

export default App;
