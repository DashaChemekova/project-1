'use strict'

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно');
    const header = document.querySelector('.header'); 
    const button = document.querySelector('#select-tour'); 
    
    const heightHeader = header.offsetHeight;           // определяем высоту блока, включая внутренние отступы

    document.addEventListener('scroll', () => {         // навешиваем слушатель событий на scroll страницы и ожидаем ее прокрутку

        console.log('Страница скролится');

        let scrollPageY = this.scrollY;                 // получаем значение насколько прокрутили страницу

        if (scrollPageY > heightHeader) {               // условие: если расстояние от верха страницы больше высоты элемента
            header.classList.add('header--scroll')      // устанавливаем класс модификатора на элемент
        } else {
            header.classList.remove('header--scroll')   // удаляем класс модификатора у элемента
        }

    });

    button.addEventListener('click', () => {  
        console.log('Клик по кнопке');
        button.textContent = 'Тур заказан';


    });
}
);

