import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret(
          process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string
        ),
        clientSecret: secret(
          process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET as string
        ),
        scopes: ["profile", "email"],
      },

      callbackUrls: ["http://localhost:3000/"],
      logoutUrls: ["http://localhost:3000"],
    },
  },
});
