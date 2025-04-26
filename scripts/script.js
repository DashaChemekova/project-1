'use strict'

// Предзагрузчик
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    
    // Показываем контент после загрузки страницы
    setTimeout(function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        content.style.opacity = '1';
    }, 2000); // 2 секунды задержки для демонстрации
});

// Инициализация анимации точек предзагрузчика
function initLoaderDots() {
    const dots = document.querySelectorAll('.dot1, .dot2, .dot3');
    
    dots.forEach((dot, index) => {
        dot.style.animation = `bounce 1.5s infinite ${index * 0.2}s`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initLoaderDots();//запускаю предзагрузчик

    // Проверяем, есть ли сохраненный пользователь
    checkLoggedInUser();

    // Создаем массив с текстами пунктов меню
    const menuItems = [
        "О нас",
        "Контакты",
        "Путешествия",
        "Направления",
        "Туры"
    ];

    const menuContainer = document.querySelector('.menu');

    if (menuContainer) {
        // Заполняем меню
        for (let i = 0; i < menuItems.length; i++) {
            // Определяем, активный ли это пункт (первый пункт активный)
            const isActive = i === 0 ? 'menu_item--active' : '';
            
            // шаблон разметки
            const menuItem = `
                <li class="menu__item ${isActive}">
                    <a class="menu__link" href="#">${menuItems[i]}</a>
                </li>
            `;
                    
            menuContainer.innerHTML += menuItem;// Добавляем пункт в меню
        }
    }
    
    const tourTemplate = (item) => {// Шаблон для создания popular__item
        return `
            <li class="popular__item">
                <a class="popular__name" href="#">${item.name}</a>
                <p class="popular__country">Страна: ${item.country}</p>
                <p class="popular__price">Стоимость: ${item.price}</p>
                <p class="popular__date">Дата: ${item.date}</p>
                <img class="popular__img" src="${item.image}" alt="${item.alt}" width="270">
            </li>
        `;
    };

    // Загрузка данных через fetch
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const popularList = document.querySelector('.popular__list');
            
            if (popularList) {
                popularList.innerHTML = '';
                data.forEach(item => {
                    popularList.innerHTML += tourTemplate(item);
                });

                initPopularItemsAnimations();
                initCarousel(data.slice(0, 4));
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });

    function initPopularItemsAnimations() {
        const popularItems = document.querySelectorAll('.popular__item');
        
        popularItems.forEach(item => {
            const img = item.querySelector('.popular__img');
            const textContainer = document.createElement('div');
            textContainer.className = 'popular__text-container';
                
            const name = item.querySelector('.popular__name');
            const country = item.querySelector('.popular__country');
            const price = item.querySelector('.popular__price');
            const date = item.querySelector('.popular__date');
            
            textContainer.appendChild(name);
            textContainer.appendChild(country);
            textContainer.appendChild(price);
            textContainer.appendChild(date);
            item.appendChild(textContainer);
                
            item.style.overflow = 'hidden';
            item.style.position = 'relative';
            img.style.transition = 'transform 0.5s ease';
            textContainer.style.position = 'absolute';
            textContainer.style.bottom = '0';
            textContainer.style.left = '0';
            textContainer.style.width = '100%';
            textContainer.style.padding = '9rem';
            textContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            textContainer.style.transform = 'translateY(100%)';
            textContainer.style.transition = 'transform 0.5s ease';       
            
            item.addEventListener('mouseenter', () => {
                img.style.transform = 'translateY(0%)';
                textContainer.style.transform = 'translateY(0)';
            });
            
            item.addEventListener('mouseleave', () => {
                img.style.transform = 'translateY(0)';
                textContainer.style.transform = 'translateY(100%)';
            });
        });
    }

    function initCarousel(slidesData) {
        const carouselContainer = document.querySelector('.carousel__container');
        carouselContainer.innerHTML = `
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    ${slidesData.map(item => `
                        <div class="swiper-slide">
                            <img src="${item.image}" alt="${item.alt}" width="270">
                            <a href="#">${item.name}</a>
                        </div>
                    `).join('')}
                </div>
                <!-- Классы к кнопкам -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        `;
    
        // Swiper
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 3, // Количество видимых слайдов
            spaceBetween: 30, // Расстояние между слайдами
            loop: true, // Бесконечная прокрутка
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                // Адаптивность для разных экранов
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }

    //Скролл хедера
    const header = document.querySelector('.header');
    if (header) {
        const heightHeader = header.offsetHeight;// определяем высоту блока, включая внутренние отступы
        
        document.addEventListener('scroll', () => {// навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку
            const scrollPageY = window.scrollY;// получаем значение насколько прокрутили страницу
            
            if (scrollPageY > heightHeader) {// условие: если расстояние от верха страницы больше высоты элемента
                header.classList.add('header--scroll');// устанавливаем класс модификатора на элемент
            } else {
                header.classList.remove('header--scroll');// удаляем класс модификатора у элемента
            }
        });
    }

    //Кнопка выбора тура
    const selectTourButton = document.querySelector('#select-tour');
    if (selectTourButton) {
        selectTourButton.addEventListener('click', () => {
            if (selectTourButton.textContent === 'Выбрать тур') {
                selectTourButton.textContent = 'Тур заказан';
            } else {
                selectTourButton.textContent = 'Выбрать тур';
            }
        });
    }

    // Кнопка "Смотреть все"
    const viewAllButton = document.querySelector('.popular__link');
    const toursList = document.getElementById('tours-list'); // Изменили на ID секции

    // Добавляем обработчик клика
    if (viewAllButton && toursList) {
        viewAllButton.addEventListener('click', (e) => {
            e.preventDefault();
            toursList.scrollIntoView({
                behavior: 'smooth',
                block: 'start'  
            });
        });
    }

    // Модальное окно для входа/регистрации
    const loginButton = document.querySelector('.header__login');
    const modal = document.getElementById('auth-modal');
    const closeButton = modal.querySelector('.modal__close');
    const tabs = modal.querySelectorAll('.modal__tab');
    const tabContents = modal.querySelectorAll('.modal__tab-content');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Проверяем, есть ли сохраненный пользователь
    function checkLoggedInUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        const loginButton = document.querySelector('.header__login');
        
        if (user && loginButton) {
            loginButton.textContent = user.username;
            loginButton.classList.add('header__login--logged-in');
        }
    }
    
    if (loginButton) {// Открытие модального окна
        loginButton.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('user'));
            
            if (user) {
                // Если пользователь уже вошел, предлагаем выход
                if (confirm(`Вы хотите выйти из аккаунта ${user.username}?`)) {
                    localStorage.removeItem('user');
                    loginButton.textContent = 'Вход/регистрация';
                    loginButton.classList.remove('header__login--logged-in');
                }
            } else {
                modal.style.display = 'block';
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {// Закрытие модального окна
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {// Закрытие при клике вне модального окна
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    tabs.forEach(tab => {// Переключение между вкладками
        tab.addEventListener('click', () => {
            // Убираем активный класс у всех вкладок и контента
            tabs.forEach(t => t.classList.remove('modal__tab--active'));
            tabContents.forEach(c => c.classList.remove('modal__tab-content--active'));
            
            // Добавляем активный класс текущей вкладке и соответствующему контенту
            tab.classList.add('modal__tab--active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('modal__tab-content--active');
        });
    });

    if (loginForm) {// Обработка формы входа
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.elements.username.value;
            const password = loginForm.elements.password.value;
            
            // Проверяем наличие пользователя в localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            
            if (user && user.username === username && user.password === password) {
                alert(`Добро пожаловать, ${username}! Вы успешно авторизовались.`);
                modal.style.display = 'none';
                loginForm.reset();
                
                // Обновляем кнопку входа
                const loginButton = document.querySelector('.header__login');
                if (loginButton) {
                    loginButton.textContent = username;
                    loginButton.classList.add('header__login--logged-in');
                }
            } else {
                alert('Неверное имя пользователя или пароль!');
            }
        });
    }

    if (registerForm) {// Обработка формы регистрации
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = registerForm.elements.name.value;
            const username = registerForm.elements.username.value;
            const email = registerForm.elements.email.value;
            const password = registerForm.elements.password.value;
            const confirmPassword = registerForm.elements['confirm-password'].value;
            
            // Проверка совпадения паролей
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }
            
            // Сохраняем пользователя в localStorage
            const user = {
                name,
                username,
                email,
                password
            };
            
            localStorage.setItem('user', JSON.stringify(user));
            
            alert(`Поздравляем, ${name}! Вы успешно зарегистрировались.`);
            modal.style.display = 'none';
            registerForm.reset();
            
            // Обновляем кнопку входа
            const loginButton = document.querySelector('.header__login');
            if (loginButton) {
                loginButton.textContent = username;
                loginButton.classList.add('header__login--logged-in');
            }
        });
    }
});