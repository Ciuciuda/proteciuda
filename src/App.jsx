import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import MainPage from "./views/MainPage/MainPage";
import Results from "./views/Results/Results";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "./App.css";

function App() {
  const [sequence, setSequence] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage setSequence={setSequence}/>}/>
        <Route path="/results" element={<Results sequence={sequence}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
