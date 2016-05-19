// попробовал namespaces
namespace iiskhakov.HTML {
    export class PositionUtils {
        static getCoords(elem:HTMLElement) : {top : number, left: number} { // кроме IE8-
            let box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };

        }
    }
}

import posUtils = iiskhakov.HTML.PositionUtils;

type sliderOptions = { sliderElement : HTMLElement}

class Slider{

    private sliderElement : HTMLElement;
    private tumbElement : HTMLElement;


    constructor(options : sliderOptions){
        let { sliderElement } = options;
        this.sliderElement = sliderElement;

        this.renderSlider();

        this.tumbElement.ondragstart = () => false;

        this.tumbElement.onmousedown = (e) => this.startDrag(e);
    }

    private  renderSlider(){
        this.sliderElement.innerHTML = '<div class="thumb"></div>';
        this.sliderElement.classList.add('slider');
        this.tumbElement = <HTMLElement>this.sliderElement.children[0];

    }

    private startDrag(e : MouseEvent) : boolean {
        let thumbCoords = posUtils.getCoords(this.tumbElement);
        let shiftX = e.pageX - thumbCoords.left;
        // shiftY здесь не нужен, слайдер двигается только по горизонтали

        let sliderCoords = posUtils.getCoords(this.sliderElement);

        document.onmousemove = (e) => this.mouseMove(e, sliderCoords, {shiftX : shiftX});

        document.onmouseup = () => this.stopDrag();

        return false; // disable selection start (cursor change)
    }
    
    private stopDrag(){
        document.onmousemove = document.onmouseup = null;
    }
    
    private mouseMove(e: MouseEvent, sliderCoords : {left : number}, shift : {shiftX : number} ){
        //  вычесть координату родителя, т.к. position: relative
        var newLeft = e.pageX - shift.shiftX - sliderCoords.left;

        // курсор ушёл вне слайдера
        if (newLeft < 0) {
            newLeft = 0;
        }
        var rightEdge = this.sliderElement.offsetWidth - this.tumbElement.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        this.tumbElement.style.left = newLeft + 'px';
    }
}