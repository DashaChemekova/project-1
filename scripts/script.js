'use strict'

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно');
       
    const popularItems = document.querySelectorAll('.popular__item');// Получаем все элементы popular__item 
    
    popularItems.forEach(item => {// Для каждого элемента добавляем обработчики событий
        const img = item.querySelector('.popular__img');
        const textContainer = document.createElement('div');
        textContainer.className = 'popular__text-container';
            
        const name = item.querySelector('.popular__name');// Перемещаем текстовые элементы в новый контейнер
        const country = item.querySelector('.popular__country');
        const price = item.querySelector('.popular__price');
        const date = item.querySelector('.popular__date');
        
        textContainer.appendChild(name);
        textContainer.appendChild(country);
        textContainer.appendChild(price);
        textContainer.appendChild(date);
        item.appendChild(textContainer);
            
        item.style.overflow = 'hidden';// Устанавливаем начальные стили
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
        
        item.addEventListener('mouseenter', () => {// мышку навели
            img.style.transform = 'translateY(0%)';
            textContainer.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {//мышку убрали
            img.style.transform = 'translateY(0)';
            textContainer.style.transform = 'translateY(100%)';
        });
    });

    // Карусель туров
    const carouselTrack = document.querySelector('.carousel__track');
    const carouselSlides = Array.from(document.querySelectorAll('.popular__item')).slice(0, 4); // Первые 4 тура
    const nextButton = document.querySelector('.carousel__button--next');
    const prevButton = document.querySelector('.carousel__button--prev');
    const slideWidth = 310; // Ширина слайда + отступ

    // Слайды для карусели
    carouselSlides.forEach((slide) => {
        
        const tourName = slide.querySelector('.popular__name').textContent;// Получаю текст из popular__name
        
        const nameLink = document.createElement('a');// Создаю новую ссылку с нужным классом
        nameLink.href = '#';
        nameLink.className = 'carousel__slide'; // новый класс вместо popular__name
        nameLink.textContent = tourName;

        const imgElement = slide.querySelector('.popular__img').cloneNode(true);
        
        const slideContainer = document.createElement('div');// Контейнер для слайда 
        slideContainer.className = 'carousel__slide';
        
        slideContainer.appendChild(imgElement);// Кидаю элементы в контейнер
        slideContainer.appendChild(nameLink);
        
        carouselTrack.appendChild(slideContainer);// Добавляю контейнер в трек карусели
    });

    let currentPosition = 0;
    const maxPosition = -(slideWidth * (carouselSlides.length - 2));

    nextButton.addEventListener('click', () => {//клик влево
        if (currentPosition > maxPosition) {
            currentPosition -= slideWidth;
            carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    prevButton.addEventListener('click', () => {//клик вправо
        if (currentPosition < 0) {
            currentPosition += slideWidth;
            carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    });

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

    // Кнопка "Смотреть всем"
    const viewAllButton = document.querySelector('.popular__link');
    const popularList = document.getElementById('popular-list');

    // Добавляем обработчик клика
    if (viewAllButton && popularList) {
        viewAllButton.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем стандартное поведение кнопки
            
            popularList.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}
);