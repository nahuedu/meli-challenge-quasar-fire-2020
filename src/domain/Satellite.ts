export class Satellite {

    static GlobalCoordinates: { [key:string]: [number, number]} = {
        'kenobi': [0,1],//[-500, -200],
        'skywalker': [2,0],//[100, -100],
        'sato': [2,2]//[500, 100]
    }

    private name: string;
    private distance: number;
    private message: string[];
    private coordinates: [number, number];

    constructor(name: string, distance: number, message: string[]) {
        this.name = name;
        this.distance = distance;
        this.message = message;
        this.coordinates = Satellite.GlobalCoordinates[this.name];
    }

    getMsgLength(): number {
        return this.message.length;
    }

    fixMsgDelay(realLength: number) {
        this.message = this.message.slice(this.message.length-realLength, this.message.length);        
    }

    getWordAt(position: number) {
        return this.message[position];
    }

    insersectionWith(satellite: Satellite) {
        return this.getRadiusIntersection(this.coordinates, this.distance, satellite.coordinates, satellite.distance);
    }

    private getRadiusIntersection(p0: [number,  number], r0: number, p1: [number,  number], r1: number): [number,number][] {
        let x0 = p0[0];
        let y0 = p0[1];
        let x1 = p1[0];
        let y1 = p1[1];
    
        /* dx and dy are the vertical and horizontal distances between
         * the circle centers.
         */
        let dx = x1 - x0;
        let dy = y1 - y0;
    
        /* Determine the straight-line distance between the centers. */
        let d = Math.hypot(dx, dy);
    
        /* Check for solvability. */
        if (d > (r0 + r1)) {
            /* no solution. circles do not intersect. */
            throw new Error('Error: cannot find location with given data')
        }
        if (d < Math.abs(r0 - r1)) {
            /* no solution. one circle is contained in the other */
            throw new Error('Error: cannot find location with given data')
        }
        if(d == 0 && r0 == r1) {
            /* the circles are coincident and there are an infinite number of solutions */
            throw new Error('Error: cannot find location with given data')
        }
    
        /* 'point 2' is the point where the line through the circle
         * intersection points crosses the line between the circle
         * centers.  
         */
    
        /* Determine the distance from point 0 to point 2. */
        let a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;
    
        /* Determine the coordinates of point 2. */
        let x2 = x0 + (dx * a/d);
        let y2 = y0 + (dy * a/d);
    
        /* Determine the distance from point 2 to either of the
         * intersection points.
         */
        let h = Math.sqrt((r0*r0) - (a*a));
    
        /* Now determine the offsets of the intersection points from
         * point 2.
         */
        let rx = -dy * (h/d);
        let ry = dx * (h/d);
    
        /* Determine the absolute intersection points. */
        var xi = this.round(x2 + rx);
        var xi_prime = this.round(x2 - rx);
        var yi = this.round(y2 + ry);
        var yi_prime = this.round(y2 - ry);
    
        return [[xi, yi], [xi_prime, yi_prime]];
    }

    private round(num: number) {
        return Number(num.toFixed(2))
    }
}