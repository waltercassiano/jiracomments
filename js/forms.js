$(function(){

  //Added on load first step
  $('#moreTests').append(unitTestTpl);
  $(document).trigger('added-test');


  $('.section1').on('click','.add-test', function() {
    $(this).closest('.form-step').after(unitTestTpl);
    $(document).trigger('added-test');
  });

  $('.section1').on('click', '.remove-test', function() {
    $(this).closest('.form-step').remove();
    $(document).trigger('removed-test');
  });
});


var unitTestTpl = '<div class="row form-step"">'+
  	'<div class="col-lg-12">'+
  		'<div class="bs-callout bs-callout-warning">'+
  			'<h4 class="label-element"></h4>'+
  				'<div class="form-group">'+
  					'<label for="unit_tests_steps_title">Title </label>'+
  					'<input name="unit_tests_steps_title[]" class="form-control" /> '+
  				'</div>'+
  				'<div class="form-group">'+
  					'<label for="unit_tests_steps_steps">Steps</label>'+
  					'<textarea name="unit_tests_steps_steps[]" class="form-control" rows="3"></textarea>' +
  				'</div>'+
  				'<div class="form-group">'+
  					'<label for="unit_tests_steps_description">Expected Results</label>'+
  					'<textarea name="unit_tests_steps_description[]" class="form-control" rows="3"></textarea>'+
  				'</div>'+
  				'<div>'+
            '<button class="btn btn-lg btn-warning add-test"> + </button>'+
  					'<button class="btn btn-lg btn-warning remove-test"> - </button>'+
  				'</div>'+
  		'</div>'+
  	'</div>'+
  '</div>';
