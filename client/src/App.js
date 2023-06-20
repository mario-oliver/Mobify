import Landing from './pages/Landing';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>}></Route>
        <Route path="/register" element={<div>Dashboard</div>}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="*" element={<div>Error</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
