function getUnique(...list:any[]):any[] {
    return list.reduce((out, current) => out.indexOf(current) < 0 ? out.concat([current]) : out, []);
}

/*
 Улучшите класс с менюшкой добавив публичные методы
 getElem -возвращает елемент в котором генерится меню;
 toggle открыть/закрыть элемент меню по метке;
 close закрыть элемент меню по метке;
 open открыть элемент меню по метке
 */

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

    public getElem():HTMLElement {
        return this.element;
    }

    public getElementsByLabel(label):HTMLElement[] {
        return [].slice.apply(this.element.querySelectorAll('.title'))
            .filter((item:HTMLElement) => item.innerHTML === label)
            .map((item:HTMLElement) => item.parentNode);
    }

    public open(label:string):void {
        const els:HTMLElement[] = this.getElementsByLabel(label);
        els.forEach((el:HTMLElement) => el.classList.add('menu-open'));
    }

    public close(label:string):void {
        const els:HTMLElement[] = this.getElementsByLabel(label);
        els.forEach((el:HTMLElement) => el.classList.remove('menu-open'));
    }

    public toggle(label:string):void {
        const els:HTMLElement[] = this.getElementsByLabel(label);
        els.forEach((el:HTMLElement) => el.classList.toggle('menu-open'));
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


// Fill test controls
let listOfItemsTitles:string[] = [];
function grabTitles(menuList:typeof menu):void {
    menuList.forEach((el) => {
        listOfItemsTitles.push(el.title);
        if (Array.isArray(el.items)) {
            grabTitles(el.items);
        }
    });
    listOfItemsTitles = getUnique(...listOfItemsTitles);
}
grabTitles(menu);

const listOfMenuItems:HTMLInputElement = document.querySelector('#listOfMenuItems') as HTMLInputElement;
const labelForMenuItem:HTMLInputElement = document.querySelector('#labelForMenuItem') as HTMLInputElement;
listOfMenuItems.innerHTML = `<option></option>` + listOfItemsTitles.sort().map((item) => `<option>${item}</option>`).join('');
listOfMenuItems.addEventListener('change', (ev:any) => labelForMenuItem.value = ev.target.value);
document.body.addEventListener('click', (ev:any) => {
    const target:HTMLInputElement = ev.target as HTMLInputElement;
    if (!target.matches('button[id][data-role=menu-control]')) {
        return;
    }
    const methodName:string = target.getAttribute('id');
    const label:string = labelForMenuItem.value;
    menu1[methodName](label);
});
