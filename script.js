

document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('operation-select');
    const defaultContainer = document.querySelector('.default-container');
    const scientificContainer = document.querySelector('.scientific-container');
    const programmerContainer = document.querySelector('.programmer-container');

    function updateCalculatorMode() {
        const mode = select.value;
        defaultContainer.classList.remove('active');
        scientificContainer.classList.remove('active');
        programmerContainer.classList.remove('active');

        if (mode === 'Programmer') {
            programmerContainer.classList.add('active');
        } else if (mode === 'Scientific') {
            scientificContainer.classList.add('active');
        }
        // Default is always on
        defaultContainer.classList.add('active');
    }

    select.addEventListener('change', updateCalculatorMode);

    // Initial state
    updateCalculatorMode();
});

