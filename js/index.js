const burgerSpans = document.getElementById('burger-spans');
const burgerSpan1 = document.getElementById('burger-span1');
const burgerSpan2 = document.getElementById('burger-span2');
const burgerSpan3 = document.getElementById('burger-span3');
const burgerMenu = document.getElementById('burger-menu');
const headerRegBtn = document.getElementById('header__top_btn');
const burgerRegBtn = document.getElementById('burger-btn');
const inputTel = document.getElementById('input-tel');
const form = document.getElementById('form');
const modal = document.getElementById('modal');
const checkups = document.querySelectorAll('.checkup__list_item');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
const numberSlide = document.getElementById('number-slide');
const dataFromAPi = [];

const showModal = () => {
    modal.classList.toggle('modal-active');
    form.reset()
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

burgerSpans.addEventListener('click', () => {
    burgerMenu.classList.toggle('header__burger-on');
    document.body.classList.toggle('no-scroll');
    burgerSpan1.classList.toggle('header__burger_span1-active');
    burgerSpan2.classList.toggle('header__burger_span2-active');
    burgerSpan3.classList.toggle('header__burger_span3-active');
    modal.classList.remove('modal-active');
})

headerRegBtn.addEventListener('click', () => showModal())
burgerRegBtn.addEventListener('click', () => showModal())

const maskOptions = {
    mask: '+{0}(000)000-00-00'
};
const mask = IMask(inputTel, maskOptions);

fetch(`https://api.skilla.ru/mango/getList`, {
    method: 'POST',
    headers: {
        Authorization: 'Bearer testtoken'
    }
})
    .then((response) => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Страница не найдена');
            } else {
                throw new Error('Произошла ошибка');
            }
        }
        return response.json();
    })
    .then((data) => dataFromAPi.push(data))
    .catch(() => alert("Сервер не отвечает, пока что слайдер будет недоступен =_( "))
console.log(dataFromAPi)


arrowLeft.addEventListener('click', () => {
    if (+numberSlide.textContent === 1) {
        return
    } else { numberSlide.textContent = +numberSlide.textContent - 1 }

})

arrowRight.addEventListener('click', () => {
    if (+numberSlide.textContent === 4) {
        return
    } else {
        checkups.forEach((element) => {
            element.textContent = dataFromAPi[0].results[getRandomNumber()].date
        })
        numberSlide.textContent = +numberSlide.textContent + 1
    }
})

