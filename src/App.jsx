import { useCallback, useEffect, useState } from "react";
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllow, setNumberAllow] = useState(false);
  const [isCharecterAllow, setCharecterAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllow) str += "1234567890";
    if (isCharecterAllow) str += "~!@#$%^&*()";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isCharecterAllow, isNumberAllow]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isCharecterAllow, isNumberAllow, passwordGenerator]);

  return (
    <>
      <div>
        <h1>Password Generator</h1>
        <div>
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly // Make this field read-only since it should not be edited manually
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(password);
              alert("Password copied to clipboard!");
            }}
          >
            Copy
          </button>
        </div>
        <div>
          <div>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))} // Use Number to ensure correct type
            />
            <label>Length: {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={isNumberAllow}
              onChange={() => setNumberAllow((prev) => !prev)}
            />
            <label>Allow Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={isCharecterAllow}
              onChange={() => setCharecterAllow((prev) => !prev)}
            />
            <label>Allow Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
