import { useState } from 'react'
import './App.css'
import bidhaaZetu from './bidhaa'

function App() {
  const [kikapu, setKikapu] = useState([]);
  const [tafuta, setTafuta] = useState("");
  const [onyeshaKikapu, setOnyeshaKikapu] = useState(false); // State Mpya

  // Ongeza
  const ongezaKwenyeKikapu = (bidhaa) => {
    setKikapu([...kikapu, bidhaa]);
    // Hatuhitaji alert tena, tutaona kwenye kikapu
  };

  // Ondoa
  const toaKwenyeKikapu = (namba) => {
    const kikapuKipya = [...kikapu];
    kikapuKipya.splice(namba, 1);
    setKikapu(kikapuKipya);
  };

  const jumlaBei = kikapu.reduce((jumla, item) => jumla + item.bei, 0);

  const bidhaaZilizochujwa = bidhaaZetu.filter((item) =>
    item.jina.toLowerCase().includes(tafuta.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* NAVBAR */}
      <nav style={{ background: '#222', color: '#fff', padding: '15px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ margin: 0 }}>📱 Duka la Simu</h2>
            
            {/* BUTTON YA KIKAPU */}
            <button 
                onClick={() => setOnyeshaKikapu(!onyeshaKikapu)}
                style={{ background: '#444', color: 'white', border: '1px solid #666', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                {onyeshaKikapu ? "Funga ❌" : `🛒 Kikapu (${kikapu.length})`} | 
                <span style={{ color: '#4caf50', marginLeft: '5px' }}> Tsh {jumlaBei.toLocaleString()}</span>
            </button>
        </div>

        {/* SEARCH BAR */}
        <input 
          type="text" 
          placeholder="🔍 Tafuta simu..." 
          value={tafuta}
          onChange={(e) => setTafuta(e.target.value)}
          style={{ width: '95%', padding: '10px', borderRadius: '5px', border: 'none' }}
        />
      </nav>

      {/* KIKAPU VIEW (Hiki kitaonekana KAMA onyeshaKikapu ni TRUE) */}
      {onyeshaKikapu && (
        <div style={{ background: '#fff', border: '2px solid #222', borderRadius: '10px', padding: '15px', marginTop: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
            <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Orodha Uliyochagua:</h3>
            
            {kikapu.length === 0 ? <p>Hakuna kitu bado...</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {kikapu.map((item, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                            <span>{item.jina}</span>
                            <div>
                                <strong>{item.bei.toLocaleString()}</strong>
                                <button onClick={() => toaKwenyeKikapu(index)} style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>X</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            
            <button style={{ width: '100%', background: 'green', color: 'white', padding: '15px', border: 'none', borderRadius: '5px', marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                Lipa: Tsh {jumlaBei.toLocaleString()} ✅
            </button>
        </div>
      )}

      {/* ORODHA YA BIDHAA */}
      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Bidhaa Zetu</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
        {bidhaaZilizochujwa.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', textAlign: 'center', background: 'white' }}>
            <img src={item.picha} alt={item.jina} style={{ width: '100%', height: '120px', objectFit: 'contain' }} />
            <h4>{item.jina}</h4>
            <p style={{ color: 'green', fontWeight: 'bold' }}>{item.bei.toLocaleString()}</p>
            <button onClick={() => ongezaKwenyeKikapu(item)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', width: '100%' }}>Weka +</button>
            </div>
        ))}
      </div>

    </div>
  )
}

export default App

