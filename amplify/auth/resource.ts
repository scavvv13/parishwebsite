import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret(
          "720197795289-60vncgq2h9jv2pvcb217vhc3ntmeeir3.apps.googleusercontent.com"
        ),
        clientSecret: secret("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"),
        scopes: ["profile", "email"],
      },

      callbackUrls: ["http://localhost:3000/"],
      logoutUrls: ["http://localhost:3000"],
    },
  },
});
