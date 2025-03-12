import { Amplify } from "aws-amplify";

const config = {
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_AMPLIFY_API_URL, // Ensure this is set in your `.env`
      region: process.env.NEXT_PUBLIC_AWS_REGION, // Your AWS region
      defaultAuthMode: "apiKey", // Change this if you're using IAM or Cognito
      apiKey: process.env.NEXT_PUBLIC_AMPLIFY_API_KEY, // Ensure this is set
    },
  },
};

export default config;
