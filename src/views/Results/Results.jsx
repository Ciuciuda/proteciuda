import React, { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import "./Results.css"
import searchOutline from "./../../assets/Results/search-outline.svg"
import eyeOutline from "./../../assets/Results/eye-outline.svg"
import downloadOutline from "./../../assets/Results/download-outline.svg"
import dnaImage from "./../../assets/MainPage/dna.png"
// import Protein from '../../components/Protein/OldProtein'
import draw_peptide from '../../components/Protein/Protein'
import Modal from '../../components/Modal'

/*
interface IPorotein: {
  mass: str,
  isoelectricPoint: number,
  pHIndex: number,
  hydrophilicity: number
}
*/

const Results = ({ sequence }) => {
  const [currentShift, setCurrentShift] = useState(1);
  const [currentProtein, setCurrentProtein] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [proteinCount, setProteinCount] = useState(0);

  const translateShift = (currentShift) => {
    if (currentShift>0)
      return currentShift - 1;
    return Math.abs(currentShift) + 2; 
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await invoke("rdFromKbrd", {sekwencja: sequence});
      const parsedData = JSON.parse(data); 
      setProteinCount(parsedData[translateShift(currentShift)].length);
      setCurrentProtein(parsedData[translateShift(currentShift)][currentIndex]);
    }
    fetchData();
  }, [currentShift, currentIndex]);
  
  const [searchValue, setSearchValue] = useState("");
  const [modalState, setModalState] = useState(false);

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

  useEffect(() => {
    if (currentProtein)
      draw_peptide(currentProtein.bialko);
  }, [currentProtein]);
  
  return (currentProtein) ?(
    <div className='results'>
      <img className='results__bg' src={dnaImage} alt="" />
      <div className='results__sidebar'>
        <div className='results__searchbar'>
          <input type="number" value={searchValue} onChange={e => setSearchValue(e.target.value)} className='results__searchInput' placeholder='Szukaj' id=""/>
          <button className='results__searchBtn'>
            <img className='results__loupe' src={searchOutline} alt="" />
          </button>
        </div>
        <p className='results__title'>Białka</p>
        <div className='results__menu-line'>
          <div id='results__menu'>
            {
              [...Array(proteinCount)].map((el, index) => {
              return (
                <label 
                  className={!String(index).includes(String((parseInt(searchValue) - 1))) && searchValue != "" ? "d-none" : ""}
                  key={index}  
                >
                  
                  <input 
                    type="radio" 
                    name='results'
                    onClick={() => setCurrentIndex(index)}
                    value={index}
                    checked={index==currentIndex ? true : false}
                  />
                  <span>{index + 1}.</span>
                </label>
                );
            })}
          </div>
        </div>
      </div>
      <div className="results__shift">
        <button onClick={() => {setCurrentShift(currentShift == 1 ? -1 : clamp(currentShift - 1, -3, 3))}} className={"results__shift__btn" + (currentShift == -3 ? " --blocked" : "")}>{currentShift - 1 > 0 ? "+" : ""}{currentShift == 1 ? -1 : currentShift - 1}</button>
        <p className="results__shift__currentShift">{currentShift >= 0 ? "+" : ""}{currentShift}</p>
        <button onClick={() => {setCurrentShift(currentShift == -1 ? 1 : clamp(currentShift + 1, -3, 3))}} className={"results__shift__btn" + (currentShift == 3 ? " --blocked" : "")}>{currentShift + 1 >= 0 ? "+" : ""}{currentShift == -1 ? 1 : currentShift + 1}</button>
      </div>
      <div className="results__window">
        <div className="results__window__header">
          <h2>Sekwencja kodu białka</h2>
          <p>{currentProtein.bialko.slice(0, 14)} ...</p>
          <div>
            <button onClick={() => {setModalState(true)}}><img src={eyeOutline} alt="" /></button>
          </div>
        </div>
        <div className="results__window__box">
          <div>
            <div className="results__window__box__mass">
              <h2>Masa</h2>
              <p>{currentProtein.waga}</p>
            </div>
          </div>
          <div className="results__proteinbox">
            {
              (currentProtein) ?
              // <Protein formula={currentProtein[currentIndex]['bialka']}/>
              <canvas id='proteinator'></canvas>
              : <p>Loading...</p>
            }
          </div>
          <button className='results__window__btn'>Zobacz Wykresy I Diagramy</button>
        </div>
      </div>
      <Modal visible={modalState}>
        <div className="results__protein-text-box">
          <div className="results__protein-text-box__border">
            <p className="results__protein-text-box__textbox">{
              (currentProtein.bialko)
            }</p>
          </div>

          <button className='main-page__button' onClick={() => {setModalState(false)}}>Wyjdź</button>
        </div>
      </Modal>
    </div>
  ): (
    <div className='results'>
    <img className='results__bg' src={dnaImage} alt="" />
    <div className='results__sidebar'>
      <div className='results__searchbar'>
        <input type="number" value={searchValue} className='results__searchInput' placeholder='Szukaj' id=""/>
        <button className='results__searchBtn'>
          <img className='results__loupe' src={searchOutline} alt="" />
        </button>
      </div>
      <p className='results__title'>Białka</p>
      <div className='results__menu-line'>

      </div>
    </div>
    <div className="results__shift">
      <button onClick={() => {setCurrentShift(currentShift == 1 ? -1 : clamp(currentShift - 1, -3, 3))}} className={"results__shift__btn" + (currentShift == -3 ? " --blocked" : "")}>{currentShift - 1 > 0 ? "+" : ""}{currentShift == 1 ? -1 : currentShift - 1}</button>
      <p className="results__shift__currentShift">{currentShift >= 0 ? "+" : ""}{currentShift}</p>
      <button onClick={() => {setCurrentShift(currentShift == -1 ? 1 : clamp(currentShift + 1, -3, 3))}} className={"results__shift__btn" + (currentShift == 3 ? " --blocked" : "")}>{currentShift + 1 >= 0 ? "+" : ""}{currentShift == -1 ? 1 : currentShift + 1}</button>
    </div>
    <div className="results__window" style={{
      display: 'grid',
      placeItems: 'center'
    }}>
      <h2 style={{fontSize: '3em'}}>Brak białek dla tego przesunięcia</h2>
    </div>
  </div>
  );
}

export default Results