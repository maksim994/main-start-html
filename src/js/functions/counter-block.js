const counterBlock = () => {

    const counterBlockEl = document.querySelectorAll('.counter-block');

    counterBlockEl.forEach((el) => {
        let plus = el.querySelector('[counter-block-type="plus"]');
        let minus = el.querySelector('[counter-block-type="minus"]');
        let input = el.querySelector('[counter-block-type="input"]');

        if (Number(input.value) === 1) {
            minus.disabled = true;
        }

        plus.addEventListener('click', (e) => {
            e.preventDefault();
            input.value = Number(input.value) + 1;
            minus.disabled = false;
        })

        minus.addEventListener('click', (e) => {
            e.preventDefault();

            input.value = Number(input.value) - 1;

            if (Number(input.value) === 1) {
                minus.disabled = true;
            }

        })
    });

};


addEventListener('DOMContentLoaded', (event) => {
    counterBlock();
})