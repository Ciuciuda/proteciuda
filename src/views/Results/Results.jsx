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
  const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
  const [currentShift, setCurrentShift] = useState(1);
  const [currentProtein, setCurrentProtein] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await invoke("rdFromKbrd", {sekwencja: sequence});
      console.log(data)
      setCurrentProtein(JSON.parse(data));
    }
    console.log(currentProtein)
    fetchData();
  }, [currentShift]);

  // console.log(sequence, currentProtein)
  // console.log(currentIndex)

  const buttons = []
  for (let i = 0; i < currentProtein.length; i++) {
    // if (searchValue == "") {
    //   buttons.push(i)
    // } else if (String(i).includes(String((parseInt(searchValue) - 1)))) {
    //   buttons.push(i)
    // }
    buttons.push(i)
  } 

  const setIndex = () => {
    setCurrentIndex(parseInt(document.querySelector('input[name="results"]:checked').value) - 1)
  }

  if (currentProtein.length > 0)
    draw_peptide(currentProtein[currentIndex]['bialka'])

  return (
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
            {buttons.map(el => {
              return <label className={!String(el).includes(String((parseInt(searchValue) - 1))) && searchValue != "" ? "d-none" : ""}><input type="radio" name='results' onClick={setIndex} value={el + 1}/><span>{el + 1}.</span></label>
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
          <p>{String(Object(currentProtein[currentIndex]).bialka).slice(0, 14)} ...</p>
          <div>
            <button onClick={() => {setModalState(true)}}><img src={eyeOutline} alt="" /></button>
            <button><img src={downloadOutline} alt="" /></button>
          </div>
        </div>
        <div className="results__window__box">
          <div>
            <div className="results__window__box__mass">
              <h2>Masa</h2>
              <p>{Object(currentProtein[currentIndex]).waga}</p>
            </div>
          </div>
          <div className="results__proteinbox">
            {
              // TODO: fix render protein
              (currentProtein.length > 0) ?
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
              (currentProtein[currentIndex] != null ? currentProtein[currentIndex]['bialka'] : "`1")
            }</p>
          </div>

          <button className='main-page__button' onClick={() => {setModalState(false)}}>Wyjdź</button>
        </div>
      </Modal>
    </div>
  )
}

export default Results