import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import typingTextJson from "../../writings/groups.json";
import Margin from "../../components/Margin";

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

const TypingText = styled.div`
  font-size: 1.2rem;
  text-align: left;
  width: 100%;
  color: black;
  padding: 12px 0;
  line-height: 1.5;
`;

const YourTyping = styled.input`
  font-size: 1.2rem;
  width: 100%;
  color: white;
  border: none;
  outline: none;
  border-bottom: 1px solid lightgray;
  padding: 12px 0;
  background-color: transparent;
  caret-color: white;
  line-height: 1.5;
`;

const NextTypingText = styled.div`
  font-size: 1rem;
  text-align: left;
  width: 100%;
  color: #9c9c9c;
  padding: 12px 0;
  line-height: 1.5;
`;

const Header = styled.div`
  font-weight: bold;
  width: 100%;
  text-align: left;
  color: greenyellow;
`;

const Footer = styled.div`
  font-weight: bold;
  width: 100%;
  text-align: right;
  color: greenyellow;
`;

const TypingBox = () => {
  const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [fullTxtArr, setFullTxtArr] = useState([]);
  const [curTxtNum, setCurTxtNum] = useState(0);
  const [yourTyping, setYourTyping] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const curTime =
    new Date().toLocaleDateString() + " " + weekDay[new Date().getDay()];

  useEffect(() => {
    setFullTxtArr(typingTextJson[params.title].split("\n"));
  }, []);

  const TypingTextWrapper = useCallback(() => {
    const yourTypingCharArr = yourTyping.split("");
    const curTextCharArr = fullTxtArr[curTxtNum].split("");

    return curTextCharArr.map((r, i) => (
      <span
        key={i}
        style={{
          color:
            yourTypingCharArr[i] === curTextCharArr[i] ||
            yourTypingCharArr.length < i + 1
              ? yourTypingCharArr.length < i + 1
                ? "#b0b0b0"
                : "white"
              : "#ff6200",
        }}
      >
        {r}
      </span>
    ));
  }, [yourTyping, fullTxtArr, curTxtNum]);

  const handleTypingChange = (e) => {
    const val = e.target.value;
    if (!fullTxtArr[curTxtNum] || val.length > fullTxtArr[curTxtNum].length)
      return;
    setYourTyping(val);
  };

  const handleTypingKeyDown = (e) => {
    if (e.isComposing || e.keyCode === 229) return;

    const code = e.code;

    switch (code) {
      case "Enter":
        if (yourTyping === "ll") {
          navigate(-1);
          return;
        }
        if (fullTxtArr.length < curTxtNum + 2) {
          alert("End of text..");
        } else {
          setYourTyping("");
          setCurTxtNum((prev) => prev + 1);
        }
        break;
      case "ArrowUp":
        if (curTxtNum > 0) {
          setCurTxtNum((prev) => prev - 1);
          setYourTyping("");
        }
        break;
      case "ArrowDown":
        if (curTxtNum + 2 < fullTxtArr.length) {
          setYourTyping("");
          setCurTxtNum((prev) => prev + 1);
        } else {
          alert("End of text..");
        }
        break;
      default:
        break;
    }
  };

  return (
    <PageWrapper>
      <TypingBoxWrapper>
        <Header>{curTime}</Header>
        <Margin size={2} />
        <div>
          <TypingText>
            {fullTxtArr[curTxtNum] && <TypingTextWrapper />}
          </TypingText>
          <YourTyping
            autoFocus
            type="text"
            value={yourTyping}
            onChange={handleTypingChange}
            onKeyDown={handleTypingKeyDown}
          />
          <Margin size={2} />
          <NextTypingText>
            {fullTxtArr[curTxtNum + 1] ? fullTxtArr[curTxtNum + 1] : " "}
          </NextTypingText>
        </div>
        <Margin size={2} />
        <Footer>opal's typing test</Footer>
      </TypingBoxWrapper>
    </PageWrapper>
  );
};

export default TypingBox;
