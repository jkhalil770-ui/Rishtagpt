/* Premium Glassmorphic Login Sheet — VIP Matrimonial aesthetic */

function LoginSheet({ open, onClose, onLoginSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  if (!open) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await window.RG_Firebase.loginWithGoogle();
      if (user) {
        onLoginSuccess(user);
      }
    } catch (err) {
      console.error(err);
      setError("Login fail ho gaya. Internet connection ya credentials check karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="cdd-sheet-backdrop"
        style={{ zIndex: 120 }}
        onClick={!loading ? onClose : undefined}
      />

      {/* Slide Up Sheet */}
      <div
        className="cdd-sheet"
        style={{
          zIndex: 121,
          background: "linear-gradient(180deg, #0d1222 0%, #060812 100%)",
          borderTop: "1px solid rgba(201, 168, 76, 0.45)",
          boxShadow: "0 -15px 45px -5px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div className="cdd-handle" />

        <div className="px-6 pt-5 pb-7 flex flex-col items-center text-center">
          {/* Logo medallion with golden glow */}
          <div className="mb-6 relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px dashed rgba(201,168,76,0.3)",
              animation: "spin-slow 20s linear infinite",
            }}/>
            <div style={{
              position: "absolute",
              inset: "15%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,168,76,0.45) 0%, transparent 70%)",
              filter: "blur(16px)",
              pointerEvents: "none",
            }}/>
            <LogoSmall size={86}/>
          </div>

          {/* Title & subtitle */}
          <h3
            className="font-display text-[25px] leading-tight gold-text font-semibold mb-2"
            style={{ textShadow: "0 0 20px rgba(201,168,76,0.15)" }}
          >
            Matrimonial Biodata Save Karein
          </h3>
          <p className="font-urdu text-[14px] text-[#E8B4A0] leading-loose mb-3" style={{ direction: "rtl" }}>
            اپنا شاندار رشتہ بائیو ڈاون لوڈ اور فیملی کے ساتھ واٹس ایپ پر شیئر کریں
          </p>

          <p className="text-[13px] leading-relaxed mb-7 max-w-[340px]" style={{ color: "var(--ink-soft)" }}>
            Apna high-definition PDF biodata card download karne aur WhatsApp par instant share karne ke liye Google account se login karein.
          </p>

          {/* Error Message */}
          {error && (
            <div
              className="w-full p-3 rounded-xl text-[12px] mb-5 font-medium border text-center"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "#ff7575",
              }}
            >
              {error}
            </div>
          )}

          {/* Premium Google Sign-In Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full rounded-2xl py-3.5 px-6 flex items-center justify-center gap-3 text-[15px] font-semibold transition-all relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #161b30 0%, #0c0f1d 100%)",
              color: "var(--ink)",
              border: "1px solid rgba(201, 168, 76, 0.5)",
              boxShadow: "0 8px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
            }}
          >
            {loading ? (
              <svg viewBox="0 0 50 50" width="18" height="18" style={{ animation: "spin-slow 1s linear infinite" }}>
                <circle cx="25" cy="25" r="20" stroke="var(--gold-2)" strokeOpacity="0.3" strokeWidth="5" fill="none" />
                <circle cx="25" cy="25" r="20" stroke="var(--gold-2)" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="40 80" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.6-4.53-2.6-4.53z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
            )}
            {loading ? "Connecting securely..." : "Sign in with Google"}
          </button>

          {/* Bottom security assurance */}
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--ink-dim)" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Google Authorized &amp; Secure Authentication
          </div>
        </div>
      </div>
    </>
  );
}

window.LoginSheet = LoginSheet;
