import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ConfigPage() {
  const nav = useNavigate();
  const [label, setLabel] = useState("Click Me!");
  const [acts, setActs] = useState([]);

  // Load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("btnConfig"));
    if (saved) {
      setLabel(saved.label);
      setActs(saved.acts);
    }
  }, []);

  // Add action
  const addAct = () => {
    setActs([...acts, { type: "Alert", val: "" }]);
  };

  // Update action
  const updAct = (i, key, val) => {
    const list = [...acts];
    list[i][key] = val;
    setActs(list);
  };

  // Remove action
  const rmAct = (i) => {
    setActs(acts.filter((_, idx) => idx !== i));
  };

  // Save settings
  const save = () => {
    localStorage.setItem("btnConfig", JSON.stringify({ label, acts }));
    alert("Saved!");
  };

  return (
    <div>
      <h1>Config</h1>

      <label>Label:</label>
      <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />

      <h2>Actions</h2>
      {acts.map((act, i) => (
        <div key={i}>
          <select value={act.type} onChange={(e) => updAct(i, "type", e.target.value)}>
            <option value="Alert">Alert</option>
            <option value="Show Text">Show Text</option>
            <option value="Show Image">Show Image</option>
            <option value="Refresh">Refresh</option>
            <option value="Set Storage">Set Storage</option>
            <option value="Get Storage">Get Storage</option>
            <option value="Grow">Grow</option>
            <option value="Close">Close</option>
            <option value="Prompt">Prompt</option>
            <option value="Color">Change Color</option>
            <option value="Disable">Disable</option>
          </select>
          <input
            type="text"
            placeholder="Value"
            value={act.val || ""}
            onChange={(e) => updAct(i, "val", e.target.value)}
          />
          <button onClick={() => rmAct(i)}>X</button>
        </div>
      ))}

      <button onClick={addAct}>+ Add</button>
      <button onClick={save}>Save</button>
      <button onClick={() => nav("/output")}>Go</button>
    </div>
  );
}

export default ConfigPage;
