(async function() {
    'use strict';

    // Settings
    const delay = 100; // Delay in milliseconds
    const maxAttempts = 30; // Maximum number of attempts
    const modalDelay = 500; // Delay in milliseconds to wait for modal
    const modalMaxAttempts = 20; // Maximum number of attempts to wait for modal

    async function clickUncheckedCheckboxes(delay, maxAttempts) {
        let noCheckboxesCount = 0;

        while (true) {
            // Get all unchecked checkboxes
            let checkboxes = [...document.querySelectorAll('.ckGgle')].filter((checkbox) => checkbox.ariaChecked == 'false');

            if (checkboxes.length > 0) {
                noCheckboxesCount = 0;
                // Click each unchecked checkbox
                checkboxes.forEach((checkbox) => checkbox.click());
                // Scroll down to load more checkboxes
                document.getElementsByClassName("yDSiEe uGCjIb zcLWac eejsDc TWmIyd")[0].scrollBy(0, window.outerHeight);
            } else {
                noCheckboxesCount++;
                if (noCheckboxesCount > maxAttempts) {
                    console.log("All checkboxes are selected.");
                    // Click the delete button
                    document.querySelector('button[aria-label="Delete"]').click();

                    // Wait for the modal to appear and click the "Move to trash" button
                    for (let i = 0; i < modalMaxAttempts; i++) {
                        const xpath = "//span[text()='Move to trash']";
                        const spanElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                        if (spanElement) {
                            spanElement.click();
                            console.log("Items moved to trash.");
                            break;
                        } else {
                            console.log("Waiting for the modal to appear...");
                            await new Promise(resolve => setTimeout(resolve, modalDelay));
                        }

                        if (i === modalMaxAttempts - 1) {
                            console.log("Element not found after maximum attempts.");
                        }
                    }
                    break;
                }

                // Autoscroll down the page
                window.scrollBy(0, window.outerHeight);
            }

            // Wait for a short period before checking again
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    // Execute the function
    clickUncheckedCheckboxes(delay, maxAttempts);
})();
