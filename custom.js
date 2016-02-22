$(document).ready(function() {
  var idForm = "#comment";
  
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
    html += '*We have code changes?*' + newLine;
    html += $('input[name=code_changes]:checked', idForm).val() + doubleNewLine;

    // Changes Type:
    html += '*Changes Type:*' + newLine;      
    var code_changes_type = $('input:checkbox[name^=code_changes_type]:checked');
    if(code_changes_type.length > 0){
      code_changes_type.each(function(){
        html += $(this).val() + newLine; 
      });
      html += newLine;
    }

    // More details:
    html += '*More Details:*' + newLine;
    html += $('textarea[name=code_more_details]', idForm).val() + doubleNewLine; 
    
    // ====== CMS CHANGES
    html += 'h2. {color:#CE4844}CMS Changes{color}' + doubleNewLine;

    // We have CMS changes?
    html += '*We have CMS changes?*' + newLine;
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
      html += array_cms_changes_steps_description[index] + '*' + doubleNewLine;
    });

    // Comments
    html += 'h2. {color:#222}Comments{color}' + doubleNewLine;
    html += $('textarea[name=comments]', idForm).val() + doubleNewLine; 

    // ====== Unit Tests
    html += 'h2. {color:#AA6708}Unit Tests{color}' + doubleNewLine;
    var array_unit_tests_steps_title = [];
    var array_unit_tests_steps_description = [];    
    $('input[name^="unit_tests_steps_title"]').each(function() {
      array_unit_tests_steps_title.push($(this).val());
    });    
    $('textarea[name^="unit_tests_steps_description"]').each(function() {
      array_unit_tests_steps_description.push($(this).val());
    });    
    $('input[name^="unit_tests_steps_title"]').each(function(index) {
      html += '*' + (index + 1) + ') ' + array_unit_tests_steps_title[index] + '*' + newLine;
      html += array_unit_tests_steps_description[index] + '*' + doubleNewLine;
    });  
    
    // ====== Result
    $("#result").val(html);
    
  });
});