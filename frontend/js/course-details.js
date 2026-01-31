// Детали курса

// Используем глобальную конфигурацию из config.js

// Получить ID курса из URL
function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Загрузка деталей курса
async function loadCourseDetails() {
    const courseId = getCourseIdFromUrl();
    if (!courseId) {
        document.getElementById('courseDetails').innerHTML = 
            '<p class="error-message">Курс не найден</p>';
        return;
    }

    try {
        const response = await fetch(`${window.API_BASE_URL}/courses/${courseId}`);
        
        if (!response.ok) {
            throw new Error('Курс не найден');
        }
        
        const course = await response.json();
        displayCourseDetails(course);
    } catch (error) {
        console.error('Ошибка загрузки курса:', error);
        document.getElementById('courseDetails').innerHTML = 
            '<p class="error-message">Ошибка загрузки курса</p>';
    }
}

// Отображение деталей курса
function displayCourseDetails(course) {
    const container = document.getElementById('courseDetails');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('token');
    
    console.log('Отображение курса. Пользователь:', user);
    console.log('Токен:', token ? 'Присутствует' : 'Отсутствует');
    
    let actionButton = '';
    
    if (user && user.role === 'student' && token) {
        actionButton = `
            <button class="btn btn-success" onclick="window.enrollInCourse('${course._id}')">
                Записаться на курс
            </button>
        `;
    } else if (!user || !token) {
        actionButton = `
            <p class="error-message">Для записи на курс необходимо <a href="login.html">войти в систему</a></p>
        `;
    } else if (user.role !== 'student') {
        actionButton = `
            <p class="error-message">Только студенты могут записываться на курсы</p>
        `;
    }
    
    container.innerHTML = `
        <div class="course-details">
            <h2>${course.title}</h2>
            <div class="meta">
                <p><strong>Instructor:</strong> ${course.instructor?.name || 'Not specified'}</p>
                <p><strong>Price:</strong> ${course.price} ₸</p>
            </div>
            <div class="description">
                <h3>Описание</h3>
                <p>${course.description}</p>
            </div>
            ${actionButton}
            <div class="lessons-list">
                <h3>Course Lessons (${course.lessons?.length || 0})</h3>
                ${course.lessons && course.lessons.length > 0 
                    ? course.lessons.map((lesson, index) => `
                        <div class="lesson-item">
                            <h4>Lesson ${index + 1}: ${lesson.title}</h4>
                            <p>${lesson.content}</p>
                            <p class="duration">Duration: ${lesson.duration} minutes</p>
                        </div>
                    `).join('')
                    : '<p>Уроки пока не добавлены</p>'
                }
            </div>
        </div>
    `;
}

// Записаться на курс (глобальная функция для onclick)
window.enrollInCourse = async function(courseId) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (!token || !user) {
        alert('Необходимо войти в систему');
        window.location.href = 'login.html';
        return;
    }

    if (user.role !== 'student') {
        alert('Только студенты могут записываться на курсы');
        return;
    }

    try {
        console.log('Запись на курс:', courseId);
        console.log('Токен:', token ? 'Присутствует' : 'Отсутствует');
        
        const response = await fetch(`${window.API_BASE_URL}/courses/${courseId}/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('Ответ сервера:', data);

        if (response.ok) {
            alert('Вы успешно записались на курс!');
            window.location.href = 'my-courses.html';
        } else {
            console.error('Ошибка записи:', data);
            alert(data.error || 'Ошибка записи на курс');
        }
    } catch (error) {
        console.error('Ошибка соединения:', error);
        alert('Ошибка соединения с сервером');
    }
}

// Загрузка при открытии страницы
if (document.getElementById('courseDetails')) {
    loadCourseDetails();
}

