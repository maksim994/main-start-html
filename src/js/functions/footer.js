$(function() {
    let icons = $('.footer-part-item .bottom-menu-icons');

    if (icons.is(':visible')) {

        icons.on('click', function () {
            icons.removeClass('active');
            $(this).addClass('active');

            let part = $(this).parents('.footer-part-item');

            if (part.find('.bottom-menu-list').is(':visible')) {
                part.find('.bottom-menu-list').fadeOut();
                $(this).removeClass('active');
            } else {
                part.find('.bottom-menu-list').slideDown();
            }
        })
    }
})