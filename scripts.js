function sortTable(columnIndex) {
    const table = event.target.closest('table');  // Get the table that was clicked
    const tbody = table.querySelector('tbody');   // Get the tbody within that table
    const rows = Array.from(tbody.querySelectorAll('tr'));  // Get all rows within tbody

    // Determine the current sort order (ascending or descending)
    const isAscending = table.dataset.sortOrder === 'desc';
    table.dataset.sortOrder = isAscending ? 'asc' : 'desc';

    const sortedRows = rows.sort((a, b) => {
        const aText = a.children[columnIndex].textContent.trim();
        const bText = b.children[columnIndex].textContent.trim();

        // Sort numerically or alphabetically based on content
        if (!isNaN(aText) && !isNaN(bText)) {
            return isAscending ? aText - bText : bText - aText;
        } else {
            return isAscending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        }
    });

    // Re-append sorted rows to the tbody
    tbody.append(...sortedRows);

    // Automatically update ranks after sorting
    if (columnIndex !== 0) {  // Only update ranks if it's not the rank column being sorted
        const rankColumnIndex = 0;
        sortedRows.forEach((row, index) => {
            row.children[rankColumnIndex].textContent = index + 1;
        });
    }
}
