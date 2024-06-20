let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{

  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

}

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

}

document.addEventListener('DOMContentLoaded', function() {
  const orderForm = document.getElementById('orderForm');

  orderForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Assuming the order form is valid, you can show the confirmation message
      alert('Your order has been placed!'); // Use a modal or custom notification for a better user experience
      // You can also reset the form after submission if needed:
      // orderForm.reset();
  });
});


function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3500);
}

window.onload = fadeOut();


document.addEventListener('DOMContentLoaded', function() {
  const orderForm = document.getElementById('orderForm');

  orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const foodItem = this.querySelector('input[name="foodItem"]').value;

    // Send order details to server
    fetch('/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ foodItem })
    })
    .then(response => {
      if (response.ok) {
        alert('Your order has been placed!');
      } else {
        throw new Error('Failed to submit order');
      }
    })
    .catch(error => {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again later.');
    });
  });
});
