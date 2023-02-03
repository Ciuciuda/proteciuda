import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import MainPage from "./views/MainPage/MainPage";
import Results from "./views/Results/Results";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "./App.css";

function App() {
  async function greet() {
    const response = await invoke("rdFromKbrd", { sekwencja: name }); 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/results" element={<Results/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
