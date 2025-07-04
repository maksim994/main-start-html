addEventListener('DOMContentLoaded', (event) => {

    $('.slider').each(function( index ) {
        let sliderItems = $(this).attr('data-slider-items') ? $(this).attr('data-slider-items') : 1;
        let sliderItemsMobile = $(this).attr('data-slider-items-mobile') ? $(this).attr('data-slider-items-mobile') : 1;
        let sliderItemsTable = $(this).attr('data-slider-items-table') ? $(this).attr('data-slider-items-table') : 1;

        let dots = $(this).attr('data-dots') ? $(this).attr('data-dots') : false ;
        let arrows = $(this).attr('data-arrows') ? $(this).attr('data-arrows') : false ;

        let autoplaySpeed = $(this).attr('data-autoplaySpeed') ? $(this).attr('data-autoplaySpeed') : 0 ;
        let autoplay = $(this).attr('data-autoplay') ? $(this).attr('data-autoplay') : false ;



        if ( $(this).find('.items').length >= sliderItems) {
            $(this).slick({
                infinite: true,
                dots: $.parseJSON(dots),
                arrows: $.parseJSON(arrows),
                slidesToShow: sliderItems,
                slidesToScroll: 1,
                autoplay: autoplay,
                autoplaySpeed: autoplaySpeed,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: sliderItemsTable,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: sliderItemsMobile,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    });

});