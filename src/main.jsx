import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  function handleSave() {
    setMessage("CEO data saved successfully ✅");
  }

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Business & Personal Control Dashboard</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <h2>CEO Master Brain</h2>

        <textarea
          placeholder="Write business notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            width: "100%",
            height: "120px",
            marginTop: "10px",
          }}
        />

        <br />
        <br />

        <input type="file" multiple />

        <br />
        <br />

        <button
          onClick={handleSave}
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Save CEO Data & Ask AI
        </button>

        <p style={{ marginTop: "20px", color: "green" }}>{message}</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
