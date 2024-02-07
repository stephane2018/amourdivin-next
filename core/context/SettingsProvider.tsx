"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { SettingsModels } from "../interfaces/settings";
import { useGetGeneraleSettings, useGetSettings } from "@/hooks/useSettings";
import { IGeneralSettingsModels } from "../interfaces/general_settings";

// material

export interface settingsType {
  settings: SettingsModels;
  general_settings?: IGeneralSettingsModels;
}

// ----------------------------------------------------------------------

const SettingsProviderContext = createContext<settingsType | null>(null);

const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: general_settings } = useGetGeneraleSettings(1);
  const { data: settings, error } = useGetSettings(1);
  const [config, setconfig] = useState<settingsType | null>(null);
  // console.log(error);

  useEffect(() => {
    if (
      general_settings &&
      general_settings.documents !== undefined &&
      settings &&
      settings.documents !== undefined
    ) {
      setconfig({
        settings: settings.documents[0],
        general_settings: general_settings.documents[0],
      });
    }
  }, [general_settings, settings]);

  return (
    <SettingsProviderContext.Provider value={config}>
      {children}
    </SettingsProviderContext.Provider>
  );
};

export { SettingsProvider, SettingsProviderContext };
