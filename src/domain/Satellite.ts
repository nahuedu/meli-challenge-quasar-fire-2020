class Satellite {

    static GlobalCoordinates: { [key:string]: [number, number]} = {
        'kenobi': [-500, -200],
        'skywalker': [100, -100],
        'sato': [500, 100]
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

}