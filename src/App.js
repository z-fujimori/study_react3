import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
import Head from './components/Head/Head';
import MoveButton from './components/MoveButton/MoveButton';
import Home from "./components/Home ";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Time25_5 from "./components/Time25_5/Time25_5";

function App() {
  return (
    <>
      <Head />

      <BrowserRouter>
        <div className="App">
          <Link to="/">Home</Link>
          <br />
          <Link to="/works">Works</Link>
          <br />
          <Link to="/3_9">Button</Link>
          <br />
          <Link to="/3_10">timer</Link>
          <br />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works/" element={<Works />} />
            <Route path="/3_9" element={<MoveButton />} />
            <Route path="3_10" element={<Time25_5 />} />
          </Routes>
        </div>
      </BrowserRouter>


    </>
  );
}

export default App;
