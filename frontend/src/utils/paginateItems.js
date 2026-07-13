const ITEMS_PER_PAGE = 80;

export default function paginateItems(items = []) {
    const pages = [];

    for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
        pages.push(items.slice(i, i + ITEMS_PER_PAGE));
    }

    return pages;
}