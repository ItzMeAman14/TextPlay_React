import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    },2000);
  }

  const toggleMode = () => {
    if(mode === 'light'){
      setMode("dark");
      document.body.style.backgroundColor = "#10223d";
      showAlert("Dark Mode is Enabled","success");
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light Mode is Enabled","success");
    }
  }
  return (
    <div className="App">

      <Router>
      <Navbar title="TextPlay" mode={mode} changeMode = {toggleMode}/>
      <Alert alert={alert}/>
      
      <div className='my-5'>
      <Routes>
          <Route exact path="/about" element={
            <About mode={mode} /> 
          }>
          </Route>
          <Route exact path="/" element={
            <TextForm heading="Enter text to analyze" showAlert={showAlert} mode={mode} />
          }>
          </Route>
      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
