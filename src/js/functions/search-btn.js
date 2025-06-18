$(function() {

  if ($('.header-3')){
    let btn = $('.js-header-search-btn');

    btn.click(function(e){

      $('.header-search__inner').addClass('active');
      $('<div class="overflow"></div>').appendTo('body');

      $('.overflow').click(function(e){
        $('.header-search__inner').removeClass('active');
        $(this).remove();
      })
    })
  }

});