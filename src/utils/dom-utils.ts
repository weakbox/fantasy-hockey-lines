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
 * Extracts data from a table's rows based on a header selector and a data extractor function.
 * Assumes the table has a tbody and rows with the specified data attribute.
 */
export function extractTableData(
  headerSelector: string,
  dataExtractor: (row: HTMLTableRowElement) => any
): any[] | null {
  const th = document.querySelector(headerSelector) as HTMLTableCellElement;
  if (!th) return null;
  const table = th.closest('table');
  if (!table) return null;
  const tbody = table.querySelector('tbody');
  if (!tbody) return null;
  return Array.from(tbody.querySelectorAll('tr')).map((row) =>
    dataExtractor(row as HTMLTableRowElement)
  );
}

/**
 * Gets a table from a header selector.
 */
function getTableFromHeader(headerSelector: string): HTMLTableElement | null {
  const th = document.querySelector(headerSelector) as HTMLTableCellElement;
  if (!th) return null;
  return th.closest('table') as HTMLTableElement;
}

/**
 * Injects content into each row of a table. The injector callback receives each row
 * and should create/return the DOM element or HTML string to insert.
 */
export function injectContentIntoTableRows(
  headerSelector: string,
  injector: (row: HTMLTableRowElement) => HTMLElement | string | null
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

  const rows = tbody.querySelectorAll('tr');
  rows.forEach((row) => {
    const content = injector(row as HTMLTableRowElement);
    if (content) {
      if (typeof content === 'string') {
        console.log(`[FHL DEBUG]: Injecting HTML content into row: ${content}`);
        // Find a suitable place to insert the string (e.g., end of first cell with player name)
        const firstCell = row.querySelector('td');
        if (firstCell) {
          firstCell.insertAdjacentHTML('beforeend', content);
        }
      } else {
        // Insert the DOM element
        console.log('[FHL DEBUG]: Injecting DOM element into row:', content);
        const firstCell = row.querySelector('td');
        if (firstCell) {
          firstCell.appendChild(content);
        }
      }
    }
  });
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
