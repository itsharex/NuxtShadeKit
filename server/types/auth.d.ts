declare module "#auth-utils" {
  interface User {
    // Add your own fields
    id: string;
    name: string;
    email: string;
    avatar: string;
  }

  // interface UserSession {
  //   // Add your own fields
  // }

  // interface SecureSessionData {
  //   // Add your own fields
  // }
}

export type OAuthProviderType = "github";

export interface OAuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: OAuthProviderType;
}
