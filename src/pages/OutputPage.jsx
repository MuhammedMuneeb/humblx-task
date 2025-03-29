import { useState, useEffect } from "react";

function OutputPage() {
  const [label, setLabel] = useState("Click Me!");
  const [acts, setActs] = useState([]);
  const [btnSize, setBtnSize] = useState(16);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [showText, setShowText] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  // Load config on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("btnConfig"));
    if (saved) {
      setLabel(saved.label);
      setActs(saved.acts);
    }
  }, []);

  // Handle button click
  const handleClick = () => {
    acts.forEach((act) => {
      if (act.type === "Alert") alert(act.val);
      if (act.type === "Show Text") setShowText(act.val);
      if (act.type === "Show Image") setImgUrl(act.val);
      if (act.type === "Refresh") window.location.reload();
      if (act.type === "Set Storage") localStorage.setItem(act.val, act.val);
      if (act.type === "Get Storage") setShowText(localStorage.getItem(act.val) || "Not Found");
      if (act.type === "Grow") setBtnSize((s) => s + 5);
      if (act.type === "Close") window.close();
      if (act.type === "Prompt") {
        const userInput = prompt(act.val);
        if (userInput) setShowText(userInput);
      }
      if (act.type === "Color") {
        document.getElementById("btn").style.background = act.val || `#${Math.floor(Math.random()*16777215).toString(16)}`;
      }
      if (act.type === "Disable") setBtnDisabled(true);
    });
  };

  return (
    <div>
      <h1>Output</h1>
      <button id="btn" onClick={handleClick} disabled={btnDisabled} style={{ fontSize: btnSize }}>
        {label}
      </button>
      {showText && <p>{showText}</p>}
      {imgUrl && <img src={imgUrl} alt="Loaded" width="200" />}
    </div>
  );
}

export default OutputPage;
