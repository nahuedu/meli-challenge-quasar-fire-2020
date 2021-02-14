class AllianceFleet {

    private kenobi: Satellite;
    private skywalker: Satellite;
    private sato: Satellite;

    constructor(kenobi: Satellite, skywalker: Satellite, sato: Satellite) {
        this.kenobi = kenobi;
        this.skywalker = skywalker;
        this.sato = sato;
    }

    decodeEnemyMsg() {
        let decodedMsg: string[] = [];
        let satellites = [this.kenobi, this.skywalker, this.sato]

        //saco mensajes erroneos del principio para corregir desfasaje
        let originalMsgLength = satellites.map(m => m.getMsgLength()).reduce((a,b) => Math.min(a,b));
        satellites.forEach(s => s.fixMsgDelay(originalMsgLength));

        for (let i = 0; i < originalMsgLength; i++) {
            var word = this.kenobi.getWordAt(i);
            
            if(this.isValidWord(word))
                decodedMsg.push(word)
            else {
                decodedMsg.push(this.searchMissingWord([this.skywalker, this.sato],i))
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
        let intKenSky = this.kenobi.insersectionWith(this.skywalker);
        let intKenSato = this.kenobi.insersectionWith(this.sato);
        let intSkySato = this.skywalker.insersectionWith(this.sato);
    
        let enemyCoord: [number, number] | never[] = [];
    
        intKenSky.forEach(int => {
            const isInKenSato = intKenSato.filter(i => this.areEqual(i, int)).length > 0
            const isInSkySato = intSkySato.filter(i => this.areEqual(i, int)).length > 0
    
            if(isInKenSato && isInSkySato)
                enemyCoord = int;
        })
        
        return enemyCoord;
    }

    private areEqual(pointA: [number, number], pointB: [number, number]): boolean {
        return pointA[0] === pointB[0] && pointA[1] === pointB[1];
    }
}