
function getMessage(messages: string[][]): string {
    const ken = new Satellite('kenobi', 0, messages[0]);
    const sky = new Satellite('skywalker', 0, messages[1]);
    const sato = new Satellite('sato', 0, messages[2]);

    const fleet = new AllianceFleet([ken, sky, sato]);

    return fleet.decodeEnemyMsg();
}

const kenobi: [number, number] = [-500, 200]
const skywalker: [number, number] = [100, -100]
const sato: [number, number] = [500, 100]

function getLocation(distKen: number, distSky: number, distSato: number) {
    let intKenSky = intersection(kenobi, distKen, skywalker, distSky);
    let intKenSato = intersection(kenobi, distKen, sato, distSato);
    let intSkySato = intersection(skywalker, distSky, sato, distSato);

    let enemyCoord: [number, number] | never[] = [];

    intKenSky.forEach(int => {
        const isInKenSato = intKenSato.filter(i => areEqual(i, int)).length > 0
        const isInSkySato = intSkySato.filter(i => areEqual(i, int)).length > 0

        if(isInKenSato && isInSkySato)
            enemyCoord = int;
    })
    
    return enemyCoord;
}

function intersection(p0: [number,  number], r0: number, p1: [number,  number], r1: number): [number,number][] {
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
    var xi = round(x2 + rx);
    var xi_prime = round(x2 - rx);
    var yi = round(y2 + ry);
    var yi_prime = round(y2 - ry);

    return [[xi, yi], [xi_prime, yi_prime]];
}

function areEqual(pointA: [number, number], pointB: [number, number]): boolean {
    return pointA[0] === pointB[0] && pointA[1] === pointB[1];
}

function round(num: number) {
    return Number(num.toFixed(2))
}

console.log(getMessage([
    ['', '', '', '', ''],
    ['este', '', 'un', ''],
    ['', '', 'es', '', 'mensaje']
]));