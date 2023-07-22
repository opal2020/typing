import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import MainList from "./pages/main/index";
import TypingBox from "./pages/main/typing";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
  html * {
    font-family: 'Courier New', Courier, monospace;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainList />}></Route>
          <Route exact path="/:title" element={<TypingBox />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
