interface EnvConfig {
    apiUrl?: string;
  }
  
  // Extend the Window interface to include the `__env` property
  interface Window {
    __env?: EnvConfig;
  }
  