import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Watch from './pages/Watch';
import Upload from './pages/Upload';
import Channel from './pages/Channel';
import Dashboard from './pages/Dashboard';
import Playlists from './pages/Playlists';
import PlaylistDetail from './pages/PlaylistDetail';
import Tweets from './pages/Tweets';
import History from './pages/History';
import Liked from './pages/Liked';
import Subscriptions from './pages/Subscriptions';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages — no layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App pages — with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/watch/:videoId" element={
            <ProtectedRoute><Watch /></ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute><Upload /></ProtectedRoute>
          } />
          <Route path="/channel/:username" element={
            <ProtectedRoute><Channel /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/playlists" element={
            <ProtectedRoute><Playlists /></ProtectedRoute>
          } />
          <Route path="/playlist/:playlistId" element={
            <ProtectedRoute><PlaylistDetail /></ProtectedRoute>
          } />
          <Route path="/tweets" element={
            <ProtectedRoute><Tweets /></ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute><History /></ProtectedRoute>
          } />
          <Route path="/liked" element={
            <ProtectedRoute><Liked /></ProtectedRoute>
          } />
          <Route path="/subscriptions" element={
            <ProtectedRoute><Subscriptions /></ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute><Settings /></ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
