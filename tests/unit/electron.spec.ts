import { testWithSpectron } from 'vue-cli-plugin-electron-builder';

jest.setTimeout(50000);

test('Window Loads Properly', (done) => {
  testWithSpectron().then(({ app, stopServe }) => {
    const win = app.browserWindow;
    const client = app.client;

    client.getWindowCount().then((winCount) => {
      expect(winCount).toBe(1);
      expect(win.isMinimized()).toBe(false);
      expect(win.isVisible()).toBe(true);

      const { width, height } = win.getBounds();
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
    });

    // @ts-ignore
    client.getText('.display-3').then((text) => {
      expect(/Dashboard/.test(text)).toBe(true);
      stopServe().then(() => done());
    });
  });
});

// test('Window Loads Properly', async (done) => {
//   // Wait for dev server to start
//   const { app, stopServe } = await testWithSpectron();
//   const win = app.browserWindow;
//   const client = app.client;
//
//   // Window was created
//   expect(await client.getWindowCount()).toBe(1);
//   // It is not minimized
//   expect(await win.isMinimized()).toBe(false);
//   // Window is visible
//   expect(await win.isVisible()).toBe(true);
//   // Size is correct
//   const { width, height } = await win.getBounds();
//   expect(width).toBeGreaterThan(0);
//   expect(height).toBeGreaterThan(0);
//   // App is loaded properly
//   // @ts-ignore
//   expect(/Dashboard/.test(await client.getText('.display-3'))).toBe(true);
//   await stopServe();
//   done();
// });
