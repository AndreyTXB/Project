   //Tabs
window.addEventListener('DOMContentLoaded', () => { //Назначение глобального обработчика событий
    const tabs = document.querySelectorAll('.tabheader__item'),//создаём п-ую, на которую мы будем кликать
          tabsContent = document.querySelectorAll('.tabcontent'),
          //создаём п-ую, в которой будет находиться контент нашей вёрстки
          tabsParrent = document.querySelector('.tabheader__items');
          //создаём п-ую - родитель, который будет содержать все наши табы
 
    function hideTabContent () {//функция скрывает ненужные нам табы
        tabsContent.forEach(item => {//перебираем псевдо-массив; item - каждый отдельный контент
            item.classList.add('hide');//добавляем класс hide
            item.classList.remove('show', 'fade');//удаляем классы show и fade
        });
        tabs.forEach(item => {//перебираем все табы
            item.classList.remove('tabheader__item_active');//у каждого элемента-таба удаляем класс активности
        });
    }
    function showTabContent(i = 0) {//функция показывает нужные нам табы; по-умолчанию вызывается i = 0, т.е. первый таб
        tabsContent[i].classList.add('show','fade');//добавляем классы show и fade i-тому табу
        tabsContent[i].classList.remove('hide');//удаляем класс hide у i-того таба

        tabs[i].classList.add('tabheader__item_active');//добавляем класс активности i-тому элементу
    }
    hideTabContent();//вызываем функцию hideTabContent
    showTabContent();//вызываем функцию showTabContent

    tabsParrent.addEventListener('click', (event) => {
        //назначаем обработчик событий на меню, которое будет манипулировать этими функциями(делегирование событий)
        const target = event.target;//event - объект события, помещаем event.target в п-ую target
        if(target &&target.classList.contains('tabheader__item')) {
            //определяем, что мы точно кликнули в таб, а не в пустое пространство
            tabs.forEach((item, i) => {//перебираем все табы внутри tabs
                if(target == item) {
                    //если элемент псевдомассива совпадает с элементом, в который кликнул пользователь,
                    // то берём его номер и показываем на странице
                    hideTabContent();//вызываем функцию hideTabContent
                    showTabContent(i);//вызываем функцию showTabContent, показываем нужный нам i-тый таб 
                }
            });
        }
    });

    //Timer
     
    const deadline = '2021-08-31';//Задаём п-ую, которая будет содержать deadline в виде строки (наша конечная дата)

    function getTimeRemaning(endtime) {//функция определяет разницу между deadline и нашим текущим временем в мс
        const t = Date.parse(endtime) - Date.parse(new Date()),
        //создаём техническую п-ую, существующую только внутри этой функции, new Date - текущая дата на компе
              days = Math.floor(t / (1000 * 60 * 60 * 24)),//переменная с округлённым значением дней
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),//переменная с округлённым значением часов
              minutes = Math.floor((t / 1000 / 60) % 60),//переменная с округлённым значением минут
              seconds = Math.floor((t / 1000) % 60);//переменная с округлённым значением секунд

        return {//возвращаем переменные наружу, чтобы мы могли их использовать, но возвращаем объект
            'total': t,//общее количество миллисекунд
            'days': days,//количество дней
            'hours': hours,//количество часов
            'minutes': minutes,//количество минут
            'seconds': seconds//количество секунд
        };
    }

    function getZero(num) {//функция добавит при необходимости ноль
        if (num >= 0 && num < 10) {//функция выполнится, если число >= 0, но < 10
            return `0${num}`;//возвращаем модифицированные значения 
        } else {//иначе
            return num;//возвращаем это число без изменений
        }
    }

    function setClock(selector, endtime) {//функция устанавливает наш таймер прямо на страницу
        const timer = document.querySelector(selector),
        //переменная с селектором .timer, он же аргумент функции(selector), т.е. селектор обёртки таймера
              days = timer.querySelector('#days'),//переменная с id days внутри класса timer
              hours = timer.querySelector('#hours'),//переменная с id hours внутри класса timer
              minutes = timer.querySelector('#minutes'),//переменная  id minutes внутри класса timer
              seconds = timer.querySelector('#seconds'),//переменная с id seconds внутри класса timer
              timeInterval = setInterval(updateClock, 1000);//п-ая, запускающая функцию updateClock каждую секунду

        updateClock();//убираем моргания и задержку, updateClock установит текущую дату

        function updateClock() {//функция, которая расчитывает время на данную секунду
            const t = getTimeRemaning(endtime);//переменная с разницей между планируемым временем и текущим

            days.innerHTML = getZero(t.days);//полученную количество дней помещаем на страницу с нулём или без
            hours.innerHTML = getZero(t.hours);//полученную количество часов помещаем на страницу с нулём или без
            minutes.innerHTML = getZero(t.minutes);//полученную количество минут помещаем на страницу с нулём или без
            seconds.innerHTML = getZero(t.seconds);//полученную количество секунд помещаем на страницу с нулём или без

            if (t.total <= 0) {//если время вышло (разница между deadline и текущим временем <= 0)
                clearInterval(timeInterval);//останавливаем наш таймер
            }
        }     
    }
    setClock('.timer', deadline);//вызываем функцию setClock, 1ый арг. - селектор, 2ой - deadline

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),//п-ая с кнопками, вызывающими наше модальное окно
          modal = document.querySelector('.modal'),//п-ая, содержащая само модальное окно
          modalCloseBtn = document.querySelector('[data-close]');
          //п-ая с кнопкой, закрывающей наше модальное окно

    function openModal() {//функция, вызывающая модальное окно
        modal.classList.add('show');//добавляем класс show
        modal.classList.remove('hide');//удаляем класс hide
        // modal.classList.toggle('show');
        //тоглим (добавляем переключатель) класс - т.е. при нажатии появляется модальное окно
        document.body.style.overflow = 'hidden';
        //при открытии модального окна появляется стиль, запрещающий прокрутку страницы
        clearInterval(modalTimerId);//если пользователь сам открыл модальное окно, то мы отменяем его дальнейший вызов
    }
         
    modalTrigger.forEach(btn => {//перебираем псевдомассив modalTrigger, чтобы на него навесить обработчик событий
        btn.addEventListener('click', openModal);//на кнопку btn навешиваем обработчик событий
    });
 

    function closeModal() {//функция, закрывающая модальное окно
        modal.classList.add('hide');//добавляем класс hide
        modal.classList.remove('show');//удаляем класс show
        // modal.classList.toggle('show');
        //тоглим (добавляем переключатель) класс - т.е. при нажатии закрывается модальное окно
        document.body.style.overflow = '';//при закрытии окно пустая строка приводит значение по-умолчанию
    }

    //modalCloseBtn.addEventListener('click', closeModal);
    //навешиваем обработчик собитий на кнопку закрытия, после клика срабатывает функция closeModal

    modal.addEventListener('click', (e) => {
        //на модальное окно навешиваем обработчик событий клика
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            //если клик пользователя совпадает с модальным окном modal, а не modal__dialog
            closeModal();//то мы закрываем модальное окно, вызывая функцию closeModal
        }
    });

    document.addEventListener('keydown', (e) => {
        //на документ навешиваем обработчик событий, событие - нажатие кнопки
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            //если код нашей клавиши совпадает с Escape и модальное окно открыто (имеет класс show)
            closeModal();//то вызываем функцию closeModal, закрывая модальное окно
        }
    });

     const modalTimerId = setTimeout(openModal, 50000);//п-ая, вызывающая функцию openModal 1раз через 5с

    function showModalByScroll() {//функция, показывающая модальное окно во время скролла
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            //если window прокручена по Y + высота видимой части document
            openModal();//>= всей высоте контента document,
            // то пользователь долистал до конца страницы и вызывается функция openModal
            window.removeEventListener('scroll', showModalByScroll);
            //удаляем обработчик события scroll для window
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    //отслеживаем событие scroll для window, делая ссылку на исполнявшуюся функцию showModalByScroll

    //Используем классы для карточек

    class MenuCard{//создаём класс для карточек
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {//используем конструктор,
            // для того чтобы сконструировать этот класс
            this.src = src;//записываем аргументы в свойства
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;//записываем аргумент classes в свойства (это массив)
            this.parent = document.querySelector(parentSelector);//в метод parent помещаем DOM элемент
            this.transfer = 27;//задаём цену одного доллара в гривнах
            this.changeToUAH();//вызываем метод в свойствах, преобразовывающий стоимость из долларов в гривны
        }

        changeToUAH() {//создаем метод, преобразовывающий стоимость из долларов в гривны
            this.price = this.price * this.transfer;//конвертируем цену относительно трансфера
        }

        render() {//создаём метод, для создания вёрстки
            const element = document.createElement('div');//создаём п-ую, создающую элемент div

            if (this.classes.length === 0) {//если в наш classes ничего не предаётся
                this.element = 'menu__item';//создаём элементу класс menu__item
                element.classList.add(this.element);//добавляем к элементу класс menu__item
            } else {//иначе перебираем массив classes, каждый его элемент называем className
                this.classes.forEach(className => element.classList.add(className));
                //обращаемся к element и добавляем
                //  каждый класс, который будет находиться в этом массиве
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;//обращаемся к методу innerHTML элемента, который позволит динамически сформировать структуру
            this.parent.append(element);//наш новосозжанный элемент помещаем внутрь этого элемента
        }
    }

    const getResourse = async (url) => {
    const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

    return await res.json();
    };
    
    // getResourse('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    getResourse('http://localhost:3000/menu')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
            price = price * 27;
            element.classList.add('menu__item');

            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(element);
        });
    }
    // const div = new MenuCard(); //можно и так
    // div.render();
    // new MenuCard(//создаём объект MenuCard
    //     "img/tabs/vegy.jpg",//передаём элементы внутрь нашего класса
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container'//в parentSelector помещаем родительский селектор .menu .container
    // ).render();//вызываем метод render объекта MenuCard, он отработает и исчезнет

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     14,
    //     '.menu .container'
    // ).render();
 
    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     21,
    //     '.menu .container'
    // ).render();

    //Forms

    const forms = document.querySelectorAll('form');//получим все формы по тегу form

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {//postData занимается тем, что обрабатывает наш запрос,
        //она фетчит, т.е. посылает этот запрос на сервер, получает ответ от сервера,
        //например, что мы запостили успешно, а после трансформирует этот ответ в json
        const res = await fetch(url, {
            method: "POST",
                headers: {
                    'Content-type': 'application/json.js'
                },
                //body: JSON.stringify(object)//JSON.stringify превращает обычный объект в json
                body: data
        });

        return await res.json();//res.json() - это промис
    };

    function bindPostData(form) {//функция, отвечающая за постинг данных
        form.addEventListener('submit', (e) => {//на форму обработчик события submint,
            //срабатывающее когда мы пытаемся отправитькакую-нибудь форму
            e.preventDefault();//команда что-бы отменить стандартное поведение браузера

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');//вызываем open, чтобы настроить этот зарос
            // request.setRequestHeader('Content-type', 'application/json.js');
            //когда мы используем связку XMLHttpRequest + FormData, нам заголовок устанавливать не нужно,
            // он устанавливается автоматически, из-за этого была ошибка и мы на сервере не получили данных
            // request.setRequestHeader('Content-type', 'multipart/form-data');//настраиваем зоголовки, 
            //говорящие серверу что именно приходит
            const formData = new FormData(form);//создаём объект, позволяющий сформировать данные, 
            //которые заполнил пользователь внутри form-а, из которой нужно собрать данные
            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;                 
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // request.send(formData);//отправляем данные
            // request.send(json);//вместо formData втавляем json
            // fetch('server.php', {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json.js'
            //     },
            //     body: JSON.stringify(object)//JSON.stringify превращает обычный объект в json
            // })
            postData('http://localhost:3000/requests', json)//указываем путь сервера и body
            //.then(data => data.text())//трансформация данных
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove(); 
            }).catch(() => {
                showThanksModal(message.failure);//сообщение об ошибке
            }).finally(() => {
                form.reset();//очистить (сбросить) форму
            });
            // request.addEventListener('load', () => {//отслеживаем конечную загрузку нашего запроса
            //     if(request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();//очистить (сбросить) форму
            //         statusMessage.remove(); 
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {//ф-ия, говорящая спасибо в модальном окне
        const prevModalDialog = document.querySelector('.modal__dialog');//п-ая с divом модального окна

        prevModalDialog.classList.add('hide');//скрываем элемент ещё перед тем, как показать модальное окно
        openModal();//вызываем модальное окно

        const thanksModal = document.createElement('div');//создаём блок-обёртку
        thanksModal.classList.add('modal__dialog');//добавляем ему класс modal__dialog
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);//в модальное окно помещаем созданый нами блок-обёртку
        setTimeout(() => {
            thanksModal.remove();//удаляем нашу блок-обёртку через 4 секунды, чтобы не накапливались новые блоки
            prevModalDialog.classList.add('show');//показываем наш предыдущий контент
            prevModalDialog.classList.remove('hide');
            closeModal();//закрываем модальное окно
        }, 4000);//используем асинхронную операцию с setTimeout

    }

    //API application programming interface - программный интерфейс приложения
   //DOM API 
   //смотри JSONPlaceholder

    // fetch('https://jsonplaceholder.typicode.com/posts', {//как будто мы на сервер отправляем POST-запрос
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())//метод response.json() превращаяе данные формате json в обычный js-объект,
    //     //но возвращает нам promise чтобы пострить дальше цепочку дальше
    //     .then(json => console.log(json))

    fetch('http://localhost:3000/menu')//обращаемыся к 
        .then(data => data.json())//берём ответ от сервера data
        .then(res => console.log(res));//и превращаем его в обычный js-объект
});