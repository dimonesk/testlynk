const buttonShowForm = document.getElementsByClassName("show-form");

for (let item of buttonShowForm) {
    item.addEventListener('click', function () {
        window.scrollTo(0,0)
        let topForm = document.getElementsByClassName("request-form")[0];
        topForm.classList.add("show");
    })
}

const button = document.getElementsByClassName("request-form__submit")[0];

button.addEventListener('click', function () {
    validate("Oops! Incorrect email address",0);
});

function closeForms(){
    let findElements = document.querySelectorAll('.show');
    for (let item of findElements) {
        item.classList.remove("show");
    }
}

function showThank() {
    let thankWindow = document.getElementsByClassName("thank-message")[0];
    thankWindow.classList.add("show");
    setTimeout(closeForms, 5000);
}

const close = document.getElementsByClassName('close-form')[0];

close.addEventListener('click',function () {
    closeForms();
})

document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
    };
})(), true);

(function ($) {
    let sendPost = function () {
        let $form = $(this);
        let dataForm = $form.serialize();
        $.ajax({
            type: "POST",
            url: "/wp-admin/admin-ajax.php?action=sendPost",
            data: dataForm,
            beforeSend: function (data) {
                $form.find('button[type="submit"]').prop("disabled", true);
            },
            success: function (data) {
                if (data.status == 'success') {
                    $form.trigger('reset');

                    showThank();
                } else {
                    validate("Request processing error");
                }

            },
            error: function () {
                validate("Error");
            },
            complete: function (data) {
                $form.find('button[type="submit"]').prop("disabled", false);
            },
        });
        return false;
    }
    $(".request-form__form").submit(sendPost);

    $(document).ready(function() {
        $('.request-form__platform').select2({
            placeholder: 'Select Platform',
            width: '100%',
        });
    });


})(jQuery)