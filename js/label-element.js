$(function(){

})

$(document).on('added-test removed-test',  function() {
  var $testSteps = $('.section1').children('.form-step');
  $testSteps.each(function (index, element){
    index = index + 1;
    $(element).find('.label-element').text('Test ' + index);
  })

});
