export enum Mode {
    AUTO = "automatik",
    STUFE_1 = "stufe 1",
    STUFE_2 = "stufe 2",
    STUFE_3 = "stufe 3",
    SCHLAF_MODUS = "schlafmodus",
}

export interface AirPurifierData {
    pm2_5: number;
    filter_status: number;
    mode: Mode;
}