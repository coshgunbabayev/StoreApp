document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const path = window.location.pathname
    const form = event.target;

    const formData = new FormData(form);

    var keys = Object.keys(Object.fromEntries(formData));
    var formEntries = Object.fromEntries(formData.entries());

    clearErrors(keys);

    let res = await fetch(`/api${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formEntries)
    });

    if (res.ok) {
        res = await res.json();
        localStorage.setItem('storeVerificationToken', res.token);

        switch (path) {
            case '/signup/store':
                window.location.href = '/verification/code/store';
                break;
            case '/signup/user':
                window.location.href = '/verification/code/user';
                break;
            case '/verification/code/store':
                window.location.href = '/login/store';
                break;
            case '/verification/code/user':
                window.location.href = '/login/user';
                break;
            case '/login/store':
                window.location.href = '/';
                break;
            case '/login/user':
                window.location.href = '/';
                break;
        };
    } else {
        res = await res.json();

        switch (path) {
            case '/signup/store':
            case '/signup/user':
            case '/login/store':
            case '/login/user':
                setErrors(res.errors);
                break;
            case '/verification/code/store':
                break;
            case '/verification/code/user':
                break;
        };
    };
});