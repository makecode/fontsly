// libs
import './rateit';
import 'social-likes';
import 'social-likes/dist/social-likes_birman.css';
import '@claviska/jquery-minicolors/jquery.minicolors.css';
import '@claviska/jquery-minicolors';

import 'ress';
import './styles/_index.sass';

$(document).ready(function() {
  const $languageEl = $('.language__el'),
        $language = $('.language'),
        $filter = $('.filter__btn'),
        $filterContent = $('.fonts__content'),
        $uploadFile = $('#input-file'),
        $uploadFont = $('#input-font'),
        $inputRadio = $('input:radio[name=radio-one]'),
        $radioFormYes = $('.radio-form-yes'),
        $radioFormNo = $('.radio-form-no'),
        $uploadIllustration = $('#input-illustration');

  //Language
  $language.hover(function(){
    $(this).toggleClass('is-open');
  });

  $languageEl.click(function(){
    $languageEl.removeClass('is-active');
    $(this).toggleClass('is-active');
  });

  //filters
  $filter.map((index, filter) => {
    $(filter).click(() => {
      $filter.removeClass('is-active');
      $(filter).addClass('is-active');

      $filterContent.map((indexContent, content) => {
        if (indexContent === index) {
          $($filterContent).removeClass('is-active');
          $(content).addClass('is-active');
        }
      })
    });
  });

  $inputRadio.change(function () {
    const val = $(this).attr('value');

    if (val === 'yes') {
      $($radioFormNo).hide();
      $($radioFormYes).show();
    } else {
      $($radioFormYes).hide();
      $($radioFormNo).show();
    }
  });

  //input file
  $uploadFile.change(changeInputFile);
  $uploadFont.change(changeInputFile);
  $uploadIllustration.change(changeInputFile);

  // color picker
  $('INPUT.minicolors').minicolors({
    defaultValue: '#000000'
  });

  function changeInputFile(){
    const $label = $(this).parent().find('span');
    const $title = $(this).parent().parent().find('.request__file-selected');

    if (typeof(this.files) !== 'undefined'){ // fucking IE
      if (this.files.length === 0){
        $label.removeClass('withFile').text($label.data('default'));
      } else {
        const fileName = this.files[0].name;

        if (fileName) {
          $($title).text(fileName);
        }
      }
    } else {
      const name = this.value.split("\\");
      // $label.addClass('withFile').text(name[name.length-1]);
    }

    return false;
  }
});