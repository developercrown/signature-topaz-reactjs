import { useCallback, useEffect, useRef, useState } from 'react';
import Lock from './icons/lock.svg';

import './style.css'

interface SignatureCaptureInterfaceOptions {
    onSuccess?: (data: string) => void
    onCancel?: () => void
}

const SignatureCapture = ({ onCancel, onSuccess }: SignatureCaptureInterfaceOptions) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [panelState, setPanelState] = useState<boolean>(true);
    const [penWidth, setPenWidth] = useState<number>(5);

    const setPanelStateAction = useCallback((newState: boolean) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (canvas && context) {
            // Configura el estado del tablet para capturar la firma
            window.SetTabletState(newState ? 1 : 0, context, 50);
            setPanelState(newState);
        }
        return {
            canvas,
            context
        }
    }, [setPanelState])

    useEffect(() => {
        updatePenWidth(5)
        setPanelStateAction(true);

        // Limpieza al desmontar el componente
        return () => {
            setPanelStateAction(false);
        };
    }, []);

    const updatePenWidth = (value: number = 3) => {
        window.SetDisplayPenWidth(value)
        setPenWidth(value)
    }

    const handleClearPanel = () => {
        window.ClearTablet()
    }

    const handleExport = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            // Utiliza toDataURL para obtener la imagen del canvas en formato JPG
            const imageDataUrl = canvas.toDataURL('image/jpeg', 1.0); // 1.0 es la calidad de la imagen, entre 0 y 1

            // Opción A: Mostrar la imagen JPG en la interfaz de usuario
            // Por ejemplo, podrías actualizar el estado con esta URL y usarla en un elemento <img> en tu JSX

            // Opción B: Permitir que el usuario descargue la imagen
            // Crea un elemento <a> temporal, configura su atributo 'href' con imageDataUrl y 'download' con el nombre de archivo deseado
            const downloadLink = document.createElement('a');
            downloadLink.href = imageDataUrl;
            downloadLink.download = 'firma.jpg'; // Nombre del archivo para descargar
            document.body.appendChild(downloadLink); // Necesario para que funcione en Firefox
            downloadLink.click();
            document.body.removeChild(downloadLink); // Limpia el enlace temporal
        }
    }

    const handleSend = () => {
        // Verifica si la función GetSigImageB64 está disponible
        if (window.GetSigImageB64) {
            // Usa GetSigImageB64 para obtener la firma en base64
            window.GetSigImageB64((base64Image: string) => {
                if (onSuccess) {
                    onSuccess(`data:image/png;base64,${base64Image}`);
                }
            });
        }
    }
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }

    const handleTogglePanelStatus = () => {
        setPanelStateAction(!panelState)
    }

    return <div className="SignContainer">
        <div className="title">
            <p>Captura de Firma Digital</p>
        </div>
        <div className="top_controls">
            <button className={"button_panel status " + (panelState && "active")} onClick={handleTogglePanelStatus}>{!panelState ? "Activar" : "Desactivar"}</button>
            <button className="button_panel clean" onClick={handleClearPanel}>Limpiar</button>
            <button className="button_panel export" onClick={handleExport}>Exportar</button>
            <button className="button_panel send" onClick={handleSend}>Enviar</button>
        </div>
        <div className="sign-panel">
            {!panelState && <img src={Lock} className="panel_lock" />}
            <canvas ref={canvasRef} />
        </div>
        <div className="footer">
            <p>Tamaño de pluma: <b>{penWidth}</b></p>
            <button className="button_panel cancel" onClick={handleCancel}>Cancelar</button>
        </div>
    </div>;
};

export default SignatureCapture;
