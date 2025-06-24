import React, { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useLocation, useNavigate } from 'react-router-dom';

function Scanner() {
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleScan = async () => {
    const qrRegion = 'reader';
    setStatus('Scanning...');

    try {
      const scanner = new Html5Qrcode(qrRegion);

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250,
        },
        (decodedText) => {
          scanner.stop();
          setResult(decodedText);
          processScan(decodedText);
        },
        (err) => {
          console.warn('Scan error:', err);
        }
      );
    } catch (err) {
      console.error('Camera init error', err);
      setStatus('Error accessing camera.');
    }
  };

  const processScan = (code) => {
    // Expected: orderId
    let orderId, itemIds;
    if (location.state && location.state.orderId && location.state.itemIds) {
      orderId = location.state.orderId;
      itemIds = location.state.itemIds;
    } else {
      orderId = code;
      // Fallback: try to get items from orders
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const found = orders.find(o => o._id === orderId);
      itemIds = found ? found.items.map(i => i.id) : [];
    }

    // Check if already received
    const alreadyReceived = itemIds.every(id => localStorage.getItem(`received_${orderId}_${id}`) === 'true');
    if (alreadyReceived) {
      setStatus('⚠️ Already Received!');
      setTimeout(() => navigate('/orders', { state: { received: false } }), 1200);
    } else {
      // Mark all as received
      itemIds.forEach(id => localStorage.setItem(`received_${orderId}_${id}`, 'true'));
      setStatus('✅ All items marked as received!');
      setTimeout(() => navigate('/orders', { state: { received: true } }), 1200);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Canteen QR Scanner</h2>
      <div id="reader" style={styles.readerBox}></div>
      <button style={styles.button} onClick={handleScan}>Start Scan</button>
      {result && <p style={styles.result}>Scanned: {result}</p>}
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  readerBox: {
    width: '300px',
    height: '300px',
    margin: 'auto',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#3182ce',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  result: {
    marginTop: '15px',
    fontSize: '16px',
    color: '#4a5568',
  },
  status: {
    fontSize: '18px',
    marginTop: '10px',
    fontWeight: 'bold',
  },
};

export default Scanner;