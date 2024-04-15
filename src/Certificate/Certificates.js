import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Certificates = () => {
    const { name, option, UniqueId } = useParams();
    const canvasRef = useRef(null);
    const [printed, setPrinted] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = '/certificateimage.png';

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(name, 1313, 705);
            ctx.fillText(option, 637, 784);
            ctx.fillText(UniqueId, 450, 40);

            if (!printed) {
                setPrinted(true);
                window.print();
            }
            setPrinted(false);
        };
    }, [name, option, UniqueId, printed]);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <canvas ref={canvasRef} style={{ maxWidth: '80%', height: 'auto' }}></canvas>
                </Col>
            </Row>
        </Container>
    );
};

export default Certificates;
