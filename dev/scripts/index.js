document.addEventListener(`DOMContentLoaded`, () => {
    //Getting references to the interactive elements
    const triggerMenu = document.getElementById(`trigger-menu`);
    const triggerModal = document.getElementById(`trigger-modal`);
    const menu = document.getElementById(`menu`);
    const modal = document.getElementById(`modal`);

    //Ensuring both the menu and modal are hidden initially
    menu.style.display = `none`;
    modal.style.display = `none`;

    //Variable to track the current menu mode
    let currentMenuMode = window.innerWidth > 736 ? `drop-down` : `side-tray`;


    //Function to close the modal with a transition delay of 500ms
    const closeModal = () => {
        modal.classList.remove(`active`);
        setTimeout(() => {
            modal.style.display = `none`;
        }, 500);
    };

    //Modal trigger: show the model when clicked
    triggerModal.addEventListener(`click`, (e) => {
        e.preventDefault();
        modal.style.display = `block`;
        // Allow CSS transition to take effect
        setTimeout(() => {
            modal.classList.add(`active`);
        }, 10);
    });

    //Clicking on the modal background (but not its content) closes the modal
    modal.addEventListener(`click`, (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    //Pressing the Esc key also closes the modal
    window.addEventListener(`keyup`, (e) => {
        if (e.key === `Escape` && modal.classList.contains(`active`)) {
            closeModal();
        }
    });

    //Menu trigger: toggle the menu dispay on click.
    triggerMenu.addEventListener(`click`, (e) => {
        e.preventDefault();
        // Toggle based on whether the menu is already active.
        if (!menu.classList.contains(`active`)) {
            // Choose mode based on current window width
            if (window.innerWidth > 736) {
                menu.classList.remove(`side-tray`);
                menu.classList.add(`drop-down`);
            } else {
                menu.classList.remove(`drop-down`);
                menu.classList.add(`side-tray`);
            }
            menu.style.display = `block`;
            setTimeout(() => {
                menu.classList.add(`active`);
            }, 10);
        } else {
            // Hide the menu
            menu.classList.remove(`active`);
            setTimeout(() => {
                menu.style.display = `none`;
                menu.classList.remove(`drop-down`);
                menu.classList.remove(`side-tray`);
            }, 500);
        }
    });

    //Reset state on viewport resize - if any interaction is open and the threshold is crossed, hide them
    let resizeTimeout;
    window.addEventListener(`resize`, () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Determine the new menu mode based on current window width
            const newMenuMode = window.innerWidth > 736 ? `drop-down` : `side-tray`;
            // If the menu is open...
            if (menu.classList.contains(`active`)) {
                // If the mode has changed, close the menu (resetting to initial state)
                if (newMenuMode !== currentMenuMode) {
                    menu.classList.remove(`active`);
                    setTimeout(() => {
                        menu.style.display = `none`;
                        menu.classList.remove(`drop-down`);
                        menu.classList.remove(`side-tray`);
                    }, 500);
                } else {
                    // Optionally, if you're in drop-down mode, you might want to
                    // force a reflow to re-center it. The CSS already centers it,
                    // but if you need a refresh, you can toggle the active class:
                    if (newMenuMode === `drop-down`) {
                        menu.classList.remove(`active`);
                        setTimeout(() => {
                            menu.classList.add(`active`);
                        }, 10);
                    }
                }
            }
            // Update the tracked mode
            currentMenuMode = newMenuMode;
        }, 100);
    });

});
