import React, { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import "./Results.css"
import searchOutline from "./../../assets/Results/search-outline.svg"
import dnaImage from "./../../assets/MainPage/dna.png"

/*
interface IPorotein: {
  mass: str,
  isoelectricPoint: number,
  pHIndex: number,
  hydrophilicity: number
}
*/
const Results = ({ sequence }) => {
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
  const [currentShift, setCurrentShift] = useState(0);
  const [currentProtein, setCurrentProtein] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await invoke("rdFromKbrd", {sekwencja: sequence});
      console.log(data)
      setCurrentProtein(data);
    }
    fetchData();
  }, [currentShift]);

  return (
    <div className='results'>
      <img className='results__bg' src={dnaImage} alt="" />
      <div className='results__sidebar'>
        <div className='results__searchbar'>
          <input type="text" className='results__searchInput' placeholder='Szukaj' id=""/>
          <button className='results__searchBtn'>
            <img className='results__loupe' src={searchOutline} alt="" />
          </button>
        </div>
        <p className='results__title'>Białka</p>
        <div className='results__menu-line'>
          <div id='results__menu'>
            <label><input type="radio" name='results'/><span>1.</span></label>
            <label><input type="radio" name='results'/><span>2.</span></label>
            <label><input type="radio" name='results'/><span>3.</span></label>
            <label><input type="radio" name='results'/><span>4.</span></label>
            <label><input type="radio" name='results'/><span>5.</span></label>
            <label><input type="radio" name='results'/><span>6.</span></label>
            <label><input type="radio" name='results'/><span>7.</span></label>
            <label><input type="radio" name='results'/><span>8.</span></label>
            <label><input type="radio" name='results'/><span>9.</span></label>
            <label><input type="radio" name='results'/><span>10.</span></label>
            <label><input type="radio" name='results'/><span>11.</span></label>
            <label><input type="radio" name='results'/><span>12.</span></label>
            <label><input type="radio" name='results'/><span>13.</span></label>
            <label><input type="radio" name='results'/><span>14.</span></label>
            <label><input type="radio" name='results'/><span>15.</span></label>
            <label><input type="radio" name='results'/><span>16.</span></label>
            <label><input type="radio" name='results'/><span>17.</span></label>
            <label><input type="radio" name='results'/><span>18.</span></label>
            <label><input type="radio" name='results'/><span>19.</span></label>
            <label><input type="radio" name='results'/><span>20.</span></label>
          </div>
        </div>
      </div>
      <div className="results__shift">
        <button onClick={() => {setCurrentShift(clamp(currentShift - 1, -2, 2))}} className={"results__shift__btn" + (currentShift == -2 ? " --blocked" : "")}>{currentShift - 1 >= 0 ? "+" : ""}{currentShift - 1}</button>
        <p className="results__shift__currentShift">{currentShift >= 0 ? "+" : ""}{currentShift}</p>
        <button onClick={() => {setCurrentShift(clamp(currentShift + 1, -2, 2))}} className={"results__shift__btn" + (currentShift == 2 ? " --blocked" : "")}>{currentShift + 1 >= 0 ? "+" : ""}{currentShift + 1}</button>
      </div>
      <div className="results__window">
        <p>
          {currentProtein}
        </p>
      </div>
    </div>
  )
}

export default Results