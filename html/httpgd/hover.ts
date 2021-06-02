/* eslint-disable @typescript-eslint/no-unsafe-assignment */

interface Style {
    col: string;
    label: string;
}
type Styles = Style[];


function makeHover(svg: SVGElement): void {
    const textElements = Array.from(svg.querySelectorAll('text'));
    let json: unknown = null;
    for(const el of textElements){
        if(/^\[.*\]$/.exec(el.innerHTML)){
            try {
                json = JSON.parse(el.innerHTML);
            } catch (e) {
                // ignore
            }
            if(json){
                break;
            }
        }
    }
    console.log(json);
    postLogMessage(json);
    
    const styles = json as Styles;

    
    const styledElements = svg.querySelectorAll('[style]');
    
    postLogMessage('test');
    postLogMessage(styledElements.length);
    
    styledElements.forEach(el => {
        const rgb = (el as SVGElement).style.stroke;
        const hex = rgbStringToHex(rgb);
        if(rgb){
            postLogMessage(`${rgb} -> ${hex}`);
        }
        const m = styles.find(s => s.col === hex);
        if(m){
            postLogMessage(m.label);
            // el.innerHTML = `<title>${m.label}<\title>`;
            el.innerHTML =`<title>${m.label}</title>`;
            el.classList.add('hasHover');
            postLogMessage(el.innerHTML);
        }
    });
}


function rgbStringToHex(rgb: string): string {
    rgb = rgb.replace(/\s/g, '');
    const re = /rgb\((\d+),(\d+),(\d+)\)/;
    const m = re.exec(rgb);
    if(!m){
        return '#000000';
    }
    const [r, g, b] = m.slice(1,4).map(Number);
    return rgbToHex(r, g, b);
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
