const { execSync } = require("child_process");

const envs = [
  { name: "NEXT_PUBLIC_GEMINI_API_KEY", value: "AIzaSyBlTDxs0pH3iPRo4GaP0ehFZs6xlCCZKPw" },
  { name: "NEXT_PUBLIC_FIREBASE_API_KEY", value: "AIzaSyCAuHw0kR6mlV382Qz9dAo3P8iD_Wg1Tic" },
  { name: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", value: "rishtagpt-15ab6.firebaseapp.com" },
  { name: "NEXT_PUBLIC_FIREBASE_PROJECT_ID", value: "rishtagpt-15ab6" },
  { name: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", value: "rishtagpt-15ab6.firebasestorage.app" },
  { name: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", value: "1000733149485" },
  { name: "NEXT_PUBLIC_FIREBASE_APP_ID", value: "1:1000733149485:web:a7393ad6e7741e0414aba4" },
  { name: "NEXT_PUBLIC_HCAPTCHA_SITE_KEY", value: "10000000-ffff-ffff-ffff-ffffffffffff" }
];

const targets = ["production", "preview"];

console.log("Starting environment variables upload to Vercel (piped mode)...");

for (const env of envs) {
  for (const target of targets) {
    try {
      console.log(`Adding ${env.name} to ${target}...`);
      // Run vercel CLI command wrapping with cmd.exe and piping standard streams
      const cmd = `cmd.exe /c "npx vercel env add ${env.name} ${target} --value ${env.value} --yes --force"`;
      const output = execSync(cmd, { stdio: "pipe", encoding: "utf-8" });
      console.log(`Success: ${env.name} added to ${target}`);
    } catch (err) {
      console.error(`Failed to add ${env.name} to ${target}:`, err.stdout || err.stderr || err.message);
    }
  }
}

console.log("All environment variables have been processed successfully!");
