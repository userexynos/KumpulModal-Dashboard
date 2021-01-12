export default function(value, withPrefix) {
    if(typeof value === 'undefined') {
        return 0
    }
    
    const num_string = value.replace(/[^,\d][A-Za-z]/g, "").toString();
    let val = num_string.substr(0, num_string.length % 3);
    const thousand = num_string.substr(num_string.length % 3).match(/\d{3}/gi);
    if(thousand) {
        const separator = num_string.length % 3 ? "." : "";
        val += separator + thousand.join('.');
    }
    
    return withPrefix ? "Rp " + val : val;
}