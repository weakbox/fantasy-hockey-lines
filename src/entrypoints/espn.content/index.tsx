import { waitForElement, mountReactComponentIntoTableRows } from '../../utils/dom-utils';
import LinePlaceholder from '../../components/LinePlaceholder';

export default defineContentScript({
  matches: ['*://fantasy.espn.com/hockey/*'],
  main() {
    console.log('[FHL]: Running ESPN content script...');

    waitForElement('th[title="Skaters"]', () => {
      mountReactComponentIntoTableRows('th[title="Skaters"]', () => <LinePlaceholder />);
    });

    waitForElement('th[title="Goalies"]', () => {
      mountReactComponentIntoTableRows('th[title="Goalies"]', () => <LinePlaceholder />);
    });
  }
});
