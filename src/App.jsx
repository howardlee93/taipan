import IntroImage from './assets/intro.gif';
import './App.css'

function App() {

  return (
    <>
    <h1>
    TAIPAN! A game based on the China trade of the 1800s.
    </h1>
     <img src={IntroImage}/>
     <aside>
     <a href={'play'}>
      Click HERE to play
      </a>
      </aside>
    </>
  )
}

export default App
