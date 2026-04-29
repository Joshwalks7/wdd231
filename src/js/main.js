function updateParkInformation() {
    document.getElementById("parkName").textContent = "Yellowstone";
    document.querySelector('#parkType').textContent = "National Park";
    document.querySelector('#parkStates').innerHTML = "ID, WY, MT";
    document.getElementById('heroImage').src = "/images/yellowstone.jpg";
}

updateParkInformation();

function addEventListeners() {
    const menuTrigger = document.querySelector("#header-menu-trigger");
    const menuOptions = document.querySelector("#header-menu-options");
    const overview = document.querySelector("#parkInfo");

    //MENU toggle feature
    if (menuTrigger && menuOptions) {
        menuTrigger.addEventListener("click", () => {
            menuOptions.classList.toggle("is-hidden");
        });
        // event delegation (single listener)
        menuOptions.addEventListener("click", (event) => {
            const itemName = event.target.textContent;
            console.log(itemName);
        });
    }

    //overlay hover color toggle
    if (overview) { //don't add these listeners if element not there
        overview.addEventListener("mouseenter", () => {
            overview.classList.add("overlay-hover");
        });

        overview.addEventListener("mouseleave", () => {
            overview.classList.remove("overlay-hover");
        });
    }
}

addEventListeners();