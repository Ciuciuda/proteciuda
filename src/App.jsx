import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import MainPage from "./views/MainPage/MainPage"
import "./App.css";

function App() {
  async function greet() {
    const response = await invoke("rdFromKbrd", { sekwencja: name }); 
  }

  return (
    <div className="container">
      <MainPage></MainPage>
    </div>
  );
}

export default App;
