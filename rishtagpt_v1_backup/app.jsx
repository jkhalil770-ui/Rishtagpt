/* App root — screen routing */

const DEFAULT_DATA = {
  // Step 1
  name: "Aisha Imran",
  age: 25,
  gender: "girl",
  height: "5'4\"",
  city: "Lahore, Pakistan",
  complexion: "",
  // Step 2
  maslak: "Sunni — General",
  namaz: "regular",
  quran: "daily",
  hijab: "hijab",
  partnerDeen: "Practising",
  // Step 3
  degree: "Masters",
  institution: "LUMS",
  profession: "Software Engineer",
  employment: "Private",
  income: 6,
  // Step 4
  fatherStatus: "Alive",
  motherStatus: "Alive",
  fatherProf: "Retired Banker",
  brothers: 1,
  sisters: 2,
  famType: "moderate",
  residence: "own",
  biradari: "Sheikh",
  biradariSkip: false,
  // Step 5
  traits: ["Caring", "Religious", "Ambitious"],
  partnerAge: [26, 32],
  locPref: "Same country",
  note: "Looking for a Deen-conscious, kind-hearted partner.",
};

function App() {
  const [screen, setScreen] = React.useState("hero"); // hero | form | result
  const [premiumOpen, setPremiumOpen] = React.useState(false);
  const [data, setData] = React.useState(DEFAULT_DATA);
  const [resultKey, setResultKey] = React.useState(0);

  // Scroll to top on screen change
  React.useEffect(() => {
    const el = document.getElementById("root");
    if (el) el.scrollTop = 0;
  }, [screen]);

  return (
    <>
      <Particles />
      <PatternOverlay />

      <div className="relative z-10 flex flex-col" style={{ minHeight: "100dvh" }}>
        <Header
          onPremium={() => setPremiumOpen(true)}
          onHome={() => setScreen("hero")}
        />

        {screen === "hero" && (
          <HeroScreen onStart={() => setScreen("form")} />
        )}

        {screen === "form" && (
          <FormScreen
            data={data}
            setData={setData}
            onBack={() => setScreen("hero")}
            onSubmit={() => setScreen("result")}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            key={resultKey}
            data={data}
            onBack={() => setScreen("form")}
            onPremium={() => setPremiumOpen(true)}
            onRegen={() => setResultKey(k => k + 1)}
          />
        )}
      </div>

      <PremiumSheet open={premiumOpen} onClose={() => setPremiumOpen(false)} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
