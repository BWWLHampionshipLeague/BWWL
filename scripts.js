function sortTable(columnIndex) {
    const table = event.target.closest('table');  // Get the table that was clicked
    const tbody = table.querySelector('tbody');   // Get the tbody within that table
    const rows = Array.from(tbody.querySelectorAll('tr'));  // Get all rows within tbody

    // Determine the current sort order (ascending or descending)
    const isAscending = table.dataset.sortOrder === 'asc';
    table.dataset.sortOrder = isAscending ? 'desc' : 'asc';  // Toggle sort order

    const sortedRows = rows.sort((a, b) => {
        const aText = a.children[columnIndex].textContent.trim();
        const bText = b.children[columnIndex].textContent.trim();

        // Sort numerically or alphabetically based on content
        if (!isNaN(aText) && !isNaN(bText)) {
            return isAscending ? bText - aText : aText - bText;  // Sort numerically in descending order by default
        } else {
            return isAscending ? bText.localeCompare(aText) : aText.localeCompare(bText);  // Sort alphabetically
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

// On page load, apply descending sorting by default to the first column
window.onload = function() {
    const defaultTable = document.getElementById('standingsTable');  // Assuming this is the table you want to sort
    defaultTable.dataset.sortOrder = 'desc';  // Set default order to descending
    sortTable(0);  // Sort by the first column (Rank) in descending order by default
};
