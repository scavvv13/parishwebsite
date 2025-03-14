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
        scopes: ["profile", "email", "openid"],
        attributeMapping: {
          email: "email",
          givenName: "given_name",
          familyName: "family_name",
          preferredUsername: "name",
        },
      },

      callbackUrls: [
        "http://localhost:3000",
        "https://madonnadeldivinoamoreparish-git-development-scaves-projects.vercel.app",
      ],
      logoutUrls: [
        "http://localhost:3000",
        "https://madonnadeldivinoamoreparish-git-development-scaves-projects.vercel.app",
      ],
    },
  },
});
