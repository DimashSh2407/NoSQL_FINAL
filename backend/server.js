const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы фронтенда
app.use(express.static('frontend'));

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/online-courses', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Подключено к MongoDB'))
.catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

// Маршруты
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Проверка обязательных переменных окружения
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  ВНИМАНИЕ: JWT_SECRET не установлен в .env файле!');
  console.warn('⚠️  Установите JWT_SECRET в файле .env для работы аутентификации');
  console.warn('⚠️  Пример: JWT_SECRET=your-super-secret-jwt-key-change-this-in-production');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📱 Откройте http://localhost:${PORT} в браузере`);
  if (process.env.JWT_SECRET) {
    console.log(`✅ JWT_SECRET установлен`);
  } else {
    console.log(`❌ JWT_SECRET НЕ установлен - аутентификация не будет работать!`);
  }
});

