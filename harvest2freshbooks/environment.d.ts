declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HARVEST_ACCESS_TOKEN: string;
      HARVEST_ACCOUNT_ID: string;
      FRESHBOOKS_CLIENT_ID: string;
      FRESHBOOKS_CLIENT_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
