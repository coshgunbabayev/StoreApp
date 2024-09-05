const userNavArea = document.getElementById('userNavArea');

async function checkUser() {
    let res = await fetch('/api/check/account');

    if (res.ok) {
        res = await res.json();

        switch (res.role) {
            case 'store':
                userNavArea.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="/dashboard">Dashboard</a>
                </li>
                `
                break;

            case 'user':
                userNavArea.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="/basket">My basket</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/profile">Profile</a>
                </li>
                `
                break;
        }

    } else {
        userNavArea.innerHTML = `
        <li class="nav-item">
            <a class="nav-link" href="/login/user">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/signup/user">Sign up</a>
        </li>
        `;
    };
};

checkUser();