# DEVPILOT

## Firebase Authentication

1. Create a Firebase project and add a Web app in Project settings.
2. In **Authentication > Sign-in method**, enable **Email/Password**, **Google**, and **GitHub**.
3. Create a GitHub OAuth App. Set its authorization callback URL to `https://devpilot-bf020.firebaseapp.com/__/auth/handler`, then enter its client ID and client secret in the Firebase GitHub provider settings. Keep the client secret in Firebase Console; never put it in this frontend.
4. In **Authentication > Settings > Authorized domains**, add the domain where DevPilot will run. `localhost` is commonly already listed for local development.
5. Copy `.env.example` to `.env.local` and fill in the Firebase web app config values from Project settings.
6. Restart the Vite dev server after changing environment values.

The app supports email/password account creation and sign-in, Google and GitHub popup sign-in, persisted Firebase sessions, and sign-out. Firebase web config values are public client configuration; do not put service-account credentials or private keys in the frontend.