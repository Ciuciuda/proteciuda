import React, { useRef, useState } from 'react'
import "./MainPage.css"
import dnaImage from "./../../assets/MainPage/dna.png"
import dnaCover from "./../../assets/MainPage/dna-cover.png"
import dnaText from "./../../assets/MainPage/text.png"
import Modal from "./../../components/Modal"
import { Link } from 'react-router-dom'

const MainPage = ({ setSequence }) => {
  const [modalState, setModalState] = useState(false);
  const seqInput = useRef(null);
  function handleSequenceSend() {
    setSequence(seqInput.current.value);
  }

  return (
    <div className={`main-page`}>
      <img src={dnaImage} alt="" className={`main-page__bg --blurred ${modalState ? '--vanished' : ''}`} />
      <img src={dnaImage} alt="" className="main-page__bg" />
      <img src={dnaText} alt="" className={`main-page__text ${modalState ? '--vanished' : ''}`} />
      <img src={dnaCover} alt="" className="main-page__bg" />
      <div className={`main-page__buttons-box ${modalState ? '--vanished' : ''}`}>
        <button className="main-page__button" onClick={() => setModalState(true)}>Wpisz</button>
        <button className="main-page__button --light" >Wgraj Plik</button>
      </div>
      <Modal visible={modalState}>
        <textarea ref={seqInput} name="user-input" className='user-input' placeholder='some text'></textarea>
        <div className="user-input__button__wrapper">
          <button className="main-page__button" onClick={() => setModalState(false)}>Wyjście</button>
          <Link to="/results" className="main-page__button --light" onClick={handleSequenceSend}>Wczytaj</Link>
        </div>
      </Modal>
    </div>
  )
}

export default MainPage;