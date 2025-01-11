const closeBtn = document.querySelector('.notify__close');
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
closeBtn.addEventListener('click', function(){
  this.parentElement.style.display = 'none';
  header.style.height = '100vh';
  hero.style.height = 'calc(100vh - 192px)';
});

const scrollBtn = document.querySelector('.scroll-down-btn');
scrollBtn.addEventListener('click', scrollIntoView);

  e.preventDefault();
  const href = e.target.getAttribute('href');
  if (!href)
    return;

  const scrollTarget = document.getElementById(href.substring(1));
  if (!scrollTarget)
    return;

  const topOffset = 0;
  const elementPosition = scrollTarget.getBoundingClientRect().top;
  const offsetPosition = elementPosition - topOffset;

  window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
  });
}

