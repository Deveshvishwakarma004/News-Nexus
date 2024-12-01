import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { 
  BrowserRouter, 
  Routes,
  Route,
  // Link
 } from 'react-router-dom';
 import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress , setProgress] = useState(0) 
    const pagesize = 9;
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
        <Routes>
          <Route exact path="/" element={<News setProgress ={setProgress}  key='general' pagesize={pagesize} country="in" category="general"/>}></Route>
          <Route exact path="/Business" element={ <News setProgress = {setProgress}  key='business'  pagesize={pagesize} country="in" category="business"/>}></Route>
          <Route exact path="/Entertainment" element={<News setProgress = {setProgress}  key='entertainment'  pagesize={pagesize} country="in" category="entertainment"/>}></Route>
          <Route exact path="/General" element={ <News setProgress = {setProgress}  key='general'  pagesize={pagesize} country="in" category="general"/>}></Route>
          <Route exact path="/Health" element={ <News setProgress = {setProgress}  key='health'  pagesize={pagesize} country="in" category="health"/>}></Route>
          <Route exact path="/Science" element={ <News setProgress = {setProgress}  key='science'  pagesize={pagesize} country="in" category="science"/>}></Route>
          <Route exact path="/Sports" element={ <News setProgress = {setProgress}  key='sports'  pagesize={pagesize} country="in" category="sports"/>}></Route>
          <Route exact path="/Technology" element={ <News setProgress = {setProgress}   key='technology}>' pagesize={pagesize} country="in" category="technology"/>}></Route>

        </Routes>
        </BrowserRouter>
      </div>
    )
  }
 export default App;


