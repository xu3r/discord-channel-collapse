
// This script is injected into the page when the extension is enabled
window.addEventListener('load', function() {
    setTimeout(function() {

        // Find the toolbar element
        const toolbar = document.querySelector('.toolbar-3_r2xA');
    
        // Create the icon element
        const icon = document.createElement('div');

        // Set the icon attributes
        icon.innerHTML = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path fill="#b2b6bc" d="M14 19h-14v-1h14v1zm9.247-8.609l-3.247 4.049-3.263-4.062-.737.622 4 5 4-5-.753-.609zm-9.247 2.609h-14v-1h14v1zm0-6h-14v-1h14v1z"/>
            </svg>`;
        icon.classList.add('iconWrapper', 'clickable-ZD7xvu');
        icon.setAttribute('role', 'button');
        icon.setAttribute('aria-label', 'Sidebar');
        icon.setAttribute('aria-expanded', 'false');
        icon.setAttribute('tabindex', '0');

        // Add a click event listener to toggle the sidebar width
        icon.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar-1tnWFu');
            sidebar.style.width = sidebar.style.width === '1px' ? '240px' : '1px';
        });

        // Add the icon to the lefternmost position of the toolbar
        toolbar.insertBefore(icon, toolbar.firstChild);

        console.log('Content script running...');

        // Observe the toolbar for changes and re-add the icon if it's removed
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && !mutation.addedNodes.contains(icon)) {
                    toolbar.insertBefore(icon, toolbar.firstChild);
                }
            });
        });
        observer.observe(toolbar, { childList: true });

        // Listen for changes in the URL and re-add the icon if necessary
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if (changeInfo.url && changeInfo.url.includes('discord.com/channels/')) {
                toolbar.insertBefore(icon, toolbar.firstChild);
            }
        });
    }, 1000); // Wait for half a second to make sure the DOM is loaded
});
