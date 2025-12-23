import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      login?: string;
    };
  }

  interface User {
    id: string;
    login?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    login?: string;
  }
}
