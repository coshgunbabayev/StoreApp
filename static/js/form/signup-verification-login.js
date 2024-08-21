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

        if (path === '/signup/store') {
            window.location.href = `/verification/code/store/${res.token}`;
        } else if (path === '/signup/user') {
            window.location.href = `/verification/code/user/${res.token}`;
        } else if (path.startsWith('/verification/code/store/')) {
            window.location.href = '/login/store/';
        } else if (path.startsWith('/verification/code/user/')) {
            window.location.href = '/login/user';
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
                    window.location.href = '/verification/email/store';
                } else if (res.message === 'UserVerified') {
                    window.location.href = '/login/store';
                };
            } else if (res.errors) {
                setErrors(res.errors);
            };

        } else if (path.startsWith('/verification/code/user/')) {
            if (res.message) {
                if (res.message === 'TokenError') {
                    window.location.href = '/verification/email/user';
                } else if (res.message === 'UserVerified') {
                    window.location.href = '/login/user';
                };
            } else if (res.errors) {
                setErrors(res.errors);
            };
        };
    };
});