import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrimaryButton from './Components/PrimaryButton'; 

function App() {
    const [inputs, setInputs] = useState({
        temperature: '',
        co: '',
        no2: '',
        humidity: '',
        pop_density: ''
    });
    const [result, setResult] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handleClear = () => {
        setInputs({
            temperature: '',
            co: '',
            no2: '',
            humidity: '',
            pop_density: ''
        });
        setResult('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                temperature: parseFloat(inputs.temperature),
                co: parseFloat(inputs.co),
                no2: parseFloat(inputs.no2),
                humidity: parseFloat(inputs.humidity),
                pop_density: parseFloat(inputs.pop_density)
            })
        });
        const data = await response.json();
        setResult(data.prediction);
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100" style={{ backgroundImage: "url('/Air_pollution_2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="row w-75">
                <div className="col-md-6">
                    <div className="bg-white p-4 rounded" style={{ backgroundImage: "url('/Air_pollution_3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h1 className="mb-4 text-center" style={{ color: '#5e85c6', textShadow: '2px 2px 2px #000000' }}>Air Quality Prediction</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="temperature" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>Temperature</label>
                                <input type="text" id="temperature" name="temperature" className="form-control my-2" value={inputs.temperature} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="co" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>CO</label>
                                <input type="text" id="co" name="co" className="form-control my-2" value={inputs.co} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="no2" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>NO2</label>
                                <input type="text" id="no2" name="no2" className="form-control my-2" value={inputs.no2} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="humidity" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>Humidity</label>
                                <input type="text" id="humidity" name="humidity" className="form-control my-2" value={inputs.humidity} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pop_density" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>Population Density</label>
                                <input type="text" id="pop_density" name="pop_density" className="form-control my-2" value={inputs.pop_density} onChange={handleChange} />
                            </div>
                            <div className="text-center">
                                <PrimaryButton handleSubmit={handleSubmit} handleClear={handleClear} />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center" style={{ paddingLeft: '6rem' }}>
                    <div style={{ height: '300px' }}> 
                        {result && <h2 className="text-white mb-3 text-center">Air Quality is {result}</h2>}
                        {result === 'Good' && <img src="/Good.jpg" alt="Good Air Quality" className="img-fluid" />}
                        {result === 'Poor' && <img src="/Bad.jpg" alt="Bad Air Quality" className="img-fluid" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
