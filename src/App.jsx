import { useState, useEffect } from 'react' // 1. Tumeongeza useEffect
import './App.css'
// import bidhaaZetu from './bidhaa' <-- HII HATUITUMII TENA

function App() {
  const [kikapu, setKikapu] = useState([]);
  const [tafuta, setTafuta] = useState("");
  const [onyeshaKikapu, setOnyeshaKikapu] = useState(false);
  
  // 2. STATE MPYA: Hapa ndipo bidhaa za mtandaoni zitakaa
  const [bidhaa, setBidhaa] = useState([]); 
  // 3. STATE YA LOADING: Ili tuonyeshe "Inapakua..." kabla data hazijafika
  const [loading, setLoading] = useState(true);

  // 4. HAPA NDIPO TUNAVUTA DATA (API CALL)
  useEffect(() => {
    // Hii link inatoa bidhaa feki za mazoezi
    fetch('https://fakestoreapi.com/products') 
      .then(res => res.json()) // Badilisha majibu kuwa JSON
      .then(data => {
        setBidhaa(data); // Weka data kwenye state yetu
        setLoading(false); // Zima loading, data zimefika
      })
      .catch(err => console.log("Kuna shida!", err)); // Ikifeli
  }, []); // Hii [] inamaanisha "Fanya mara moja tu App ikianza"

  const ongezaKwenyeKikapu = (item) => {
    setKikapu([...kikapu, item]);
  };

  const toaKwenyeKikapu = (namba) => {
    const kikapuKipya = [...kikapu];
    kikapuKipya.splice(namba, 1);
    setKikapu(kikapuKipya);
  };

  const jumlaBei = kikapu.reduce((jumla, item) => jumla + item.price, 0); // Note: API inatumia 'price' siyo 'bei'

  // Tunachuja bidhaa zilizopo kwenye STATE (siyo faili tena)
  const bidhaaZilizochujwa = bidhaa.filter((item) =>
    item.title.toLowerCase().includes(tafuta.toLowerCase()) // API inatumia 'title' siyo 'jina'
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* NAVBAR */}
      <nav style={{ background: '#222', color: '#fff', padding: '15px', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ margin: 0 }}>🌐 Duka la API</h2>
            
            <button 
                onClick={() => setOnyeshaKikapu(!onyeshaKikapu)}
                style={{ background: '#444', color: 'white', border: '1px solid #666', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
                {onyeshaKikapu ? "Funga ❌" : `🛒 Kikapu (${kikapu.length})`} | 
                <span style={{ color: '#4caf50', marginLeft: '5px' }}> ${jumlaBei.toFixed(2)}</span>
            </button>
        </div>

        <input 
          type="text" 
          placeholder="🔍 Tafuta bidhaa..." 
          value={tafuta}
          onChange={(e) => setTafuta(e.target.value)}
          style={{ width: '95%', padding: '10px', borderRadius: '5px', border: 'none' }}
        />
      </nav>

      {/* KIKAPU VIEW */}
      {onyeshaKikapu && (
        <div style={{ background: '#fff', border: '2px solid #222', borderRadius: '10px', padding: '15px', marginTop: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
            <h3>Orodha Uliyochagua:</h3>
            {kikapu.length === 0 ? <p>Hakuna kitu bado...</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {kikapu.map((item, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                            <span style={{width: '70%'}}>{item.title}</span>
                            <div>
                                <strong>${item.price}</strong>
                                <button onClick={() => toaKwenyeKikapu(index)} style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>X</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <button style={{ width: '100%', background: 'green', color: 'white', padding: '15px', border: 'none', borderRadius: '5px', marginTop: '10px', fontSize: '18px', fontWeight: 'bold' }}>
                Lipa: ${jumlaBei.toFixed(2)} ✅
            </button>
        </div>
      )}

      <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Bidhaa Mpya (Kutoka Internet)</h3>
      
      {/* 5. LOADING STATE: Onyesha hii kama data bado hazijafika */}
      {loading ? (
        <h2 style={{textAlign: 'center', color: 'blue'}}>Inapakua Bidhaa... Tafadhali subiri ⏳</h2>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
            {bidhaaZilizochujwa.map((item) => (
                <div key={item.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', textAlign: 'center', background: 'white' }}>
                <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                <h4 style={{ fontSize: '14px', height: '40px', overflow: 'hidden' }}>{item.title}</h4>
                <p style={{ color: 'green', fontWeight: 'bold' }}>${item.price}</p>
                <button onClick={() => ongezaKwenyeKikapu(item)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', width: '100%' }}>Weka +</button>
                </div>
            ))}
        </div>
      )}

    </div>
  )
}

export default App
