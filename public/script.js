const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')

// Função que carrega o conteúdo da API.
async function load() {
    // fetch está como await para evitar que entre num esquema de promisse e só devolva o conteúdo após a iteração qua acontece em seguida.
    const res = await fetch('http://localhost:3000/')
        .then(data => data.json())
    // Iterando no vetor com o conteúdo (JSON) que está vindo da API e adicionando-os no frontend.
    res.urls.map(({name, url}) => addElement({name, url}))
}

load()


const elements = [];


function addElement({ name, url }) {
    const li = document.createElement('li');
    const trash = document.createElement('span')
    const a = document.createElement('a')

    a.href = url
    a.target = "_blank"
    a.innerHTML = `${name}`;

    li.append(a)
    elements.push(li);

    const respostas = document.getElementById('respostas');
    respostas.innerHTML = '';

    trash.innerHTML= "x"
    trash.onclick= () => removeElement(trash, { name, url })

    elements.forEach((element) => {
        respostas.appendChild(element);
    })
    li.append(a)
    li.append(trash)
}

async function addElementAndSendToApi({ name, url }){

    addElement({ name, url })

    const respostas = await fetch(`http://localhost:3000/?name=${name}&url=${url}`)

    if (!respostas.ok)
        console.error('Erro ao enviar a API')
}

async function removeElement(element, { name, url }) {
    if (confirm('Já decorou o link?'))
        element.parentNode.remove()
        
        const respostas = await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`)
        if(!respostas.ok){
            console.log(error)
        }
    }


form.addEventListener('submit', (event) => {

    event.preventDefault();

    let { value } = input

    if (!value)
        return alert('Preencha o campo!')

    const [name, url] = value.split(',')

    if (!url)
        return alert('O texto não está formatado da maneira correta.')

    if (!/^http/.test(url))
        return alert('Digite a url da maneira correta.')


    addElementAndSendToApi({ name, url })
    input.value = ''

})