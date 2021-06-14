jQuery(function() {
  var idForm = "#comment";
  $("#result").hide();

  $(idForm).submit(function( event ) {
    event.preventDefault();

    // Head and variables.
    var newLine = '\n';
    var doubleNewLine = '\n\n';
    var hr = '--' + newLine;
    var html = '';

    html += 'h1. {color:#ad1b31}MTS/MTP{color}' + doubleNewLine;

    // ====== CODE
    html += 'h2. {color:#1B809E}Code Changes{color}' + doubleNewLine;

    // We have code changes?
    html += '*Do we have code changes?*' + newLine;
    html += $('input[name=code_changes]:checked', idForm).val() + doubleNewLine;

    // Changes Type:
    html += '*Technology:*' + newLine;
    var code_changes_type = $('input:checkbox[name^=code_changes_type]:checked');
    if(code_changes_type.length > 0){
      code_changes_type.each(function(){
        html += '* ' + $(this).val() + newLine;
      });
      html += newLine;
    }

    // More details:
    var more_details = $('textarea[name=code_more_details]', idForm).val();
    if (more_details.length > 0) {
      html += '*More Details:*' + newLine;
      html += more_details + doubleNewLine;
    }

    // ====== CMS CHANGES
    html += 'h2. {color:#CE4844}CMS Changes{color}' + doubleNewLine;

    // We have CMS changes?
    html += '*Do we have CMS changes?*' + newLine;
    html += $('input[name=cms_changes]:checked', idForm).val() + doubleNewLine;

    // Steps
    html += 'h3. Steps' + doubleNewLine;
    var array_cms_changes_steps_title = [];
    var array_cms_changes_steps_description = [];
    $('input[name^="cms_changes_steps_title"]').each(function() {
      array_cms_changes_steps_title.push($(this).val());
    });
    $('textarea[name^="cms_changes_steps_description"]').each(function() {
      array_cms_changes_steps_description.push($(this).val());
    });
    $('input[name^="cms_changes_steps_title"]').each(function(index) {
      html += '*' + (index + 1) + ') ' + array_cms_changes_steps_title[index] + '*' + newLine;
      html += array_cms_changes_steps_description[index] + doubleNewLine;
    });

    // Comments
    var cms_comments = $('textarea[name=comments]', idForm).val();
    if (cms_comments.length > 0) {
      html += 'h2. {color:#222}Comments{color}' + doubleNewLine;
      html += cms_comments + doubleNewLine;
    }

    // ====== Unit Tests
    html += 'h2. {color:#AA6708}Unit Tests{color}' + doubleNewLine;
    var array_unit_tests_steps_title = [];
    var array_unit_tests_steps_description = [];
    var unit_tests_steps_steps = [];

    $('input[name^="unit_tests_steps_title"]').each(function() {
      array_unit_tests_steps_title.push($(this).val());
    });
    $('textarea[name^="unit_tests_steps_description"]').each(function() {
      array_unit_tests_steps_description.push($(this).val());
    });
    $('textarea[name^="unit_tests_steps_steps"]').each(function() {
      unit_tests_steps_steps.push($(this).val());
    });
    $('input[name^="unit_tests_steps_title"]').each(function(index) {
      html += '*' + (index + 1) + ') ' + array_unit_tests_steps_title[index] + '*' + newLine;
      html += 'Steps :' + unit_tests_steps_steps[index] + doubleNewLine;
      html += 'Expected Results :' + array_unit_tests_steps_description[index] + doubleNewLine;
    });

    // ====== Result
    $("#result").val(html);

  });
});



function showCodeChange(){
  if(document.getElementById('codeChangeY').checked) {
    $("#codeChange").show();
  } else {
    $("#codeChange").hide();
  }
}

function showCMSChange(){
  if(document.getElementById('cms_changes_yes').checked) {
    $("#cmsSteps").show();
  } else {
    $("#cmsSteps").hide();
  }
}

function validateForm() {

  var validation = true;

  if(!document.getElementById('cms_changes_yes').checked && !document.getElementById('cms_changes_no').checked) {
    $("#result").hide();
    $("#cmsError").show();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    validation =  false;
    setTimeout(() => {
      $("#cmsError").fadeOut(1000);
    }, 5000);
  }
  else{
    $("#cmsError").hide();
  }

  if(!document.getElementById('codeChangeY').checked && !document.getElementById('codeChangeN').checked) {
    $("#codeError").show();
    $("#result").hide();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    validation =  false;
    setTimeout(() => {
      $("#codeError").fadeOut(1000);
    }, 5000);
  }
  else{
    $("#codeError").hide();
  }

  return validation;
}

function showResult() {
  if(validateForm()){
    $("#result").show();
    $("#cmsError").hide();
    $("#cmsError").hide();
    var clipboard = new Clipboard('.btn');
  }
}

// Btn Back to Top
$('.back-to-top').hide();

$(window).on('scroll',function(){
  if($(this).scrollTop()>0) {
    $('.back-to-top').fadeIn();
  }
  else {
    $('.back-to-top').fadeOut();
  }
})

$('.back-to-top').on('click', function(){
  $('body, html').animate({
    scrollTop: 0
  })
})

// var numForms = 1;
// function addTest(){
//
// var id ='unitTestForm'+numForms;
// var title = 'Test '+numForms;
//
// 	var newTest =unitTestTpl(id, title);
// 	$(newTest).appendTo('#moreTests');
// 	numForms++;
//
// /*$(document).ready(function() {
//
// 	$('button.remove').on('click',function(e){
// 		$(this).parent().parent().remove();
// 	});
// });
// }*/
// }


// function removeTest(idR){
//
// 	$('#'+idR+'').remove();
// }

// function unitTestTpl(idTpl,titleTpl){
//
// var tpl=
// '<div class="row" id="'+idTpl+'">'+
// 	'<div class="col-lg-12">'+
// 		'<div class="bs-callout bs-callout-warning">'+
// 			'<h4>'+titleTpl+'</h4>'+
// 				'<div class="form-group">'+
// 					'<label for="unit_tests_steps_title">Title </label>'+
// 					'<input name="unit_tests_steps_title[]" class="form-control" /> '+
// 				'</div>'+
// 				'<div class="form-group">'+
// 					'<label for="unit_tests_steps_steps">Steps</label>'+
// 					'<textarea name="unit_tests_steps_steps[]" class="form-control" rows="3"></textarea>' +
// 				'</div>'+
// 				'<div class="form-group">'+
// 					'<label for="unit_tests_steps_description">Expected Results</label>'+
// 					'<textarea name="unit_tests_steps_description[]" class="form-control" rows="3"></textarea>'+
// 				'</div>'+
// 				'<div>'+
//           '<button class="btn btn-lg btn-warning add-test" onclick="addTest(\''+idTpl+'\')"> + </button>'+
// 					'<button class="btn btn-lg btn-warning remove-test" onclick="removeTest(\''+idTpl+'\')"> - </button>'+
// 				'</div>'+
// 		'</div>'+
// 	'</div>'+
// '</div>';
//
// 	return tpl;
// }
