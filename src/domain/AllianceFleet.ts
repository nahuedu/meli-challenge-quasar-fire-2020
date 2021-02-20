import { Satellite } from "./Satellite";

export class AllianceFleet {

    private satellites: Satellite[] = [];

    constructor(satellites: Satellite[]) {
        this.satellites = satellites;
    }

    decodeEnemyMsg() {
        let decodedMsg: string[] = [];

        //saco mensajes erroneos del principio para corregir desfasaje
        let originalMsgLength = this.satellites.map(m => m.getMsgLength()).reduce((a,b) => Math.min(a,b));
        this.satellites.forEach(s => s.fixMsgDelay(originalMsgLength));

        if(this.satellites.length > 0) {
            const firstSat = this.satellites[0];
            const remainingSats = this.satellites.slice(1, this.satellites.length);

            for (let i = 0; i < originalMsgLength; i++) {
                var word = firstSat.getWordAt(i);
                
                if(this.isValidWord(word))
                    decodedMsg.push(word)
                else {
                    decodedMsg.push(this.searchMissingWord(remainingSats,i))
                }
            }
        }
    
        return decodedMsg.join(' ');
    }

    isValidWord(word: string) {
        return word !== "";
    }

    searchMissingWord(satellites: Satellite[], position: number) {
        let validWord = '';
        satellites.forEach(s => {
            let word = s.getWordAt(position);
            if(this.isValidWord(word))
                validWord = word;
        })

        return validWord;
    }

    findEnemyLocation() {
        if(this.satellites.length === 1)
            throw new Error('Not enough active satellites to find enemy location')

        if(this.satellites.length === 2) {
            const fstSat = this.satellites[0];
            const sndSat = this.satellites[1];
            const int = fstSat.insersectionWith(sndSat);
            
            if(this.areSame(int[0], int[1])) {
                return int[0];    
            }

            throw new Error('Not enough active satellites to find enemy location')
        }

        const fstThreeSats = this.satellites.slice(0, 3);
        const kenobi = fstThreeSats[0]; //sat name may not be kenobi but doesn't matter
        const skywalker = fstThreeSats[1];
        const sato = fstThreeSats[2];

        let intKenSky = kenobi.insersectionWith(skywalker);
        let intKenSato = kenobi.insersectionWith(sato);
        let intSkySato = skywalker.insersectionWith(sato);
    
        let enemyCoord: [number, number] | never[] = [];
    
        intKenSky.forEach(int => {
            const isInKenSato = intKenSato.filter(i => this.areEqual(i, int)).length > 0
            const isInSkySato = intSkySato.filter(i => this.areEqual(i, int)).length > 0
    
            if(isInKenSato && isInSkySato)
                enemyCoord = int;
        })
        
        return enemyCoord;
    }

    private areSame(pointA: [number, number], pointB: [number, number]): boolean {
        return pointA[0] === pointB[0] && pointA[1] === pointB[1];
    }

    private areEqual(pointA: [number, number], pointB: [number, number]): boolean {
        return this.compareWithError(pointA[0], pointB[0]) && this.compareWithError(pointA[1], pointB[1]);
    }

    private compareWithError(numA: number, numB: number) {
        return Math.abs(Math.abs(numA) - Math.abs(numB)) <= 0.04
    }
}