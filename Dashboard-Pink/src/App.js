import SideBar from './components/SideBar/SideBar';
import './App.css';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';

function App () {
  return (
    <div className="App">
      <div className="AppGlass">
        <SideBar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
}

export default App;
