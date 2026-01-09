//template_mf6lxaq
//service_amv6uc8
//user_j4IeFqS57DtE2zYS2

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1/20;

function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;

    for (let i = 0; i < shapes.length; ++i) {
        const isOdd = i % 2 !== 0;
        const boolOdd = isOdd ? -1 : 1 ;
        shapes[i].style.transform = `translate(${x * boolOdd}px, ${y * boolOdd}px) rotate(${x * boolOdd * 10}deg)`
    }
}

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList += " dark-theme"
    }
    else {
        document.body.classList.remove("dark-theme")
    }
}

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('modal__overlay--loading')
    const success = document.querySelector('modal__overlay--success')
    loading.classList += " modal__overlay--visible";
    emailjs
        .sendForm('service_amv6uc8', 'template_mf6lxaq', event.target, 'user_j4IeFqS57DtE2zYS2'
       ).then(() => {
            loading.classList.remove('modal__overlay--visible');
            success.classList += ' modal__overlay--visible';
      }).catch(() => {
        loading.classList.remove('modal__overlay--visible');
        alert('This email service is temporarily unavailable. Please contact me directly at seabornescientist@gmail.com.'
        );
      })
}

function toggleModal() {
    if (ismodalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = true;
    document.body.classList += " modal--open"
}
