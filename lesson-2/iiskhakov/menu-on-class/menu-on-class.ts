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
        this.element.addEventListener('click', this.clickHandler.bind(this));
    }

    getElem() : HTMLElement {
        return this.element;
    }
    
    public toggle(title: string): void {
        let elem = this.findByTitle(title);
        if(elem){
            Menu.toggleElement(elem);
        }
    }

    public open(title: string) : void {
        let elem = this.findByTitle(title);
        if(elem){
            while(elem != this.element){
                Menu.toggleElement(elem,'open');
                elem = elem.parentElement;
            }
        }
    }

    public close(title: string) :void {
        let elem = this.findByTitle(title);
        if(elem){
            Menu.toggleElement(elem, "close");
        }
    }

    public static toggleElement(menuElement: HTMLElement, operation: "open" | "close" | "toggle" = "toggle") {
        if (!menuElement) return;
        let classList = menuElement.classList;
        if (classList.contains('title') || menuElement.tagName === 'LI') {
            let parentLi = menuElement.tagName === 'LI' ? menuElement : <HTMLElement>menuElement.parentNode;
            switch (operation) {
                case "open":
                    parentLi.classList.add('menu-open');
                    break;
                case "close":
                    parentLi.classList.remove('menu-open');
                    break;
                default:
                    parentLi.classList.toggle('menu-open');
                    break;
            }
        }
    }

    private  findByTitle(title:string) : HTMLElement{
        let aList = this.element.querySelectorAll('a.title');
        for(let i = 0; i < aList.length; i++){
            if(aList[i].textContent.toLowerCase() === title.toLowerCase()){
                return <HTMLElement>aList[i];
            }
        }
    }

    private clickHandler(e:MouseEvent):void {
        Menu.toggleElement(<HTMLElement>e.target);
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

console.log(menu1.getElem());

let menuControlBtns = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('button.menu-control');
for(let i= 0; i < menuControlBtns.length; i++ ){
    menuControlBtns[i].addEventListener("click", function(event : MouseEvent){
        let target = <HTMLElement>event.target;
        if(target.dataset && target.dataset['menuAction']){
            switch (target.dataset['menuAction'].toLowerCase()){
                case 'open':
                    menu1.open(target.dataset['menuTitle']);
                    break;
                case 'close':
                    menu1.close(target.dataset['menuTitle']);
                    break;
                case 'toggle':
                    menu1.toggle(target.dataset['menuTitle']);
                    break;
                default:
                    break;
            }
        }
    });
};
