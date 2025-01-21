import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import PrimaryButton from './Components/PrimaryButton'; 

function App() {
    const [result, setResult] = useState('');

    const validationSchema = Yup.object({
        temperature: Yup.number().min(-50, 'Temperature must be at least -50°C').max(60, 'Temperature cannot exceed 60°C').required('Temperature is required'),
        co: Yup.number().min(0, 'CO cannot be negative').max(100, 'CO cannot exceed 100 ppm').required('CO is required'),
        no2: Yup.number().min(0, 'NO2 cannot be negative').max(1000, 'NO2 cannot exceed 1000 ppb').required('NO2 is required'),
        humidity: Yup.number().min(0, 'Humidity cannot be negative').max(100, 'Humidity cannot exceed 100%').required('Humidity is required'),
        pop_density: Yup.number().min(0, 'Population Density cannot be negative').max(100000, 'Population Density cannot exceed 100,000 people/km²').required('Population Density is required')
    });

    const formik = useFormik({
        initialValues: {
            temperature: '',
            co: '',
            no2: '',
            humidity: '',
            pop_density: ''
        },
        validationSchema, 
        onSubmit: async (values) => {
            const response = await fetch('https://air-quality-prediction-final-6.onrender.com/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    temperature: parseFloat(values.temperature),
                    co: parseFloat(values.co),
                    no2: parseFloat(values.no2),
                    humidity: parseFloat(values.humidity),
                    pop_density: parseFloat(values.pop_density)
                })
            });
            const data = await response.json();
            setResult(data.prediction); 
        }
    });

    const handleClear = () => {
        formik.resetForm();
        setResult(''); 
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100" style={{ backgroundImage: "url('/Air_pollution_2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="row w-75">
                <div className="col-md-6">
                    <div className="bg-white p-4 rounded" style={{ backgroundImage: "url('/Air_pollution_3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h1 className="mb-4 text-center" style={{ color: '#5e85c6', textShadow: '2px 2px 2px #000000' }}>Air Quality Prediction</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="temperature" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>Temperature (°C)</label>
                                <input 
                                    type="text" 
                                    id="temperature" 
                                    name="temperature" 
                                    className={`form-control my-2 ${formik.touched.temperature && formik.errors.temperature ? 'is-invalid' : ''}`} 
                                    value={formik.values.temperature} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                />
                                {formik.touched.temperature && formik.errors.temperature ? <div className="text-danger">{formik.errors.temperature}</div> : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="co" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>CO (ppm)</label>
                                <input 
                                    type="text" 
                                    id="co" 
                                    name="co" 
                                    className={`form-control my-2 ${formik.touched.co && formik.errors.co ? 'is-invalid' : ''}`} 
                                    value={formik.values.co} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                />
                                {formik.touched.co && formik.errors.co ? <div className="text-danger">{formik.errors.co}</div> : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="no2" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>NO2 (ppb)</label>
                                <input 
                                    type="text" 
                                    id="no2" 
                                    name="no2" 
                                    className={`form-control my-2 ${formik.touched.no2 && formik.errors.no2 ? 'is-invalid' : ''}`} 
                                    value={formik.values.no2} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                />
                                {formik.touched.no2 && formik.errors.no2 ? <div className="text-danger">{formik.errors.no2}</div> : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="humidity" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>Humidity (%)</label>
                                <input 
                                    type="text" 
                                    id="humidity" 
                                    name="humidity" 
                                    className={`form-control my-2 ${formik.touched.humidity && formik.errors.humidity ? 'is-invalid' : ''}`} 
                                    value={formik.values.humidity} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                />
                                {formik.touched.humidity && formik.errors.humidity ? <div className="text-danger">{formik.errors.humidity}</div> : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="pop_density" style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }}>Population Density (people/km²)</label>
                                <input 
                                    type="text" 
                                    id="pop_density" 
                                    name="pop_density" 
                                    className={`form-control my-2 ${formik.touched.pop_density && formik.errors.pop_density ? 'is-invalid' : ''}`} 
                                    value={formik.values.pop_density} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur} 
                                />
                                {formik.touched.pop_density && formik.errors.pop_density ? <div className="text-danger">{formik.errors.pop_density}</div> : null}
                            </div>
                            <div className="text-center">
                                <PrimaryButton handleSubmit={formik.handleSubmit} handleClear={handleClear} />
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
