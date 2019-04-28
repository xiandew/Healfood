/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function goHome() {
    window.location.pathname = '/home';
}

function goMaps() {
    window.location.pathname = '/maps';
}

function goRatings() {
    window.location.pathname = '/ratings';
}

function goAllRestaurants() {
    window.location.pathname = '/restaurants';
}
