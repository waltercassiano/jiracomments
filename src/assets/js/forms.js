$(function() {
  var cmsOptions = {
    type:'changed-cms',
    wrapper : '.section1',
    title : 'CMS'
  };

  var testOptions = {
    type:'changed-test',
    wrapper : '.section2',
    title : 'Test'
  }

  //Added on load first step
  $('#moreTests').append(unitTestTpl);
  $('#cmsSteps h3').after(cmsTpl);
  $(document).trigger(cmsOptions);
  $(document).trigger(testOptions);


  //To new Steps CMS
  $('.section1').on('click','.add-cms', function() {
    $(this).closest('.form-step').after(cmsTpl);
    $(document).trigger(cmsOptions);
  });

  //To new Steps Test
  $('.section2').on('click','.add-test', function() {
    $(this).closest('.form-step').after(unitTestTpl);
    $(document).trigger(testOptions);
  });

  //To Clone Steps CMS
  $('.section1, .section2').on('click', '.clone-cms, .clone-test', function() {
     var $clickedElemnt = $(this);
     var $parent = $clickedElemnt.closest('.form-step');
     var $cloneStep = $clickedElemnt.closest('.form-step').clone();
     var clonedId = $cloneStep.attr('id') + '_clone_' + getRandom();
     //Changing de the of clone
     $cloneStep.attr('id', clonedId);
     var button = $cloneStep.find('.remove-test, .remove-cms').data('step-modal', clonedId);
     $parent.after($cloneStep);
     switch($clickedElemnt.data('clone-type')) {
        case 'cms' : $(document).trigger(cmsOptions); break;
        case 'test' : $(document).trigger(testOptions); break;
     }
  });

   $(document).on('show.bs.modal', function(modal) {
    var stepToConfirm = $(modal.relatedTarget).data('step-modal');
    $(document).on('click','.modal-confirm-remove', function(){
      $("#" + stepToConfirm).remove();
      switch($(modal.relatedTarget).data('remove-type')) {
        case 'cms' : $(document).trigger(cmsOptions); break;
        case 'test' : $(document).trigger(testOptions); break;
      }
      $("#myModal").modal('hide');
    })
  });

  // Button remove
  $('.section1').on('click', '.remove-cms', function() {
    let numberSteps1 = $('.section1 .form-step').length;

    if(numberSteps1 != 1) {
      $clickedBtnID = $(this).closest('.form-step').remove();
    }
  });

  $('.section2').on('click', '.remove-test', function() {
    let numberSteps2 = $('.section2 .form-step').length;

    if(numberSteps2 != 1) {
      $clickedBtnID = $(this).closest('.form-step').remove();
    }
  });
});

var unitTestTpl =  function() {
  var randomId = "step-test-id-" + getRandom();

  return '<div class="row form-step" id=' + randomId + '>'+
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
  				'<div class="row">'+
            '<div class="col-12 my-3 button-control-step" >'+
              '<button class="btn btn-primary add-test"><i class="fas fa-plus"></i></button> '+
              '<button class="btn btn-warning clone-test mx-1" data-clone-type="test"><i class="fas fa-clone"></i></button> '+
  					  '<button class="btn btn-danger remove-test" data-remove-type="test" data-step-modal="'+ randomId +'" data-toggle="modal" data-target="#myModal"><i class="fas fa-minus"></i></button>'+
            '</div>'+
  				'</div>'+
  		'</div>'+
  	'</div>'+
  '</div>';
}

var cmsTpl = function() {
  var randomId = "step-cms-id-" + getRandom();
  return '<div class="row form-step" id='+ randomId +'>'+
    '<div class="col-lg-12">'+
    '<div class="bs-callout bs-callout-danger">'+
      '<h4 class="label-element"></h4>'+
      '<div class="form-group">'+
      '<label for="cms_changes_steps_title">Title</label>'+
      '<input name="cms_changes_steps_title[]" class="form-control" />'+
      '</div>'+
      '<div class="form-group">'+
      '<label for="cms_changes_steps_description">Description</label>'+
      '<textarea name="cms_changes_steps_description[]" class="form-control" rows="3"></textarea>'+
      '</div>'+
      '<div class="row">'+
         '<div class="col-12 my-3 button-control-step" >'+
            '<button class="btn btn-primary add-cms"><i class="fas fa-plus"></i></button> '+
            '<button class="btn btn-primary btn-warning clone-cms mx-1" data-clone-type="cms"><i class="fas fa-clone"></i></button> '+
            '<button class="btn btn-danger remove-cms" data-remove-type="cms" data-step-modal="'+ randomId +'" data-toggle="modal" data-target="#myModal"><i class="fas fa-minus"></i></button>'+
          '</div>'+
      '</div>'+
    '</div>'+
    '</div>'+
  '</div>';
}

var getRandom = function() {
  return Math.floor((Math.random() * 10000) + 1);
}

// Button copy result
document.getElementById("btn-copy-result").addEventListener("click", function() {
  copyToClipboard(document.getElementById("result"));
});

function copyToClipboard(elem) {
  // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
      // can just use the original source element for the selection and copy
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
  } else {
      // must use a temporary form element for the selection and copy
      target = document.getElementById(targetId);
      if (!target) {
          var target = document.createElement("textarea");
          target.style.position = "absolute";
          target.style.left = "-9999px";
          target.style.top = "0";
          target.id = targetId;
          document.body.appendChild(target);
      }
      target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);

  // copy the selection
  var succeed;
  try {
      succeed = document.execCommand("copy");
  } catch(e) {
      succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
  }

  if (isInput) {
      // restore prior selection
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
      // clear temporary content
      target.textContent = "";
  }
  return succeed;
}
