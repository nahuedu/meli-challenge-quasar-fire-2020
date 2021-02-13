
function GetMessage(messages: string[][]): string {

    let decodedMsg = '';

    //saco mensajes erroneos del principio para corregir desfasaje
    let originalMsgLength = messages.map(m => m.length).reduce((a,b) => Math.min(a,b));
    let shortMessages = messages.map(m => m.slice(m.length-originalMsgLength, m.length));

    let firstSatelliteMsg = shortMessages[0];
    
    for (let i = 0; i < firstSatelliteMsg.length; i++) {
        const msg = firstSatelliteMsg[i];
        
        if(msg !== "")
            decodedMsg += ` ${msg}`;
        else {
            decodedMsg += ` ${SearchMissingMsg(shortMessages, i)}`;
        }
    }

    return decodedMsg;
}

function SearchMissingMsg(messages: string[][], position: number) {
    messages.forEach(msg => {
        if(msg[position] !== "")
            return msg[position];
    })
    return '';
}

console.log(GetMessage([
    ['', 'este', 'es', 'un', 'mensaje'],
    ['este', '', 'un', 'mensaje'],
    ['', '', 'es', '', 'mensaje']
]))