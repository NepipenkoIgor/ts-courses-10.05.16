/* tslint:disable */
var menu:{ title:string, link?:string, items?:typeof menu}[];
/* tslint:enable */

type menuOpt = {element:HTMLElement,menuList:typeof menu};

interface IMenu  {
    toggle (title:string):void;
    open (title:string):void;
    close (title:string):void;
    getElem ():HTMLElement;

}

class Menu implements IMenu{
    private element:HTMLElement;
    private menuList:typeof menu;


    constructor(opt:menuOpt) {
        let {element, menuList} = opt;
        this.element = element;
        this.menuList = menuList;
        this.element.innerHTML = this.generateMenuHtml(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }


    public getElem ():HTMLElement {
        return this.element;
    }

    private getFirstMenuElementByTitle (title:string):HTMLElement {
        let titles = this.element.querySelectorAll('.title');
        for (let i = 0; i < titles.length; ++i) {
           if ((<HTMLElement>titles[i]).innerHTML === title) {
               return <HTMLElement>titles[i].parentNode;
           }
        }
        return null;
    }

    public toggle (title:string):void {
        let el:HTMLElement = this.getFirstMenuElementByTitle(title);
        if (el) {
            el.classList.toggle('menu-open');
        }

    }

    public open (title:string):void {
        let el:HTMLElement = this.getFirstMenuElementByTitle(title);
        if (el) {
            el.classList.add('menu-open');
        }

    }

    public close (title:string):void {
        let el:HTMLElement = this.getFirstMenuElementByTitle(title);
        if (el) {
            el.classList.remove('menu-open');
        }

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


let mainMenu = new Menu({element: element, menuList: menu});

document.getElementById('toggle').onclick = () => {mainMenu.toggle('Животные')};
document.getElementById('open').onclick = () => {mainMenu.open('Животные')};
document.getElementById('close').onclick = () => {mainMenu.close('Животные')};