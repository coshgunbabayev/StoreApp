const filterBtn = document.getElementById('filterBtn');
filterBtn.addEventListener('click', () => {
    const filterSection = document.querySelector('.filter-section');

    if (filterSection.style.display === 'none' || filterSection.style.display === '') {
        filterSection.style.display = 'block';
        filterBtn.classList.remove('btn-primary');
        filterBtn.classList.add('btn-secondary');
    } else {
        filterSection.style.display = 'none';
        filterBtn.classList.remove('btn-secondary');
        filterBtn.classList.add('btn-primary');
    }
});