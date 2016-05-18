/* tslint:disable */
var menu:{ title:string, link?:string, items?:typeof menu}[];
/* tslint:enable */

type munuOpt = {element:HTMLElement,menuList:typeof menu};

class Menu {
    private element:HTMLElement;
    private menuList:typeof menu;

    constructor(opt:munuOpt) {
        let {element, menuList} = opt;
        this.element = element;
        this.menuList = menuList;
        this.element.innerHTML = this.generateMenuHtml(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }

    private clickHandler(e:MouseEvent):void {
        let el = <HTMLElement>e.target;
        let classList = el.classList;
        if (classList.contains('title')) {
            let parentLi = <HTMLElement>el.parentNode;
            parentLi.classList.toggle('menu-open');
        }
    }

    private generateMenuHtml(menuList:typeof menu):string {
        let z:string = `<ul>`;
        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title' : ''} ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += this.generateMenuHtml(a.items) + `</li>`;
        }
        return z += `</ul>`;
    }
}


menu = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
        ],
        },
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]
        },
        {
            title: 'Форель', items: [
            {title: 'Морская форель'}
        ]
        },
    ]
    }
];

let element = <HTMLElement>document.querySelector('.menu');


let menu1 = new Menu({element: element, menuList: menu});
