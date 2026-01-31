// Главный скрипт для index.html

// Проверка авторизации при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
        updateNavigation(user);
    }
});

function updateNavigation(user) {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const myCoursesLink = document.getElementById('myCoursesLink');
    const adminLink = document.getElementById('adminLink');
    const logoutLink = document.getElementById('logoutLink');

    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        
        if (user.role === 'student' && myCoursesLink) {
            myCoursesLink.style.display = 'block';
        }
        
        if (user.role === 'instructor' && adminLink) {
            adminLink.style.display = 'block';
        }
        
        if (logoutLink) {
            logoutLink.style.display = 'block';
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            });
        }
    }
}

