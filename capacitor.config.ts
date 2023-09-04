import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'frontend',
  webDir: 'build',
  bundledWebRuntime: false,
  "plugins": {
    "GoogleAuth": {
    "scopes": ["profile","email"],
    "server,ClientId": "460966774556-rgs235dallr59b9j9cgotibj46pd9f1t.apps.googleusercontent.com"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
    }
};

export default config;