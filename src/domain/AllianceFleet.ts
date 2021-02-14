class AllianceFleet {

    private satellites: Satellite[];

    constructor(satellites: Satellite[]) {
        this.satellites = satellites;
    }

    decodeEnemyMsg() {
        let decodedMsg: string[] = [];

        //saco mensajes erroneos del principio para corregir desfasaje
        let originalMsgLength = this.satellites.map(m => m.getMsgLength()).reduce((a,b) => Math.min(a,b));
        this.satellites.forEach(s => s.fixMsgDelay(originalMsgLength));

        let firstSatellite = this.satellites[0];

        for (let i = 0; i < originalMsgLength; i++) {
            var word = firstSatellite.getWordAt(i);
            
            if(this.isValidWord(word))
                decodedMsg.push(word)
            else {
                decodedMsg.push(this.searchMissingWord(this.satellites.slice(1),i))
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
}