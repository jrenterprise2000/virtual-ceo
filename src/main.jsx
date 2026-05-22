import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xkowipbzlxftxangvaic.supabase.co";
const SUPABASE_KEY = "sb_publishable_8vHTWOfA_MMiD5T8oWJ7rQ_gMmYq0YP";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const sections = [
  "Rana Vai Personal",
  "J R Enterprise",
  "Kathuriya Wood Section",
  "Kathuriya CNC Section",
  "Rajshahi Section",
  "Others",
  "Research & Development",
  "CEO Master Brain",
];

function App() {
  const [selectedSection, setSelectedSection] = useState("CEO Master Brain");
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setMessage("Saving...");

    try {
      await supabase.from("ceo_notes").insert({
        section_name: selectedSection,
        note: note || "Attachment only.",
      });

      const uploadedFiles = [];

      for (const file of files) {
        const filePath = `${selectedSection}/${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
          .from("uploads")
          .upload(filePath, file);

        if (error) throw error;

        const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);

        await supabase.from("ceo_files").insert({
          file_name: file.name,
          file_url: data.publicUrl,
          section_name: selectedSection,
        });

        uploadedFiles.push(file.name);
      }

      const newLog = {
        id: Date.now(),
        section: selectedSection,
        note: note || "No text note. Attachment only.",
        files: uploadedFiles,
        time: new Date().toLocaleString(),
      };

      setLogs([newLog, ...logs]);
      setNote("");
      setFiles([]);
      setMessage("CEO data saved to Supabase successfully ✅");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial", background: "#f4f6f8", minHeight: "100vh" }}>
      <h1>Business & Personal Control Dashboard</h1>
      <p>Virtual CEO operating system for Rana Vai, J R Enterprise and Kathuriya.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 15, marginTop: 25 }}>
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            style={{
              background: selectedSection === section ? "#111827" : "white",
              color: selectedSection === section ? "white" : "black",
              padding: 18,
              borderRadius: 12,
              border: "1px solid #ddd",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <h3>{section}</h3>
            <p style={{ fontSize: 14 }}>AI monitored section</p>
          </button>
        ))}
      </div>

      <div style={{ background: "white", border: "1px solid #ccc", padding: 20, borderRadius: 12, marginTop: 25 }}>
        <h2>{selectedSection}</h2>

        <textarea
          placeholder="Write business notes, pressure, payment, production, personal task or decision..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: "100%", height: 130, padding: 12, borderRadius: 8 }}
        />

        <br /><br />

        <input
          type="file"
          multiple
          accept="application/pdf,image/*"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />

        {files.length > 0 && (
          <ul>
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        )}

        <br />

        <button
          onClick={handleSave}
          style={{
            padding: "12px 22px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Save CEO Data & Ask AI
        </button>

        <p style={{ marginTop: 15, color: message.startsWith("Error") ? "red" : "green" }}>
          {message}
        </p>
      </div>

      <div style={{ marginTop: 25 }}>
        <h2>Saved CEO Logs</h2>

        {logs.length === 0 ? (
          <p>No saved logs yet.</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} style={{ background: "white", padding: 15, borderRadius: 10, border: "1px solid #ddd", marginBottom: 12 }}>
              <small>{log.time}</small>
              <h3>{log.section}</h3>
              <p>{log.note}</p>
              {log.files.length > 0 && <p><b>Files:</b> {log.files.join(", ")}</p>}
              <p><b>AI Suggestion:</b> আজকের top 3 কাজ, risk এবং next action আলাদা করুন।</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
