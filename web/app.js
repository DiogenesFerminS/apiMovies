const list = document.querySelector('#list');


const getMovies = async()=>{
    const data = await fetch('http://localhost:3000/movies');
    const result = await data.json();

    result.forEach( m => {
        const {title, poster, id} = m;
        const card = document.createElement('div');
        card.classList.add('w-80', 'mx-auto', 'p-3', 'm-4', 'rounded-lg', 'flex', 'flex-col')

        const titleCard = document.createElement('span');
        titleCard.classList.add('text-white', 'font-bold', 'text-xl', 'text-center', 'block');
        titleCard.textContent = title;

        const img = document.createElement('img');
        img.classList.add('object-cover', 'h-[80%]', 'mt-2', 'mx-auto');
        img.src = poster;
        img.alt = title;

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete Movie'
        btnDelete.classList.add('py-1', 'px-3', 'bg-red-300', 'mx-auto', 'mt-3', 'rounded-lg', 'uppercase', 'hover:bg-red-500', 'transition-all', 'font-bold');
        btnDelete.addEventListener('click', async()=>{
           const res = await fetch(`http://localhost:3000/movies/${id}`,{
            method: 'DELETE'
           });

           if(res.ok){
            card.remove();
           }
        })

        card.appendChild(titleCard);
        card.appendChild(img);
        card.appendChild(btnDelete);

        list.appendChild(card);
    });


}

getMovies();