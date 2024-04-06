interface Window {
    SetTabletState: (state: number, ctx: any, time: number) => void;
    GetSigString: () => string;
    ClearTablet: () => string;
    // Añade aquí más funciones según sea necesario
}
