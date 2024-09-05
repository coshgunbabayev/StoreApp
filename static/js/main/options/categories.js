const categoriesDiv = document.getElementById('categoriesDiv');

async function placeCategories() {
    const res = await fetch('/api/json/categories');

    if (res.ok) {
        const categories = await res.json();

        categoriesDiv.innerHTML = '';
        categories.forEach(category => {
            categoriesDiv.innerHTML += `
            <a href="/kategori/1" class="btn btn-secondary btn-sm">${category.name}</a>
        `;
        });
    };
};

placeCategories();