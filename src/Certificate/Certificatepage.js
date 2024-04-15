import React, { useEffect, useState } from 'react';
import Certificates from '../Certificate/Certificates';

const CertificatePage = () => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const formDataString = sessionStorage.getItem('formData');
        if (formDataString) {
            const formDataObj = JSON.parse(formDataString);
            setFormData(formDataObj);
        }
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <Certificates name={formData.name} option={formData.option} UniqueId={formData.UniqueId} />
                </div>
            </div>
        </>
    );
};

export default CertificatePage;
