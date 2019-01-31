const button_newsletter = document.getElementsByClassName("newsletter__submit")[0];

button_newsletter.addEventListener('click', function () {
    validate("Oops! Incorrect email address", 1 );
});

function showThankCallback() {
    let thankWindow = document.getElementsByClassName("result-message")[0];
    thankWindow.classList.add("show");
    setTimeout(closeForms, 5000);
}

(function ($) {
    let newsletterSubmit = function () {
        let $form = $(this);
        let dataForm = $form.serialize();
        $.ajax({
            type: "POST",
            url: "/wp-admin/admin-ajax.php?action=newsletterSubmit",
            data: dataForm,
            beforeSend: function (data) {
                $form.find('button[type="submit"]').prop("disabled", true);
            },
            success: function (data) {
                if (data.status == 'success') {
                    $form.trigger('reset');
                    showThankCallback();
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
    $(".newsletter").submit(newsletterSubmit);

})(jQuery)