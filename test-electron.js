const { app } = require('electron');

console.log('Electron app object:', app);
console.log('App type:', typeof app);

if (app) {
  console.log('App methods available:', Object.getOwnPropertyNames(app));
} else {
  console.log('App is undefined!');
}
