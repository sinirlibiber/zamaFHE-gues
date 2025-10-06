import React, { useState } from 'react';

function App() {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    // Ethers.js ile kontrata bağlan (gerçekte MetaMask entegrasyonu)
    setResult(`Tahminin: ${guess} (Şifreli gönderildi!)`);
    setGuess('');
  };

  return (
    <div>
      <h1>FHEGuess Clone</h1>
      <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="1-100 arası tahmin" />
      <button onClick={handleSubmit}>Tahmin Et (Şifreli)</button>
      <p>{result}</p>
    </div>
  );
}

export default App;