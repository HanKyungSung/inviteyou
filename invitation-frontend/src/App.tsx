import { Routes, Route } from 'react-router-dom';
import './style/style.css';
import CardBuilder from './CardBuilder';
import Landing from './component/Landing';
import Login from './component/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/builder" element={<CardBuilder />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
}

export default App;
