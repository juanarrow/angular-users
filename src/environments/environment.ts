// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiJsonServer: 'http://localhost:3000',
  apiUrl: 'https://tasks-service-wysp.onrender.com/api',
  mapsKey: "AIzaSyD858KjCuS38H4f-soOHBMVQqyZoFAr7k0",
  firebase:{
    apiKey: "AIzaSyAWPFIVOBkzF7S6QKzvhwaPFtYMjMtrlII",
    authDomain: "tasks-43097.firebaseapp.com",
    projectId: "tasks-43097",
    storageBucket: "tasks-43097.appspot.com",
    messagingSenderId: "943257446031",
    appId: "1:943257446031:web:879146721db4da919b72fa",
    measurementId: "G-K6BS4FB7D8"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
