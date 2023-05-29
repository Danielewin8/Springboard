function choice(items) {
    const randomIdx = Math.floor(Math.random() * items.length);
    const item = items[randomIdx];
    return item;
}

function remove(item, items) {
    for (let i = 0; i < items.length; i++) {
        if (items[i] === item) {
            return [...items.slice(0, i), ...items.slice(i + 1)]
        }
    }
}

export {choice, remove}