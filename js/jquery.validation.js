$(function(){

    //Made fake placeholder instead of placeholder attribute.  Used to making it as company I worked with supported IE 9 *puke*
    $('.text, .textarea').each(function(){
        var parent = $(this);
        var input = parent.find("input[type=text], textarea");
        var placeholder = input.data("placeholder");
        input.after("<div class='placeholder'>" + placeholder + "</div>");
        input.on('keyup',function(e){
            if(input.val().length == 0){
                input.siblings('.placeholder').fadeIn();
            }
            else if(input.val().length > 0){
                input.siblings('.placeholder').hide();
            }
        })

        input.on('blur', function(){
            if(input.val().length == 0){
                parent.removeClass('valid');
            }
            else if(input.val().length > 0){
                parent.addClass('valid');
            }
        })
    })

    $('#myForm').on('submit', function(e){
        e.preventDefault();
        var errors = [];

        $('.text').each(function(){
            var parent = $(this);
            var input = parent.find("input[type=text]");
            if(input.val().length == 0){
                errors.push(input.attr("name"));
            }

        })

        var engine = $("[name='Engine Type']:checked").val();
        if(engine === undefined){
            errors.push("Engine Type");
        }

        if($('textarea').val().length == 0){
            errors.push("More Information");
        }

        if(errors.length > 0){
            if($('.error_list').length == 0)
                $('#myForm').before("<div class='error_list'><ul></ul></div>");
            else
                $('.error_list > ul').empty();

           for(i = 0; i < errors.length; i++){
               $('.error_list > ul').append("<li>" + errors[i] + " is missing or incorrect</li>")
           }
        }
        else{
            $("#formArea").siblings('h1').remove();
            $("#formArea").html("<h2>Congrats, you can fill out a form properly....</h2><img src='./img/joker_clapping.gif' />");
        }
    })
})