import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Bootiful songs!');
  });

  it('should display a nice video picked "at random"', () => {
    page.navigateTo();
    expect(page.getEmbeddedVideoSource()).toEqual('https://www.youtube.com/embed/zSVBcm_BZRs?rel=0');
  });
});
