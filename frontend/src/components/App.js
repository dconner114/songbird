import React from "react";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
import ProfilePage from "./ProfilePage";
import { 
  BrowserRouter as Router, 
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path ='/' element={<HomePage />}></Route>
        <Route path='/quiz' element={<QuizPage />}></Route>
        <Route path='/profile' element={<ProfilePage name="Dave"/>}></Route>
      </Routes>
    </Router>
  );
}