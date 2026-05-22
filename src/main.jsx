import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Business & Personal Control Dashboard</h1>

      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px"
      }}>
        <h2>CEO Master Brain</h2>

        <textarea
          placeholder="Write business notes..."
          style={{
            width: "100%",
            height: "120px",
            marginTop: "10px"
          }}
        />

        <br /><br />

        <input type="file" multiple />

        <br /><br />

        <button
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Save CEO Data & Ask AI
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
