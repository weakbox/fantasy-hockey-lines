import { createRoot } from 'react-dom/client';
import type { ReactNode } from 'react';

/**
 * Waits for an element matching the selector to appear in the DOM using a MutationObserver.
 * Calls the callback with the element once found, then disconnects the observer.
 */
export function waitForElement(selector: string, callback: (element: Element) => void): void {
  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Mounts a React component into each row of a table.
 */
export function mountReactComponentIntoTableRows(
  headerSelector: string,
  createComponent: (row: HTMLTableRowElement) => ReactNode | null
): void {
  const table = getTableFromHeader(headerSelector);
  if (!table) {
    console.warn(`[FHL DEBUG]: Could not find table with header selector: ${headerSelector}`);
    return;
  }

  const tbody = table.querySelector('tbody');
  if (!tbody) {
    console.warn('[FHL DEBUG]: Table has no tbody');
    return;
  }

  Array.from(tbody.querySelectorAll('tr')).forEach((row) => {
    const firstCell = row.querySelector('td');
    if (!firstCell) return;

    const mountPoint = document.createElement('span');
    mountPoint.className = 'fhl-react-mount';
    firstCell.appendChild(mountPoint);

    const root = createRoot(mountPoint);
    const component = createComponent(row as HTMLTableRowElement);
    if (component) {
      root.render(component);
    }
  });
}

/**
 * Gets a table from a header selector.
 */
function getTableFromHeader(headerSelector: string): HTMLTableElement | null {
  const th = document.querySelector(headerSelector) as HTMLTableCellElement;
  if (!th) return null;
  return th.closest('table') as HTMLTableElement;
}
