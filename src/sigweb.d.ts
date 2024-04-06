interface Window {
    SetTabletState: (state: number, ctx: any, time: number) => void;
    GetSigString: () => string;
    ClearTablet: () => void;
    GetSigImageB64: (data) => string;
    GetDisplayPenWidth: () => string;
    GetSigCompressionMode: () => string;
    GetTabletComPort: () => string;
    GetTabletComTest: () => string;
    GetTabletResolution: () => string;
    GetTabletState: () => string;
    Reset: () => void;
    SetDisplayPenWidth: (number: number) => void;
}
