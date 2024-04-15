import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Formuser = () => {
    const [formData, setFormData] = useState({
        UniqueId: '',
        name: '',
        phone: '',
        option: '',
    });
    const [counts, setCounts] = useState(() => {
        const localCounts = localStorage.getItem('counts');
        return localCounts ? JSON.parse(localCounts) : {
            राजमहल: 0,
            बोरिया: 0,
            बरहेट: 0
        };
    });

    const [checkbox, setCheckbox] = useState(false);
    const [submittedData, setSubmittedData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('counts', JSON.stringify(counts));
    }, [counts]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        const id = new Date().getTime().toString();
        setFormData({ ...formData, [name]: value, UniqueId: id });
    };

    const handleCheckbox = () => {
        setCheckbox(!checkbox);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkbox) {
            const existingData = submittedData.find(item => item.name === formData.name && item.phone === formData.phone && item.option === formData.option);
            if (!existingData) {
                navigate(`/certificate/${formData.name}/${formData.option}/${formData.UniqueId}`)
                setCounts(prevCounts => ({
                    ...prevCounts,
                    [formData.option]: prevCounts[formData.option] + 1
                }));
                setSubmittedData([...submittedData, { name: formData.name, phone: formData.phone, option: formData.option }]);

                localStorage.setItem('counts', JSON.stringify({
                    ...counts,
                    [formData.option]: counts[formData.option] + 1
                }));
            } else {
                window.alert('already exist');
            }
        } else {
            window.alert('Please enter your name and check the box before submitting.');
        }
    };


    return (
        <>
            <div style={{ padding: '20px' }}>
                <div className="container">
                    <div className="row">
                        <form onSubmit={handleSubmit} className="col border border-primary border-5 p-3 m-3" style={{ backgroundColor: '#9FE2BF' }}>
                            <h4>Please Submit Your Name To Take The Voter's Pledge</h4>
                            <div>
                                <input className="my-2 p-2 w-75" type="text" placeholder="जिला : साहिबगंज" readOnly={true} />
                            </div>

                            <div>
                                <select id="inputState" className="my-2 p-2 w-75" name="option" onChange={handleInput}>
                                    <option selected>--विधानसभा क्षेत्र--</option>
                                    <option>राजमहल</option>
                                    <option>बोरिया</option>
                                    <option>बरहेट</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    className="my-2 p-2 w-75"
                                    type="text"
                                    placeholder="नाम"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <input
                                    className="my-2 p-2 w-75"
                                    type="tel"
                                    placeholder="मोबाइल नंबर [10 अंक]"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInput}
                                />
                            </div>
                            <h5>मतदाता शपथ: "हम, भारत के नागरिक लोकतंत्र में अपनी पूर्ण आस्था रखते हुए यह शपथ लेते है कि हम अपने देश की लोकतांत्रिक परम्पराओं की मर्यादा को बनाये रखेंगे तथा स्वतंत्र, निष्पक्ष एवं शांतिपूर्ण निर्वाचन की गरिमा को अक्षुण्ण रखते हुए, निर्भीक होकर, धर्म, वर्ग, जाति, समुदाय, भाषा अथवा अन्य किसी भी प्रलोभन से प्रभावित हुए बिना सभी निर्वाचनों में अपने मताधिकार का प्रयोग करेंगें|"</h5>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="gridRadios"
                                    id="gridRadios1"
                                    value="option1"
                                    checked={checkbox}
                                    onChange={handleCheckbox}
                                />
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    मैंने प्रतिज्ञा ली है
                                </label>
                            </div>
                            <h5>( नोट: प्रतिज्ञा लेने के बाद कृपया उपरोक्त चेक बॉक्स पर क्लिक करें और फिर सबमिट पर क्लिक करें)</h5>
                            <div>
                                <button type="submit" className="btn btn-primary m-2 p-3">
                                    Submit/बटन क्लिक
                                </button>
                            </div>
                        </form>
                        <div class="col" >
                            <h6 style={{ textAlign: 'start' }}>कुल नागरिक जिनके द्वारा संकल्प पत्र भरा गया है। </h6>
                            <h6 style={{ textAlign: 'center' }}>{Object.values(counts).reduce((a, b) => a + b, 0)}</h6>
                            <div class="container" >
                                <div class="row row-cols-2" >
                                    <div class="col border border-primary border-5 p-4 m-3" >
                                        <h3 style={{ textAlign: 'center' }}>राजमहल <h3 style={{ textAlign: 'center' }}>{counts['राजमहल']}</h3></h3></div>
                                    <div class="col border border-primary border-5 p-4 m-3">
                                        <h3 style={{ textAlign: 'center' }}>बोरिया<h3 style={{ textAlign: 'center' }}>{counts['बोरिया']}</h3></h3></div>
                                    <div class="col border border-primary border-5 p-4 m-3">
                                        <h3 style={{ textAlign: 'center' }}>बरहेट <h3 style={{ textAlign: 'center' }}>{counts['बरहेट']}</h3></h3></div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div >
            </div>


        </>
    );
};

export default Formuser;
