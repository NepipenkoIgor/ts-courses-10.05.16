/**
 * Created by igor on 1/6/16.
 */

type menuList = { title:string, items?:menuList }[];

let menuList:menuList = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {title: 'Коровы'},
                    {title: 'Ослы'},
                    {title: 'Собаки'},
                    {title: 'Тигры'}
                ]
            },
            {
                title: 'Другие',
                items: [
                    {title: 'Змеи'},
                    {title: 'Птицы'},
                    {title: 'Ящерицы'}
                ]
            }
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    {title: 'Гуппи'},
                    {title: 'Скалярии'}
                ]
            },
            {
                title: 'Форель',
                items: [
                    {title: 'Морская форель'}
                ]
            }
        ]
    }
];

function generateMenu(items:menuList):string {
    let html:string = '';
    if (items && !Array.isArray(items)) {
        throw new TypeError('variable "items" must be like an Array');
    }

    /**
     *  используйте === или  !items.length/
     * 
     */
    
    if (!items || items.length == 0) {
        return html;
    }

    html += `<ul>`;
    for (let item of items) {

        let title:string = item.title,
            items:menuList = item.items,
            hasItems:boolean = !!(items && items.length);

        html += `<li>
            <a class="title${hasItems ? '' : '-leaf'}">${title}</a>
            ${generateMenu(items)}
        </li>`;

    }
    html += `</ul>`;
    return html;
}


let navMenuList:HTMLElement = document.querySelector('.menu') as HTMLElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (e:MouseEvent) => {
    let el = e.target as HTMLElement;
    let classList = el.classList;
    if (classList.contains(`title`)) {
        let parentLi = el.parentNode as HTMLElement;
        parentLi.classList.toggle('menu-open');
    }
};