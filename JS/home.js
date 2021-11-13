const menuItems = [
    {title: 'HOME', link: 'index.html'},
    {title: 'THEORY', link: 'theory/theory.html'},
    {title: 'DATA', link: 'graphs/graphs.html'},
    {title: 'DESIGN', link: 'template/template.html'},
    
    

]

    const initialiseMenu = () => {
    const nav = document.querySelector('nav');
    const ul = document.createElement('ul');

for(let item of menuItems) {
    const li = document.createElement('li');
    const a = document.createElement('a');
        a.innerText = item.title;
        a.href = item.link;
            li.appendChild(a);

        ul.appendChild(li);
}

    nav.appendChild(ul);
};

document.addEventListener('DOMContentLoaded', () => initialiseMenu());