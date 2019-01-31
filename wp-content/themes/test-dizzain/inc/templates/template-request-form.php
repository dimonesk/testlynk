<div class="request-form">
    <div class="wrapper">
        <div class="close-form icon-close"></div>
        <img class="request-form__logo" src="<?= get_template_directory_uri() ?>/inc/blocks/site-header/logo.png" width="152px" alt="logo">
        <div class="request-form__title-form">Request Beta Version</div>
        <form name="request-form" class="request-form__form" >
            <div class="request-form__row">
                <div class="request-form__form-col">
                    <input class="request-form__name" type="text" name="name" placeholder="Full Name">
                    <input class="request-form__email" type="email" name="email" placeholder="Email Address" required>
                    <input class="request-form__phone" type="text" name="phone" placeholder="Phone Number">
                    <select name="platform" class="request-form__platform">
                        <option></option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                    </select>
                </div>
                <div class="request-form__form-col">
                    <textarea name="message" class="request-form__message" placeholder="Message (optional)"></textarea>
                </div>
            </div>
            <div class="request-form__form-submit">
                <button class="request-form__submit" type="submit" >Get Beta of Olynk</button>
                <div class="message-incorrect"></div>
            </div>
        </form>
    </div>
    <div class="thank-message">
        <div class="thank-message__main-text">Request successfully sent.</div>
        <div class="thank-message__second-text">Thank you for your interest in Olynk. We will contact you shortly. </div>
    </div>
</div>