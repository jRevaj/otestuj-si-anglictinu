export const getSentence = text => {
    return text.split(' ').map((w, id) => {
        if (w.startsWith('<')) {
            const m = w.match(/[a-z-A-Z]+/);
            return { id, text: m[0], type: 'answer'};
        }
        return { id, text: w, type: 'word'}
    })
}

export const getWords = text => {
    const wordList = Array.from( new Set(text.split(' ')));
    return wordList.reduce((acc, cur) => {
        if (cur.startsWith('<')) {
            const m = cur.match(/[a-z-A-Z]+/);
            return acc.concat(m[0]);
        }
        return acc;
    }, [])
}