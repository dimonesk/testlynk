function validate(message,id) {
    let result,email,text;
    result = document.getElementsByClassName("message-incorrect")[id];
    email = document.getElementsByName("email")[id];
    text = message;

    if (!email.checkValidity()) {
        result.innerHTML = text;
        email.classList.add("error");
    } else {
        email.classList.remove("error");
    }
    return false;
}




