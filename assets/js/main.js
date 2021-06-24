let movieList = null;
let inputSearch = null;
let triggerMode = false;

const createStyle = () => {
    const headStyle = document.createElement('style');
    headStyle.innerHTML = `
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        background-color: rgb(23, 44, 44);
        font-family: Arial, Helvetica, sans-serif;
        color: white;
    }    
    .container {
        padding: 20px;
        max-width: 1280px;
        margin: 0 auto;        
    }
    h1 {
        letter-spacing: .1em;
        text-shadow: 3px 0 rgba(153, 153, 0, .5),
        6px 0 rgba(204, 204, 204, .4),
        9px 0 rgba(204, 204, 204, .3),
        12px 0 rgba(204, 204, 204, .2),
        15px 0 rgba(204, 204, 204, .1);
    }
    .search__checkbox {
        position: absolute;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .container .search__checkbox > input[type="checkbox"] {
        position: relative;
        opacity: 0;
        z-index: -1
    }
    .search__checkbox-icon {
        display:none
    }
    input[type="checkbox"]:checked ~ .search__label-checkbox {
        color: yellow
    }
    .search__label-checkbox:before {
        font-family: "icons";
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        margin-right: 10px;
    }
    .icon--check:before,input[type="checkbox"]:checked 
    ~ .search__label-checkbox:before {
        content:"\\e601"
    }
    .search__label-checkbox:before {content:"\\e600"}
    @font-face {
        font-family: "icons";
        font-weight: 400;
        font-style: normal;
        src: url(data:application/x-font-woff;charset=utf-8;base64,d09GRk9UVE8AAAR4AAoAAAAABDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAAPgAAAD4fZUAVE9TLzIAAAHsAAAAYAAAAGAIIvy3Y21hcAAAAkwAAABMAAAATBpVzFhnYXNwAAACmAAAAAgAAAAIAAAAEGhlYWQAAAKgAAAANgAAADYAeswzaGhlYQAAAtgAAAAkAAAAJAPiAedobXR4AAAC/AAAABgAAAAYBQAAAG1heHAAAAMUAAAABgAAAAYABlAAbmFtZQAAAxwAAAE5AAABOUQYtNZwb3N0AAAEWAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB8Dx0AAACBER0AAAAJHQAAAO8SAAcBAQgPERMWGyBpY29tb29uaWNvbW9vbnUwdTF1MjB1RTYwMHVFNjAxAAACAYkABAAGAQEEBwoNL2X8lA78lA78lA77lA6L+HQVi/yU+JSLi/iU/JSLBd83Fffsi4v77Pvsi4v37AUOi/h0FYv8lPiUi4v33zc3i/s3++yLi/fs9zeL398F9wCFFftN+05JzUdI9xr7GveR95FHzwUO+JQU+JQViwwKAAMCAAGQAAUAAAFMAWYAAABHAUwBZgAAAPUAGQCEAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA5gEB4P/g/+AB4AAgAAAAAQAAAAAAAAAAAAAAIAAAAAAAAgAAAAMAAAAUAAMAAQAAABQABAA4AAAACgAIAAIAAgABACDmAf/9//8AAAAAACDmAP/9//8AAf/jGgQAAwABAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAACkYCfgXw889QALAgAAAAAAz65FuwAAAADPrkW7AAD/4AIAAeAAAAAIAAIAAAAAAAAAAQAAAeD/4AAAAgAAAAAAAgAAAQAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAAAAFAAAAYAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKACgAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKACgAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) 
        format("woff")
    }
    .movies {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }
    .movie {
        display: flex;
        align-content: center;
        justify-content: center;
    }
    .movie__image {
        width: 100%;
        object-fit: cover;
    }    
    .search {
        margin-bottom: 30px;
    }
    .search__label-input {
        display: block;
        margin-bottom: 7px;
    }
    .search__input {
        display: block;
        width: 400px;
        padding: 10px 15px;
        border-radius: 4px;
        border: 1px solid lightgrey;
        margin-bottom: 10px;
    }
    .search__label-checkbox {
        display: block;
        font-size: 12px;
    }`;
    document.head.appendChild(headStyle);
}

const createHeader = (container) => {
    const header = document.createElement('h1');
    header.innerText = 'Приложение для поиска фильмов';
    container.appendChild(header);
}

const setAttributes = (el, attrs) => {
    for (let key in attrs) el.setAttribute(key, attrs[key]);
}

const triggerModeHandler = () => triggerMode = !triggerMode;

const createsearchBox = (container) => {
    const searchBox = document.createElement('div');
    const input = document.createElement('input');
    const labelForInput = document.createElement('label');
    const checkbox = document.createElement('label');
    const iconForCheckbox = document.createElement('input');
    const labelForCheckbox = document.createElement('span');

    searchBox.setAttribute('class','search');
    checkbox.setAttribute('class','search__checkbox');

    setAttributes(input, {
        class: 'search__input',
        id: 'search',
        type: 'text',
        placeholder: 'Начните вводить текст...'
    });

    setAttributes(labelForInput, {
        class: 'search__label-input',
        for: 'search'
    })
    labelForInput.innerText = 'Поиск фильмов';

    setAttributes(iconForCheckbox, {
        class: 'search__checkbox-icon',
        id: 'checkbox',
        type: 'checkbox'
    });
    checkbox.addEventListener('click', triggerModeHandler)

    setAttributes(labelForCheckbox, {
        class: 'search__label-checkbox',
        for: 'checkbox'
    })
    labelForCheckbox.innerText = 'Добавлять фильмы к существующему списку';

    checkbox.append(iconForCheckbox, labelForCheckbox);
    searchBox.append(labelForInput, input, checkbox);
    container.append(searchBox);
}

const createMarkup = () => {
    const container = document.createElement('div');
    const movies = document.createElement('div');

    createHeader(container);
    createsearchBox(container);

    container.classList.add('container');
    movies.classList.add('movies');

    container.appendChild(movies);
    document.body.prepend(container);

    movieList = document.querySelector('.movies');
    inputSearch = document.querySelector('#search');
}

const addMovieToList = (movie) => {
    const item = document.createElement('div');
    const img = document.createElement('img');

    img.classList.add('movie__image');
    img.src = /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
    item.classList.add('movie');

    item.appendChild(img);
    movieList.appendChild(item);
}

const clearMoviesMarkup = () => movieList && (movieList.innerHTML = '');

const delay = (() => {
    let timer = 0;

    return (cb, ms) => {
        clearTimeout(timer);
        timer = setInterval(cb, ms);
    };
})();

createStyle();
createMarkup();
