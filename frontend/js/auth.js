// Утилиты для работы с аутентификацией

// Используем глобальную конфигурацию из config.js

// Получить токен из localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Получить текущего пользователя
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Проверка авторизации
function checkAuth() {
    const token = getToken();
    const user = getCurrentUser();
    
    if (token && user) {
        // Обновляем навигацию
        updateNavigation(user);
        return true;
    }
    return false;
}

// Обновление навигации в зависимости от роли
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
            logoutLink.addEventListener('click', handleLogout);
        }
    }
}

// Выход из системы
function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

// Получить заголовки с токеном для API запросов
function getAuthHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

// Проверка авторизации при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
} else {
    checkAuth();
}

