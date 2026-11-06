
// Get all theme buttons

var buttons = document.querySelectorAll(".theme-options button");

// Apply selected theme

function changeTheme(theme) {

    document.body.className = theme;

    localStorage.setItem("selectedTheme", theme);

    buttons.forEach(function(button) {

        button.classList.remove("selected");

        if (button.getAttribute("data-theme") === theme) {
            button.classList.add("selected");
        }

    });

}

// Load saved theme

var savedTheme = localStorage.getItem("selectedTheme");

if (savedTheme == null) {
    savedTheme = "green";
}

changeTheme(savedTheme);

// Change theme when button is clicked

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        var theme = button.getAttribute("data-theme");

        changeTheme(theme);

    });

});
