document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const cartDropzone = document.getElementById('cartDropzone');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    let total = 0;
    let itemCount = 0;

    cartButton.addEventListener('click', () => {
        cartDropzone.classList.toggle('active');
    });

    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('dragstart', handleDragStart);
        product.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(e) {
        this.style.opacity = '0.4';
        e.dataTransfer.setData('text/plain', this.innerHTML);
        e.dataTransfer.setData('price', this.dataset.price);
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
    }

    cartDropzone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        cartDropzone.style.backgroundColor = '#0F1A1E';
    });

    cartDropzone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        cartDropzone.style.backgroundColor = '#0B1215';
    });

    cartDropzone.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';
        
        cartDropzone.style.backgroundColor = '#0F1A1E';
    });

    cartDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        cartDropzone.style.backgroundColor = '#0B1215'; 
        
        const productHTML = e.dataTransfer.getData('text/plain');
        const price = parseInt(e.dataTransfer.getData('price'));

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = productHTML;
        const productName = tempDiv.querySelector('h3').textContent;
        const productPrice = tempDiv.querySelector('.price').textContent;
        
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h4>${productName}</h4>
                <span class="price">${productPrice}</span>
            </div>
            <button class="remove-item">×</button>
        `;

        const removeButton = cartItem.querySelector('.remove-item');
        removeButton.addEventListener('click', () => {
            cartItem.remove();
            updateCart(-price);
        });

        cartItems.appendChild(cartItem);
        updateCart(price);
    });

    function updateCart(price) {
        total += price;
        if(price > 0) itemCount++;
        else itemCount--;
        cartTotal.textContent = total;
        cartCount.textContent = itemCount;
    }
}); 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
