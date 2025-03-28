# Google OAuth Setup Instructions

This document provides step-by-step instructions to set up Google OAuth credentials in the Google Developer Console for your application.

## Prerequisites

- You need a **Google Cloud Platform (GCP)** account. If you don't have one, create an account at [https://console.cloud.google.com/](https://console.cloud.google.com/).
- You should have an existing project in the GCP console, or you can create a new one.

## Steps to Set Up Google OAuth in Google Developer Console

### 1. Go to Google Developer Console
- Open the Google Developer Console: [https://console.cloud.google.com/](https://console.cloud.google.com/).
- Sign in using your Google account if you're not already signed in.

### 2. Create a New Project (if you don't have one)
- On the top right, click the **Project dropdown** (next to the Google Cloud logo).
- Click **New Project**.
- Enter the name of your project, choose the billing account, and click **Create**.
- Once the project is created, select it.

### 3. Enable the Google Identity API
- In the **Search Bar** at the top, search for **Google Identity Platform**.
- Click on **Google Identity Platform**.
- Click **Enable** to enable the API for your project.

### 4. Set Up OAuth 2.0 Credentials
- In the left navigation panel, select **APIs & Services** > **Credentials**.
- Click **Create Credentials** and select **OAuth 2.0 Client IDs**.
- Select **Web application** as the application type.
- Under **Authorized JavaScript origins**, add the URL of your app (e.g., `http://localhost:3000` for local development).
- Under **Authorized redirect URIs**, add the redirect URI where Google should send the OAuth 2.0 responses. For local development, this might be something like `http://localhost:3000/oauth2callback` (make sure this matches your app's configuration).
- Click **Create**.

### 5. Configure OAuth Consent Screen
- Go to the **OAuth consent screen** tab.
- Select **External** as the user type (for testing purposes).
- Fill out the required fields such as **App name**, **User support email**, and **Developer contact information**.
- Click **Save and Continue**.

### 6. Get Your Client ID and Client Secret
- After successfully creating your credentials, you will see a **Client ID** and **Client Secret**.
- Copy the **Client ID** and **Client Secret**, and save them in a secure place.
- You will use the **Client ID** in your React app and the **Client Secret** on the backend (if needed).

### 7. Update Your Application
- In your React application, use the **Client ID** when configuring the Google login button. You can place this in a `.env` file or directly in your code (as shown in the example below).

### 8. Google OAuth Integration Example
- Install the required `@react-oauth/google` package in your React app:

    ```bash
    npm install @react-oauth/google
    ```

- Use the **Client ID** in your React application to configure Google Login:

    ```jsx
    import React from "react";
    import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

    const App = () => {
      return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <GoogleLogin
            onSuccess={(response) => console.log("Login Success:", response)}
            onError={() => console.log("Login Failed")}
          />
        </GoogleOAuthProvider>
      );
    };

    export default App;
    ```

    Replace `YOUR_GOOGLE_CLIENT_ID` with the actual Client ID from the Google Developer Console.

## Troubleshooting

1. **Invalid Redirect URI Error**: Ensure that the redirect URI in your Google Developer Console matches the one configured in your application.
2. **Client ID Mismatch**: Ensure that the **Client ID** you're using in your code is the correct one generated in the console.
3. **CORS issues**: If you encounter CORS errors, ensure your API server is configured to handle cross-origin requests appropriately, and that the Google OAuth configuration matches the domain you're deploying your application to.

## Conclusion
Once you've followed these steps, your Google OAuth integration should work seamlessly in your React app. The Google login button should allow users to sign in via their Google account, and you can use the response to authenticate them in your application.

For more information, check the [Google Identity Platform Documentation](https://developers.google.com/identity).
