import { Routes, Route } from 'react-router-dom';
import './style/style.css';
import CardBuilder from './CardBuilder';
import Landing from './component/Landing';
import Login from './component/Login';
import Register from './component/Register';
import HanSung from './component/HanSung';
import HanSungList from './component/HanSungList';
import * as Constants from './utils/Constants';

function App() {
  const { NODE_ENV } = process.env;
  const isDevelopment = NODE_ENV === 'development';
  const hostname = isDevelopment ? Constants.localhostUrl : Constants.prodhostUrl;
  const hostnames = isDevelopment ? Constants.localhostUrls : Constants.prodhostUrls;
  const subdomain = window.location.host.split('.')[0];

  // TODO: Checking this should be dynamic. Need to save it in the database.
  if (subdomain === 'we') {
    return (
      <Routes>
        <Route path="/" element={<HanSung subdomain={subdomain} />} />
        <Route path="/list" element={<HanSungList subdomain={subdomain} />} />
      </Routes>
    )
  } else if (subdomain === 'sne') {
    return (
      <div>Working in Progress</div>
    )
  } else if (!hostnames.includes(window.location.hostname)) {
    // If subdomain doesn't match to anything, we reset the url.
    window.location.replace(hostname);
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/builder" element={<CardBuilder />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

export default App;
