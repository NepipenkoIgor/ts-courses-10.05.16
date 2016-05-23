/**
 * Created by constantant on 18.05.2016.
 */


interface Coords {
    left: number;
}

interface Component {
    render(parent?: HTMLElement): void;
}

class Slider implements Component {
    private elementSlider: HTMLElement;
    private elementRunner: HTMLElement;
    private shiftX: number;
    private sliderCoords: Coords;

    public render(parent?: HTMLElement): void {
        let parentElement: HTMLElement = parent || document.body;

        this.elementSlider = document.createElement('div');
        this.elementSlider.classList.add('slider');

        this.elementRunner = document.createElement('div');
        this.elementRunner.classList.add('slider-runner');


        this.elementSlider.appendChild(this.elementRunner);
        parentElement.appendChild(this.elementSlider);

        this.elementRunner.addEventListener('mousedown', this.captureRunner);
        this.elementRunner.addEventListener('dragstart', function (event: MouseEvent) {
            event.preventDefault();
            event.stopPropagation();
        });
    }

    static getCoords(element: HTMLElement): Coords {
        let box: ClientRect = element.getBoundingClientRect();
        return {
            left: box.left + pageXOffset
        };
    }

    private moveRunner = (event: MouseEvent): void => {
        //  вычесть координату родителя, т.к. position: relative
        let newLeft: number = event.pageX - this.shiftX - this.sliderCoords.left,
            rightEdge: number = this.elementSlider.offsetWidth - this.elementRunner.offsetWidth;

        // курсор ушёл вне слайдера
        if (newLeft < 0) {
            newLeft = 0;
        }

        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        this.elementRunner.style.left = <string>(newLeft + 'px');
    };

    private captureRunner = (event: MouseEvent): void => {
        let runnerCoords = Slider.getCoords(this.elementRunner);

        this.shiftX = event.pageX - runnerCoords.left;
        this.sliderCoords = Slider.getCoords(this.elementSlider);

        event.preventDefault();
        event.stopPropagation();

        document.addEventListener('mousemove', this.moveRunner);
        document.addEventListener('mouseup', this.removeListeners);
    };

    private removeListeners = (): void => {
        document.removeEventListener('mousemove', this.moveRunner);
        document.removeEventListener('mouseup', this.removeListeners);
    }
}

let slider = new Slider();
let slider1 = new Slider();
slider.render();
slider1.render();