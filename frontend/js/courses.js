// Загрузка и отображение курсов

// Используем глобальную конфигурацию из config.js

// Загрузка всех курсов
async function loadCourses() {
    try {
        console.log('Загрузка курсов...');
        const response = await fetch(`${window.API_BASE_URL}/courses`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const courses = await response.json();
        console.log('Получено курсов:', courses.length, courses);
        
        displayCourses(courses);
    } catch (error) {
        console.error('Ошибка загрузки курсов:', error);
        const container = document.getElementById('coursesContainer');
        if (container) {
            container.innerHTML = 
                '<p class="error-message">Ошибка загрузки курсов. Проверьте подключение к серверу.</p>';
        }
    }
}

// Отображение курсов на странице
function displayCourses(courses) {
    const container = document.getElementById('coursesContainer');
    
    if (!container) {
        console.error('Элемент coursesContainer не найден!');
        return;
    }
    
    console.log('Отображение курсов, количество:', courses.length);
    
    if (!courses || courses.length === 0) {
        container.innerHTML = '<p>Курсы пока не добавлены</p>';
        return;
    }
    
    // Очистка контейнера
    container.innerHTML = '';
    
    // Создание карточек курсов через DOM API для безопасности
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.style.cursor = 'pointer';
        card.onclick = () => viewCourseDetails(course._id);
        
        // Заголовок
        const title = document.createElement('h3');
        title.textContent = course.title || 'Без названия';
        card.appendChild(title);
        
        // Инструктор
        const instructor = document.createElement('p');
        instructor.className = 'instructor';
        instructor.textContent = `Instructor: ${course.instructor?.name || 'Not specified'}`;
        card.appendChild(instructor);
        
        // Описание
        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = course.description || '';
        card.appendChild(description);
        
        // Цена
        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = `${course.price || 0} ₸`;
        card.appendChild(price);
        
        // Количество уроков
        const lessonsCount = document.createElement('p');
        lessonsCount.className = 'lessons-count';
        lessonsCount.textContent = `Lessons: ${course.lessons?.length || 0}`;
        card.appendChild(lessonsCount);
        
        // Кнопка
        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.textContent = 'Подробнее';
        button.onclick = (e) => {
            e.stopPropagation();
            viewCourseDetails(course._id);
        };
        card.appendChild(button);
        
        container.appendChild(card);
    });
    
    console.log('Курсы отображены успешно');
}

// Просмотр деталей курса (глобальная функция)
window.viewCourseDetails = function(courseId) {
    window.location.href = `pages/course-details.html?id=${courseId}`;
};

// Загрузка курсов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен, проверка coursesContainer...');
    const container = document.getElementById('coursesContainer');
    if (container) {
        console.log('Элемент coursesContainer найден, загрузка курсов...');
        loadCourses();
    } else {
        console.error('Элемент coursesContainer не найден на странице!');
    }
});

