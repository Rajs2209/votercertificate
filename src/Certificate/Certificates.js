import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <div>
            <canvas ref={canvasRef} style={{ display: 'block', margin: 'auto', height: '80vh', width: '80%' }}></canvas>
        </div>
    );
};

export default Certificates;
