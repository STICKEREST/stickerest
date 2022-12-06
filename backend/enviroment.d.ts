declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_AUTH_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        SESSION_SECRET : string;
      }
    }
  }
  
  
  export {}