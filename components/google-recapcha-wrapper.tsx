"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";
import settingsService from "@/core/services/settings.service";
import { storage } from "@/core/config/AppwriteConfig";
import { useGetSettings } from "@/hooks/useSettings";

async function getSettings() {
  try {
    const setting = await settingsService.get();
    const simple = storage.getFilePreview("logo", "logo-512");
    return {
      logo: simple,
      setting: setting?.documents[0] || null,
    };
  } catch (e) {
    return {
      logo: null,
      setting: null,
    };
  }
}
export default  function GoogleCaptchaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data:settings, error } = useGetSettings(1);
  const recaptchaKey: string | undefined = settings?.documents[0] ? settings.documents[0].
    process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
