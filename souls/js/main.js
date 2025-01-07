const closeBtn = document.querySelector('.notify__close');
closeBtn.addEventListener('click', function(){
  this.parentElement.style.display = 'none';
});

const scrollBtn = document.querySelector('.scroll-down-btn');
scrollBtn.addEventListener('click', function(e){
  e.preventDefault();
  const href = this.getAttribute('href').substring(1);
  const scrollTarget = document.getElementById(href);

  const topOffset = 0;
  const elementPosition = scrollTarget.getBoundingClientRect().top;
  const offsetPosition = elementPosition - topOffset;

  window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
  });
});