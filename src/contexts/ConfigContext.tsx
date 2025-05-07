
import type { ReactNode } from 'react';

import { useState, useEffect, useContext, createContext } from 'react';

type ConfigType = {
    domainName: string;
    getDmUserApi: string;
    getRecentDmApi: string;
    getDmProfileApi: string;
    editPermissionLink: string;
    requestPermissionLink: string;
};

const ConfigContext = createContext<ConfigType | null>(null);

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) throw new Error("useConfig must be used within a ConfigProvider");
    return context;
};

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<ConfigType | null>(null);

    useEffect(() => {
        const loadConfig = () => {
            const appConfig = (window as any).env;
            if (!appConfig) {
                console.error("Config not found on window");
                return;
            }
            setConfig(appConfig);
        };

        loadConfig();
    }, []);

    if (!config) return null; // Or loading spinner

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};
