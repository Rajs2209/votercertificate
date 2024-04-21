import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Certificates = () => {
    const { name, option, UniqueId } = useParams();
    const canvasRef = useRef(null);
    const [maxWidth, setMaxWidth] = useState('100%');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMaxWidth('60%');
            } else {
                setMaxWidth('105%');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = '/certificatesimage.png';

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(name, 1401, 705);
            ctx.fillText(option, 667, 778);
            ctx.fillText(UniqueId, 420, 41);
        };
    }, [name, option, UniqueId]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = image;
        link.click();
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <canvas ref={canvasRef} style={{ maxWidth: maxWidth, height: 'auto' }}></canvas>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="d-flex justify-content-center mt-3">
                    <Button onClick={handleDownload}>Download Certificate</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Certificates;
