import React from 'react'
import "./Results.css"
import searchOutline from "./../../assets/Results/search-outline.svg"
import dnaImage from "./../../assets/MainPage/dna.png"

const Results = () => {
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
      <div className="results__window">
        {/* results */}
      </div>
    </div>
  )
}

export default Results