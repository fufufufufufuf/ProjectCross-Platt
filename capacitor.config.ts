import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "BudgetBuddy",
  bundledWebRuntime: false,
  webDir: "dist",
  plugins: {
    Camera: {
      sync: true
    }
  }
};

export default config;
