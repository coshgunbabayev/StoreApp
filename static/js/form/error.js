function setErrors(errors) {
    Object.keys(errors).forEach(function (key) {
        document.getElementById(key).classList.add('is-invalid');
        document.getElementById(`${key}Error`).innerText = errors[key];
    });
};

function clearErrors(keys) {
    keys.forEach(function (key) {
        document.getElementById(key).classList.remove('is-invalid');
        document.getElementById(`${key}Error`).innerText = '';
    });
};