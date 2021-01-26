
/* eslint-disable no-undef */
const testWithSpectron =  require('vue-cli-plugin-electron-builder/lib/testWithSpectron.js')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const spectron = require('spectron')
const { expect } = require('chai')

chai.should()
chai.use(chaiAsPromised)
let app;
let stopServe;

/* Application loads
Tests:
  Check a window opens
  Check it is not minimized
  Check its initial dimensions
  Check there is no dev tools
*/
describe('Application loads', function () {
  // This will take 5 minutes to run as
  // serving the app is slow compared to a compiled exe
  this.timeout(60 * 1000 * 5)

  before(async function () {
    return testWithSpectron(spectron).then(instance => {
      app = instance.app
      stopServe = instance.stopServe
    })
  })

  before(function () {
    chaiAsPromised.transferPromiseness = app.transferPromiseness
  })

  after(function () {
    if (app && app.isRunning()) {
      return stopServe()
    }
  })

  it('opens a single window', function () {
    return app.client
      .getWindowCount()
      .should.eventually.equal(1)
  });

  it('should not be minimized', function () {
    return app.client
        .browserWindow.isMinimized()
        .should.eventually.be.false
  });

  it('should be 800x600', function () {
    return app.client
              .browserWindow.getBounds()
              .should.eventually.have.property('width')
              .and.be.equal(800)
              .browserWindow.getBounds()
              .should.eventually.have.property('height')
              .and.be.equal(600)
  });

  it('has the correct title', async () => {
    const title = await app.client.getTitle();
    return expect(title).to.equal('solcpu');
  });

  it('does not have the developer tools open', async () => {
    const devToolsAreOpen = await app.client
      .browserWindow.isDevToolsOpened();
    return expect(devToolsAreOpen).to.equal(false);
  });
  
})

/* Application elements
Tests:
  Success render of:
    Minimize buttom
    Maximize buttom
    Quit buttom
    System tabs
*/
describe('Application DOM Elements', function () {
  // This will take 5 minutes to run as
  // serving the app is slow compared to a compiled exe
  this.timeout(60 * 1000 * 5)

  before(async function () {
    return testWithSpectron(spectron).then(instance => {
      app = instance.app
      stopServe = instance.stopServe
    })
  })

  before(function () {
    chaiAsPromised.transferPromiseness = app.transferPromiseness
  })

  after(function () {
    if (app && app.isRunning()) {
      return stopServe()
    }
  })

  it('has minimize button"', async () => {
    return app.client.isExisting('#btn-minimize')   
  });

  it('has maximize button"', async () => {
    return app.client.isExisting('#btn-maximize')
  });

  it('has quit button"', async () => {
    return app.client.isExisting('#btn-quit')
  });
  
  it('should have the system info tab', async () => { 
    return app.client.isExisting('#tab-system-info');
  });

  it('should have the network info tab', async () => { 
    return app.client.isExisting('#tab-system-info');
  });

  it('should have the cpu info tab', async () => { 
    return app.client.isExisting('#tab-system-info');
  });

  it('should have the cpu temperature tab', async () => { 
    return app.client.isExisting('#tab-system-info');
  });

  it('should have the memory info tab', async () => { 
    return app.client.isExisting('#tab-system-info');
  });

  it('should the location map', async () => { 
    return app.client.isExisting('#map-location');
  });


})

/* Application functionality
Tests:
  Can be minimized
  Can be maximized
  Can be restored
  Can be closed with confirm
*/
describe('Application Functionality', function () {
  // This will take 5 minutes to run as
  // serving the app is slow compared to a compiled exe
  this.timeout(60 * 1000 * 5)

  before(async function () {
    return testWithSpectron(spectron).then(instance => {
      app = instance.app
      stopServe = instance.stopServe
    })
  })

  before(function () {
    chaiAsPromised.transferPromiseness = app.transferPromiseness
  })

  after(function () {
    if (app && app.isRunning()) {
      return stopServe()
    }
  })

  it('should maximize when button clicked', async () => {
    await app.client.waitUntilWindowLoaded();
    await app.client.click('#btn-maximize');
    
    return app.client.browserWindow.isMaximized()
              .should.eventually.be.true
  });
  
  it('should restore to 800x600 from maximized', async () => {
    await app.client.waitUntilWindowLoaded();
    await app.client.click('#btn-maximize');
    
    return app.client.browserWindow.isMaximized()
              .should.eventually.be.false
              .and.browserWindow.getBounds()
              .should.eventually.have.property('width')
              .and.be.equal(800)
              .browserWindow.getBounds()
              .should.eventually.have.property('height')
              .and.be.equal(600)
  });
  
  it('should minimize when button clicked', async () => {
    await app.client.waitUntilWindowLoaded();
    await app.client.click('#btn-maximize');
    
    return app.client.browserWindow.isMaximized()
              .should.eventually.be.true
  });
  
  it('should confirm quitting of the app', async () => {
    await app.client.waitUntilWindowLoaded();
    await app.client.click('#btn-quit');
    return app.client.isExisting('#dialog-confirm-quit');
  });

});
