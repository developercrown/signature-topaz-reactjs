import React, { useEffect, useRef } from 'react';
import './style.css'

const SignatureCapture = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            // Configura el estado del tablet para capturar la firma
            window.SetTabletState(1, ctx, 50);

            // Lógica para finalizar la captura, por ejemplo, en un botón de "Guardar Firma"
            // window.SetTabletState(0, ...);
        }

        // Limpieza al desmontar el componente
        return () => {
            if (canvas && ctx) {
                window.SetTabletState(0, ctx, 50);
            }
        };
    }, []);

    const handleClearPanel = () => {
        window.ClearTablet()
    }

    return <div className="SignContainer">
        <div className="title">
            <p>Captura de Firma Digital</p>
        </div>
        <div className="top_controls">
            <button className="button_panel clean" onClick={handleClearPanel}>Limpiar</button>
            <button className="button_panel export" onClick={handleClearPanel}>Exportar</button>
            <button className="button_panel send" onClick={handleClearPanel}>Enviar</button>
        </div>
        <div className="sign-panel">
            <canvas ref={canvasRef} />

        </div>
        <div className="footer">
            <button className="button_panel cancel" onClick={handleClearPanel}>Cancelar</button>
        </div>
    </div>;
};

export default SignatureCapture;
