export const environment = {
  environment: process.env.REACT_PUBLIC_ENVIRONMENT,
  isProduction: process.env.REACT_PUBLIC_ENVIRONMENT === "production",
  gitHubClientId: process.env.REACT_PUBLIC_GITHUB_CLIENT_ID,
  gitHubRedirectUri: process.env.REACT_PUBLIC_GITHUB_REDIRECT_URL,
  apiUrl: process.env.REACT_PUBLIC_API_URL,
  baseDomain: process.env.BASE_DOMAIN,
};
