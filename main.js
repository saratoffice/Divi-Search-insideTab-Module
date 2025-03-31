<script>
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.et_pb_search input[type="text"]');
    const tabs = document.querySelectorAll('.et_pb_tabs .et_pb_tab');

    if (searchInput) {
        // Disable Enter key submission
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();  // Prevent Enter key from submitting the form or reloading the page
            }
        });

        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase().trim();

            if (searchTerm === '') {
                // Refresh the page when the search box is cleared
                location.reload();
            } else {
                // Reset the visibility status
                let hasVisibleItem = false;

                // Always start searching from the first tab
                const totalTabs = tabs.length;

                for (let tabIndex = 0; tabIndex < totalTabs; tabIndex++) {
                    const tab = tabs[tabIndex];
                    const listItems = tab.querySelectorAll('ul li');
                    let tabHasVisibleItem = false;

                    listItems.forEach(item => {
                        const itemText = item.textContent.toLowerCase().trim();

                        // Clear previous highlights
                        item.innerHTML = itemText;

                        if (itemText.includes(searchTerm)) {
                            tabHasVisibleItem = true;
                            hasVisibleItem = true;
                            const regex = new RegExp(`(${searchTerm})`, 'gi');
                            item.innerHTML = itemText.replace(regex, '<span class="highlight">$1</span>');
                            item.style.display = 'list-item';
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    // Show/hide the tab based on matching items
                    tab.style.display = tabHasVisibleItem ? 'block' : 'none';
                }

                // Optionally, you can show a message if no results are found
                if (!hasVisibleItem) {
                    console.log('No results found');
                }
            }
        });
    }
});
</script>
