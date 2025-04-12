addEventListener('DOMContentLoaded', (event) => {

    /* Убрать */
    if (document.querySelector('maps')) {
        ymaps.ready(init);

        function init() {
            new ymaps.Map('maps', {
                center: [55.76, 37.64],
                zoom: 7,
            });
        }
    }

    Fancybox.bind("[data-fancybox]", {
        autoFocus: false,
    });
});
