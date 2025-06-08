// Loading spinner functionality
const spinner = {
    show: function() {
        const spinnerElement = document.getElementById('spinner');
        if (spinnerElement) {
            spinnerElement.classList.add('show');
        }
    },
    hide: function() {
        const spinnerElement = document.getElementById('spinner');
        if (spinnerElement) {
            spinnerElement.classList.remove('show');
        }
    }
};

// Hide spinner when document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initially hide the spinner once the basic DOM is loaded
    setTimeout(function() {
        spinner.hide();
    }, 100);
});
