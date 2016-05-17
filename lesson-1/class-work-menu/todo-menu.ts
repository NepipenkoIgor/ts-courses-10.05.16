/**
 * Created by igor on 1/6/16.
 */
type menuList = {
    title:string,
    items: {title: string, items?: menuList}[]
}[];


var menuList:menuList = [
    {
        title: 'Грибы',
        items: [
            {
                title: 'Мухоморы',
                items: [
                    {
                        title: 'Мухомороподобные',
                        items: [
                            {
                                title: '1'
                            },
                            {
                                title: '2'
                            },
                            {
                                title: '2'
                            },
                            {
                                title: '2'
                            },
                            {
                                title: '2'
                            }
                        ]
                    },
                ]
            },
            {
                title: 'Сыроежки'
            },
            {title: 'Погнаки'}
        ]
    },
    {
        title: 'Собаки',
        items: [
            {
                title: 'Лайки',
                items: [
                    {
                        title: 'Лайки в квадрате'
                    },
                    {
                        title: 'лайки ниндзя',
                        items: [
                            {
                                title: 'Лайка черепаха',
                                items: [
                                    {
                                        title: 'Тортила',
                                        items: [
                                            {
                                                title: 'Черепашка мутант'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Доги',
                items: [
                    {
                        title: 'Доги в квадртае'
                    },
                    {
                        title: 'доги лалки'
                    }
                ]
            }
        ]
    }
];



function generateMenu(list:menuList):HTMLElement {
    let ul_element = document.createElement('ul'),
        li_element,
        a_element;

    for (let item of list) {

        if(item.items) {
            li_element = document.createElement('li');
            a_element = document.createElement('a');

            a_element.classList.add('title');
            a_element.textContent = item.title;

            li_element.appendChild(a_element);
            li_element.appendChild(generateSubList(item.items));
            ul_element.appendChild(li_element);
        } else {
            li_element = document.createElement('li');

            li_element.textContent = item.title;
            ul_element.appendChild(li_element);
        }
    }


    return ul_element;
}


function generateSubList(list): HTMLElement {
    let ul_element = document.createElement('ul'),
        li_element,
        a_element;

    for(let item of list) {

        if(item.items) {

            li_element = document.createElement('li');
            a_element = document.createElement('a');

            a_element.classList.add('title');
            a_element.textContent = item.title;
            li_element.appendChild(a_element);
            li_element.appendChild(generateSubList(item.items));
            ul_element.appendChild(li_element);
        } else {
            li_element = document.createElement('li');

            li_element.textContent = item.title;
            ul_element.appendChild(li_element);
        }
    }
    return ul_element;
}




let navMenuList:HTMLElement = document.querySelector('.menu') as HTMLElement;
navMenuList.appendChild(generateMenu(menuList));
navMenuList.onclick = (e:MouseEvent) => {
    let el = e.target as HTMLElement;
    let classList = el.classList;
    if (classList.contains(`title`)) {
        let parentLi = el.parentNode as HTMLElement;
        parentLi.classList.toggle('menu-open');
    }
}