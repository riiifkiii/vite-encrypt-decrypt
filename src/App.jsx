import { useState } from "react";
import CryptoJS from "crypto-js";

function App() {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [processedMessage, setProcessedMessage] = useState();
  const [mode, setMode] = useState("Encrypt");
  const [copyMessage, setCopyMessage] = useState(false);

  const encrypt = () => {
    const encrypted = CryptoJS.AES.encrypt(message, key);
    setProcessedMessage(encrypted);
  };

  const decrypt = () => {
    const decrypted = CryptoJS.AES.decrypt(message, key);

    if (decrypted.sigBytes < 1) {
      alert("Invalid Key!");
      return;
    }

    setProcessedMessage(decrypted.toString(CryptoJS.enc.Utf8));
  };

  const process = () => {
    if (message === "") {
      alert("Please enter a message.");
      document.getElementById("message").focus();
      return;
    }

    if (key === "") {
      alert("Please enter a key.");
      document.getElementById("key").focus();
      return;
    }

    if (mode === "Encrypt") {
      encrypt();
      setCopyMessage(true);
      return;
    }

    if (mode === "Decrypt") {
      decrypt();
      return;
    }
  };

  const copy = () => {
    try {
      if (processedMessage) {
        navigator.clipboard.writeText(processedMessage);
        alert("Text copied to clipboard!");
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center h-screen w-full">
        <div className="w-[500] p-5 bg-slate-900/80 backdrop-blur border-slate-100 border shadow-lg">
          <div className="mb-5 text-center font-bold text-white">
            <h1>Make sure your message safe!</h1>
          </div>
          <div>
            <div className={"flex items-center justify-center *:p-2 mb-2"}>
              <button
                className={mode === "Encrypt" ? "bg-slate-200" : "bg-white"}
                onClick={() => {
                  setMode("Encrypt");
                  setMessage("");
                  setKey("");
                  setProcessedMessage("");
                }}
              >
                Encrypt
              </button>
              <button
                className={mode === "Decrypt" ? "bg-slate-200" : "bg-white"}
                onClick={() => {
                  setMode("Decrypt");
                  setMessage("");
                  setKey("");
                  setProcessedMessage("");
                  setCopyMessage(false);
                }}
              >
                Decrypt
              </button>
            </div>
            <div>
              <div className="*:p-2 flex items-center justify-center gap-2 mb-5">
                <input
                  type="text"
                  name="message"
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  placeholder={mode + " your message!"}
                  autoComplete={false}
                  required
                />
                <input
                  className="w-[100px]"
                  type="password"
                  name="key"
                  id="key"
                  onChange={(e) => setKey(e.target.value)}
                  value={key}
                  placeholder="Your key!"
                  autoComplete={false}
                  required
                />
              </div>
              <div>
                <textarea
                  className="w-full h-[200px] p-2"
                  name="processedMessage"
                  id="processedMessage"
                  value={processedMessage}
                  disabled
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  className={
                    "py-2 px-5 bg-red-500 " + (copyMessage ? "block" : "hidden")
                  }
                  onClick={copy}
                >
                  Copy
                </button>
                <button className="py-2 px-5 bg-blue-500" onClick={process}>
                  Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
