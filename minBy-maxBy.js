//USAGE, get order with the highest price from all orders
//order = maxBy(orders, o => o.price);

function maxBy(arr, fn) {
    if (!arr) return undefined
    const map = arr.map(typeof fn === 'function' ? fn : val => val[fn])
    return arr[map.indexOf(Math.max(...map))]
}

function minBy(arr, fn) {
    if (!arr) return undefined
    const map = arr.map(typeof fn === 'function' ? fn : val => val[fn])
    return arr[map.indexOf(Math.min(...map))]
}