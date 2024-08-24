const generalNotification = document.getElementById('generalNotification');

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const path = window.location.pathname
    const form = event.target;

    const formData = new FormData(form);

    var keys = Object.keys(Object.fromEntries(formData));
    var formEntries = Object.fromEntries(formData.entries());

    generalNotification.innerText = '';
    generalNotification.className = 'alert text-center mb-4';
    generalNotification.style.display = 'none';

    clearErrors(keys);

    let res = await fetch(`/api${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formEntries)
    });
    console.log(res);

    if (res.ok) {
        if (path === '/signup/store' || path === '/signup/user') {
            form.reset();
            generalNotification.innerText = 'Your account has been successfully created. A link and code have been sent to your email for verification.';
            generalNotification.classList.add('alert-success');
            generalNotification.style.display = 'block';

        } else if (path.startsWith('/verification/code/store/')) {
            window.location.href = '/login/store/';
        } else if (path.startsWith('/verification/code/user/')) {
            window.location.href = '/login/user';
        } else if (path === '/verification/email/store' || path === '/verification/email/user') {
            console.log("--------------------------------");
            form.reset();
            generalNotification.innerText = 'A link have been sent to your email for verification.';
            generalNotification.classList.add('alert-success');
            generalNotification.style.display = 'block';

        } else if (path === '/login/store' || path === '/login/user') {
            window.location.href = '/';
        };

    } else {
        res = await res.json();

        if (path === '/signup/store' || path === '/signup/user' ||
            path === '/login/store' || path === '/login/user') {
            setErrors(res.errors);

        } else if (path.startsWith('/verification/code/store/')) {
            if (res.message) {
                if (res.message === 'TokenError') {
                    form.reset();
                    generalNotification.innerHTML = `
                    There was a problem with account verification. Please get a new verification link and code with your email.
                    <a href="/verification/email/store">Click here</a>
                    `;
                    generalNotification.classList.add('alert-warning');
                    generalNotification.style.display = 'block';

                } else if (res.message === 'UserVerified') {
                    form.reset();
                    generalNotification.innerHTML = `
                    Your account has already been verified. Login to your account
                    <a href="/login/store">Click here</a>
                    `;
                    generalNotification.classList.add('alert-info');
                    generalNotification.style.display = 'block';
                };

            } else if (res.errors) {
                setErrors(res.errors);
            };

        } else if (path.startsWith('/verification/code/user/')) {
            if (res.message) {
                if (res.message === 'TokenError') {
                    form.reset();
                    generalNotification.innerHTML = `
                    There was a problem with account verification. Please get a new verification link and code with your email.
                    <a href="/verification/email/user">Click here</a>
                    `;
                    generalNotification.classList.add('alert-warning');
                    generalNotification.style.display = 'block';

                } else if (res.message === 'UserVerified') {
                    form.reset();
                    generalNotification.innerHTML = `
                    Your account has already been verified. Login to your account
                    <a href="/login/user">Click here</a>
                    `;
                    generalNotification.classList.add('alert-info');
                    generalNotification.style.display = 'block';
                };

            } else if (res.errors) {
                setErrors(res.errors);
            };

        } else if (path === '/verification/email/store') {
            if (res.message) {
                if (res.message === 'UserVerified') {
                    form.reset();
                    generalNotification.innerHTML = `
                    Your account has already been verified. Login to your account
                    <a href="/login/store">Click here</a>
                    `;
                    generalNotification.classList.add('alert-info');
                    generalNotification.style.display = 'block';
                };

            } else if (res.errors) {
                setErrors(res.errors);
            };

        } else if (path === '/verification/email/user') {
            if (res.message) {
                if (res.message === 'UserVerified') {
                    form.reset();
                    generalNotification.innerHTML = `
                    Your account has already been verified. Login to your account
                    <a href="/login/user">Click here</a>
                    `;
                    generalNotification.classList.add('alert-info');
                    generalNotification.style.display = 'block';
                };

            } else if (res.errors) {
                setErrors(res.errors);
            };
        };
    };
});