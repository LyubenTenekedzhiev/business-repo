// Pagination
export function nextPageClickHandler(items: any, itemsPerPage: number, firstItem: number, setFirstItem: any) {
  if (items.length - itemsPerPage <= firstItem + itemsPerPage) {
    if (firstItem + itemsPerPage >= items.length) return;
    setFirstItem(Math.max(firstItem + itemsPerPage, items.length - itemsPerPage));
  } else {
    setFirstItem(Math.min(firstItem + itemsPerPage, items.length - itemsPerPage));
  }
}

export function prevPageClickHandler(itemsPerPage: number, firstItem: number, setFirstItem: any) {
  setFirstItem(Math.max(firstItem - itemsPerPage, 0));
}
