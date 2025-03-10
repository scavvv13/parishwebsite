import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret(
          "1097591090435-v187aa2bt0t6s8mo00hpat1kfrinacbo.apps.googleusercontent.com"
        ),
        clientSecret: secret("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"),
      },

      callbackUrls: ["http://localhost:3000/"],
      logoutUrls: ["http://localhost:3000"],
    },
  },
});
