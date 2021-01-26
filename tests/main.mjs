import testWithSpectron from 'vue-cli-plugin-electron-builder/lib/testWithSpectron.js'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
// eslint-disable-next-line no-undef
import spectron from 'spectron'

chai.should()
chai.use(chaiAsPromised)

describe('Application launch', function () {
  this.timeout(60000)

  beforeEach(async function () {
    return testWithSpectron(spectron).then(instance => {
      this.app = instance.app
      this.stopServe = instance.stopServe
    })
  })

  beforeEach(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness
  })

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.stopServe()
    }
  })

  it('opens a window', function () {
    return this.app.client
      .getWindowCount()
      .should.eventually.have.at.least(1)
      .browserWindow.isMinimized()
      .should.eventually.be.false.browserWindow.isVisible()
      .should.eventually.be.true.browserWindow.getBounds()
      .should.eventually.have.property('width')
      .and.be.above(0)
      .browserWindow.getBounds()
      .should.eventually.have.property('height')
      .and.be.above(0)
  })

  it('has the correct title', async () => {
    const title = await this.app.client.getTitle();
    return assert.equal(title, 'SolCPU');
  });

  it('does not have the developer tools open', async () => {
    const devToolsAreOpen = await this.app.client
      .browserWindow.isDevToolsOpened();
    return assert.equal(devToolsAreOpen, false);
  });
  
  
})