import {AirPurifierData, Mode} from "../models/airPurifierData";
import {createContext, useContext, useState} from "react";

interface AirPurifierContextType {
    airPurifierDataList: AirPurifierData[];
    updateMode: (index: number, newMode: Mode) => void;
}

const AirPurifierDataContext = createContext<AirPurifierContextType | undefined>(undefined);

export default function AirPurifierDataProvider({ children }: { children: React.ReactNode }) {
    const [airPurifierDataList, setAirPurifierDataList] = useState<AirPurifierData[]>([
        { pm2_5: 12, filter_status: 2800.00, mode: Mode.AUTO },
        { pm2_5: 67, filter_status: 2300.20, mode: Mode.STUFE_1 },
        { pm2_5: 120, filter_status: 555.23, mode: Mode.SCHLAF_MODUS }
    ]);

    const updateMode = (index: number, newMode: Mode) => {
        setAirPurifierDataList((prev) =>
            prev.map((item, i) =>
                i === index ? {...item, mode: newMode} : item
            )
        );
    }

    return (
        <AirPurifierDataContext.Provider value={{ airPurifierDataList, updateMode }}>
            {children}
        </AirPurifierDataContext.Provider>
    );
}

export function useAirPurifierData() {
    const context = useContext(AirPurifierDataContext);
    if (!context) {
        throw new Error("useAirPurifierData must be used within an AirPurifierDataProvider");
    }
    return context;
}