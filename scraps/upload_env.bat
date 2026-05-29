@echo off
echo Adding Environment Variables to Vercel (Production & Preview)...

:: Production
call npx vercel env add NEXT_PUBLIC_GEMINI_API_KEY production --value AIzaSyBlTDxs0pH3iPRo4GaP0ehFZs6xlCCZKPw --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production --value AIzaSyCAuHw0kR6mlV382Qz9dAo3P8iD_Wg1Tic --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production --value rishtagpt-15ab6.firebaseapp.com --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production --value rishtagpt-15ab6 --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production --value rishtagpt-15ab6.firebasestorage.app --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production --value 1000733149485 --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production --value 1:1000733149485:web:a7393ad6e7741e0414aba4 --yes
call npx vercel env add NEXT_PUBLIC_HCAPTCHA_SITE_KEY production --value 10000000-ffff-ffff-ffff-ffffffffffff --yes

:: Preview
call npx vercel env add NEXT_PUBLIC_GEMINI_API_KEY preview --value AIzaSyBlTDxs0pH3iPRo4GaP0ehFZs6xlCCZKPw --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY preview --value AIzaSyCAuHw0kR6mlV382Qz9dAo3P8iD_Wg1Tic --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN preview --value rishtagpt-15ab6.firebaseapp.com --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID preview --value rishtagpt-15ab6 --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET preview --value rishtagpt-15ab6.firebasestorage.app --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID preview --value 1000733149485 --yes
call npx vercel env add NEXT_PUBLIC_FIREBASE_APP_ID preview --value 1:1000733149485:web:a7393ad6e7741e0414aba4 --yes
call npx vercel env add NEXT_PUBLIC_HCAPTCHA_SITE_KEY preview --value 10000000-ffff-ffff-ffff-ffffffffffff --yes

echo Done uploading all environment variables to Vercel!
