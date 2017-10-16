$(document).on('turbolinks:load', function() {

  const $navButton = $('.sidebar-nav-button');
  const $icon = $navButton.find('i');
  const $navbar = $('.navbar');

  $navButton.on('click', function(e){

    if($navButton.hasClass('closed')){
      $icon.removeClass('ion-navicon-round');
      $icon.addClass('ion-close-round');
    } else {
      $icon.removeClass('ion-close-round');
      $icon.addClass('ion-navicon-round');
    }
    $navButton.toggleClass('closed');
    $navButton.toggleClass('opened');
    $navbar.toggleClass('open');
  })

})
