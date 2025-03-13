function gridify() { //untuk membuat grid pixel background
    const gridContainer = document.getElementById("color-grid"); //mencari div color-grid
    gridContainer.innerHTML = '';

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight; //dimensi viewport

    const cols = Math.floor(screenWidth / 32)+1;
    const rows = Math.floor(screenHeight / 32)+1; //satu pixel background = 64px, kita setel 32 biar 4x lebih besar (ada perspektif)

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 64px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 64px)`;//ngatur css div

    for (let i = 0; i < cols * rows; i++) { //buat pixel yang secukupnya
        const div = document.createElement('div');
        div.className = 'pixel';
        gridContainer.appendChild(div);
    }
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

window.onload = () => {
    gridify();
};
const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    }
  });