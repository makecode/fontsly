// libs
import './rateit';
import 'social-likes';
import 'social-likes/dist/social-likes_birman.css';

import 'ress';
import './styles/_index.sass';

$(document).ready(function() {
  const $languageEl = $('.language__el'),
        $language = $('.language'),
        $filter = $('.filter__btn'),
        $uploadFile = $('#input-file');

  //Language
  $language.hover(function(){
    $(this).toggleClass('is-open');
  });

  $languageEl.click(function(){
    $languageEl.removeClass('is-active');
    $(this).toggleClass('is-active');
  });

  //filters
  $filter.click(function() {
    $filter.removeClass('is-active');
    $(this).toggleClass('is-active');
  });

  //input file
  $uploadFile.change(function(){
    const label = $(this).parent().find('span');
    if(typeof(this.files) !='undefined'){ // fucking IE
      if(this.files.length == 0){
        label.removeClass('withFile').text(label.data('default'));
      }
      else{
        const file = this.files[0];
        const name = file.name;
        label.addClass('withFile').text(name);
        $('.request__file-selected').addClass('is-hidden')
      }
    }
    else{
      const name = this.value.split("\\");
      label.addClass('withFile').text(name[name.length-1]);
    }
    return false;
  });

  $('#colorpicker').on('change', function() {
    $('#hexcolor').val(this.value);
  });
  $('#hexcolor').on('change', function() {
    $('#colorpicker').val(this.value);
  });


});