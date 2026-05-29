"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function CaptchaWrapper({ onVerify, captchaRef }) {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-ffffffffffff";

  return (
    <div className="flex justify-center my-4 w-full overflow-hidden">
      <HCaptcha
        ref={captchaRef}
        sitekey={siteKey}
        onVerify={onVerify}
        theme="dark"
      />
    </div>
  );
}
