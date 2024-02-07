import { useContext } from "react";
import { SettingsProviderContext } from "./SettingsProvider";

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsProviderContext);

export default useSettings;
