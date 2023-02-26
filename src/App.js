import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/home/Home";
import Guide from "./pages/guide/Guide";
import SignIn from "./pages/authen/SignIn";
import SignUp from "./pages/authen/SignUp";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Create from "./pages/home/create/Create";
import Play from "./pages/home/play/Play";
import Task from "./pages/home/play/task/Task";
import HighScore from "./pages/home/play/highscore/HighScore";
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    console.log(currentUser);
  });

  return (
    <div className="App">
      <Router>
        <Navbar user={user} setUser={setUser} setIsAuth={setIsAuth} />

        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/create" element={<Create user={user} />} />
          <Route path="/play" element={<Play user={user} />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/sign-in" element={<SignIn setIsAuth={setIsAuth} />} />
          <Route path="/sign-up" element={<SignUp setIsAuth={setIsAuth} />} />
          <Route path="/play/task/:id" element={<Task user={user} />} />
          <Route path="/play/highscore/:id" element={<HighScore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
