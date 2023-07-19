const button = document.querySelectorAll('.btn');
let screenDiv = document.querySelector('.screen'); 

button.forEach(btn => {
    btn.addEventListener('click', () => {
        let screenEleDiv = document.createElement('div');
        let screenEle = document.createElement('p');
        screenEle.style.cssText = "color: yellow; font-size: 1.5rem";

        screenEle.innerText = btn.value;
        screenEleDiv.appendChild(screenEle);

        screenDiv.appendChild(screenEleDiv);
        console.log(btn.value);
    })
})


function input(btn)
{
    if(btn == '+' || btn == '-' || btn == '%' || btn == '÷' || btn == 'x')
        operate()
}


function operate(btn)
{
    
}