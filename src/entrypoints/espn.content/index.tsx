import { waitForElement, mountReactComponentIntoTableRows } from '../../utils/dom-utils';
import LinePlaceholder from '../../components/LinePlaceholder';

export default defineContentScript({
  matches: ['*://fantasy.espn.com/hockey/*'],
  main() {
    console.log('[FHL]: Running ESPN content script...');

    const skatersSelector = 'th[title="Skaters"]';
    const goaliesSelector = 'th[title="Goalies"]';

    waitForElement(skatersSelector, () => {
      mountReactComponentIntoTableRows(skatersSelector, () => <LinePlaceholder />);
    });

    waitForElement(goaliesSelector, () => {
      mountReactComponentIntoTableRows(goaliesSelector, () => <LinePlaceholder />);
    });
  }
});
