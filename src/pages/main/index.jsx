import styled from "styled-components";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import typingTextJson from "../../writings/groups.json";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const TypingBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 800px;
  background-color: black;
  border-radius: 12px;
  border: 2px solid lightgray;
  padding: 24px;
`;

const WritingTitle = styled.div`
  color: ${(props) => (props.current ? "greenyellow" : "white")};
  text-decoration: ${(props) => props.current && "underline"};
  padding: 12px 0;
`;

const MainList = () => {
  const writingsList = Object.keys(typingTextJson);
  const [curCursor, setCurCursor] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.isComposing || e.keyCode === 229) return;

      const code = e.code;

      switch (code) {
        case "Enter":
          navigate(`/${writingsList[curCursor]}`);
          break;
        case "ArrowUp":
          curCursor > 0 && setCurCursor((prev) => prev - 1);
          break;
        case "ArrowDown":
          curCursor + 1 < writingsList.length &&
            setCurCursor((prev) => prev + 1);
          break;
        default:
          break;
      }
    };
    const watchKeyDown = () => {
      document.addEventListener("keydown", handleKeyDown);
    };
    watchKeyDown();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const WritingsList = useCallback(() => {
    return writingsList.map((val, idx) => (
      <WritingTitle key={idx} current={curCursor === idx}>
        {val}
      </WritingTitle>
    ));
  }, [writingsList, curCursor]);

  return (
    <PageWrapper>
      <TypingBoxWrapper>
        <WritingsList />
      </TypingBoxWrapper>
    </PageWrapper>
  );
};

export default MainList;
