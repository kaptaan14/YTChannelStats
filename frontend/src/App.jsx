import Footer from "./components/Footer";
import ProfileCard from "./components/ProfileCard";
import SearchBox from "./components/SearchBox";
import VideoItem from "./components/VideoItems";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<SearchBox />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/top10videos" element={<VideoItem />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
