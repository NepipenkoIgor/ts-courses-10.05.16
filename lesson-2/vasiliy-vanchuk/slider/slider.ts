class Coord {
    top: number;
    left: number
}
function getCoords(elem:HTMLElement):Coord { // кроме IE8-
    const box:{ top:number, left: number } = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

const sliderElem:HTMLElement = document.getElementById('slider') as HTMLElement;
const thumbElem:HTMLElement = sliderElem.children[0] as HTMLElement;

thumbElem.ondragstart = () => false;
thumbElem.onmousedown =  (e:MouseEvent) => {
    const thumbCoords:Coord = getCoords(thumbElem);
    const sliderCoords:Coord = getCoords(sliderElem);
    const shiftX:number = e.pageX - thumbCoords.left;

    document.onmousemove =  (e) => {
        const rightEdge:number = Math.max(sliderElem.offsetWidth - thumbElem.offsetWidth, 0);
        let newLeft:number = Math.max(e.pageX - shiftX - sliderCoords.left, 0);

        newLeft = Math.min(newLeft, rightEdge);

        thumbElem.style.left = `${newLeft}px`;
    };

    document.onmouseup = () => document.onmousemove = document.onmouseup = null;
    return false;
};

