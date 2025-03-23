import "next-auth";

declare module "next-auth" {
  export interface Session {
    accessToken: string;
    userId: string;
    userName: string;
  }

  export interface JWT {
    accessToken: string;
    userId: string;
    userName: string;
  }

  export interface Profile {
    id: string;
    display_name: string;
    email?: string;
    external_urls: {
      spotify: string;
    };
    followers: {
      total: number;
    };
    images: Array<{
      height: number;
      width: number;
      url: string;
    }>;
  }
}
