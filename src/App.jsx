import "./App.css";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./auth/ProtectedRoute";
import PostPage from "./pages/PostPage";
import ViewPostPage from "./pages/ViewPostPage";
import ProfilePage from "./pages/ProfilePage";
import MyPostPage from "./pages/MyPostPage";
import SavedPostPage from "./pages/SavedPostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import InterestedPostPage from "./pages/InterestedPostPage";

function App() {
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <AppContent/>
        </Router>
      </ThemeProvider>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      {
        location.pathname !== '/' ? <Navbar /> : null 
      }
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/posts/create" element={<PostPage />} />
          <Route path="/posts/:id" element={<ViewPostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/myposts" element={<MyPostPage />} />
          <Route path="/interestedposts" element={<InterestedPostPage />} />
          <Route path="/savedposts" element={<SavedPostPage />} />
          <Route path="/posts/updatePost/:id" element={<UpdatePostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
