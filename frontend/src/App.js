import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    sepalLength: '',
    sepalWidth: '',
    petalLength: '',
    petalWidth: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    const features = [
      parseFloat(formData.sepalLength),
      parseFloat(formData.sepalWidth),
      parseFloat(formData.petalLength),
      parseFloat(formData.petalWidth),
    ];
    try {
      const response = await fetch('http://34.121.15.228:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({features}),
      });
      const data = await response.json();
      setResult(data.fish_prediction);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1>Iris Flower Species Prediction</h1>
      <form onSubmit={handlePredict}>
        {['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'].map((field) => (
            <div key={field} style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    step="0.1"
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
            </div>
        ))}
        <button type="submit" disabled={loading} style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        }}>
            {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      {result && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
        }}>
          <h3>Prediction:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;