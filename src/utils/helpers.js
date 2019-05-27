const getRandomColor = (function() {
    const colors = {
        JavaScript: 'gold'
    };
    
    return function(language = '') {
        if(!language) return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        if(colors[language]) return colors[language];
        let color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        colors[language] = color;
        return color;
    }
})();

export {getRandomColor};