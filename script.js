

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

    //Default calculator functionality
    const resultField = document.getElementById('result');
    const equationField = document.getElementById('equation');

    document.querySelectorAll('[data-inserted]').forEach(button => {
        button.addEventListener('click', () => {
            equationField.value += button.getAttribute('data-inserted');
            
        });
    });

    document.getElementById('btnClear').addEventListener('click', () => {
        equationField.value = equationField.value.slice(0, -1);
    });

    document.getElementById('btnAllClear').addEventListener('click', () => {
        equationField.value = '';
        resultField.value = '';
    });

    document.getElementById('btnEquals').addEventListener('click', () => {
        try {
            const result = math.evaluate(equationField.value);
            resultField.value = result;
            updateProgrammer(result);
        } catch (e) {
            resultField.value = 'Error';
        }
    });

    //Programmer calculator functionality

    function updateProgrammer(value) {
        const dec = parseInt(value);
        if (!isNaN(dec)) {
            document.getElementById('input-dec').value = dec;
            document.getElementById('input-bin').value = dec.toString(2);
            document.getElementById('input-hex').value = dec.toString(16).toUpperCase();
            document.getElementById('input-oct').value = dec.toString(8);
        }
    }

    document.querySelectorAll('[data-bitwise]').forEach(button => {
        button.addEventListener('click', () => {
            const op = button.getAttribute('data-bitwise');
            const input = equationField.value.split(' ').map(Number);
            let result = 0;

            switch (op) {
                case 'AND': result = input[0] & input[1]; break;
                case 'OR': result = input[0] | input[1]; break;
                case 'XOR': result = input[0] ^ input[1]; break;
                case 'NAND': result = ~(input[0] & input[1]); break;
                case 'NOR': result = ~(input[0] | input[1]); break;
                case 'NOT': result = ~input[0]; break;
                case '<<': result = input[0] << input[1]; break;
                case '>>': result = input[0] >> input[1]; break;
                default: result = 0;
            }

            resultField.value = result;
            equationField.value = result;
            updateProgrammer(result);
        });
    });




});

