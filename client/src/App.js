import { Landing, Error, Register, ProtectedRoute } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
} from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/stats" element={<Stats></Stats>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/add-job" element={<AddJob></AddJob>}></Route>
          <Route path="/all-jobs" element={<AllJobs></AllJobs>}></Route>
        </Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
