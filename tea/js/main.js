const menuBtn = document.querySelector('.menu__btn');
const menuClose = document.querySelector('.menu__close-btn');
const menuList = document.querySelector('.menu__list');
const menuShadow = document.querySelector('.menu_closed')

menuBtn.addEventListener('click', () => {
	menuList.classList.toggle('menu__list_opened');
	menuShadow.classList.toggle('menu_opened');
});

menuClose.addEventListener('click', () => {
	menuList.classList.remove('menu__list_opened');
	menuShadow.classList.remove('menu_opened');
});