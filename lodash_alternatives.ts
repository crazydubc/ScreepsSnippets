/**
 * Equivalent to lodash.minBy() method
 */
export function minBy<T>(objects: T[], iteratee: ((obj: T) => number | false)): T | undefined {
	let minObj: T | undefined;
	let minVal = Infinity;
	let val: number | false;
	for (const i in objects) {
		val = iteratee(objects[i]);
		if (val !== false && val < minVal) {
			minVal = val;
			minObj = objects[i];
		}
	}
	return minObj;
}

/**
 * Equivalent to lodash.maxBy() method
 */
export function maxBy<T>(objects: T[], iteratee: ((obj: T) => number | false)): T | undefined {
	let maxObj: T | undefined;
	let maxVal = -Infinity;
	let val: number | false;
	for (const i in objects) {
		val = iteratee(objects[i]);
		if (val !== false && val > maxVal) {
			maxVal = val;
			maxObj = objects[i];
		}
	}
	return maxObj;
}

/**
 * shuffle array via durstenfeld shuffle
 * 
 */
//[2:36:15 PM]loadash pass CPU: 0.14075899999988906
//[2:36:15 PM]This function pass CPU: 0.00854200000048877
export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Gathers items from a collection and sorts them based on a comparator. Similar to _.sortBy(._flatten(_.map()))
 * @param array Array of objects to process.
 * @param mapFn Function to extract items from elements of the collection.
 * @param compareFn Function to compare two items for sorting.
 * @returns Sorted flattened array of items.
 */

//[2:32:01 PM]loadash pass CPU: 2.2990449999999782
//[2:32:01 PM]This function pass CPU: 0.7247500000003129
export function sortedFlatMap<T, U>(array: T[], mapFn: (element: T) => U[], compareFn: (a: U, b: U) => number): U[] {
    const mappedAndFlattened = array.reduce((acc, current) => {
        acc.push(...mapFn(current));
        return acc;
    }, [] as U[]);

    mappedAndFlattened.sort(compareFn);

    return mappedAndFlattened;
}

/**
 * Gathers items from a collection and sorts them based on a comparator. Similar to _.flatMap
 * @param array Array of objects to process.
 * @param mapFn Function to extract items from elements of the collection.
 * @returns falttened array of items.
 */
//[2:29:37 PM]lodash pass CPU: 0.2684030000000348
//[2:29:37 PM]This function pass CPU: 0.12171699999998964
export function flatMap<T, U>(array: T[], mapFn: (element: T) => U[]): U[] {
    const result:U[] = [];
	for (const item of array) {
		const newElement = mapFn(item);
		if (Array.isArray(newElement)) {
			result.push(...newElement)
		} else {
			result.push(newElement)
		}
	}
	return result;
}

/**
 * Gathers items from a collection and sorts them based on a comparator. Similar to _.compact(_.flatMap())
 * @param array Array of objects to process.
 * @param mapFn Function to extract items from elements of the collection.
 * @returns flattened array of items with falsey items removed
 */
//100 passes
//[2:11:47 PM]lodash pass CPU: 0.13931000000002314
//[2:11:47 PM]This function pass CPU: 0.027070999999978085
export function compactFlatMap<T, U>(array: T[], mapFn: (element: T) => U[]): U[] {
    const result:U[] = [];
	for (const item of array) {
		const newElement = mapFn(item);
		if (Array.isArray(newElement)) {
			for (const e of newElement) {
				if (e) {
					result.push(e)
				}
			}
			result.push(...newElement)
		} else if (newElement) {
			result.push(newElement)
		}
	}
	return result;
}

/**
 * Gathers items from a collection and sorts them based on a comparator. Similar to _.compact(_.map())
 * @param array Array of objects to process.
 * @param mapFn Function to extract items from elements of the collection.
 * @returns array of items with falsey items removed.
 */
//[2:27:31 PM]lodash pass CPU: 0.2530690000003233
//[2:27:31 PM]This function pass CPU: 0.07489300000088406
export function compactMap<T, U>(array: T[], mapFn: (element: T) => U[]): U[] {
    const result:U[] = [];
	for (const item of array) {
		const newElement = mapFn(item); //map each item in array
		for (const e of newElement) {
			if (e) { //push true values
				result.push(e)
			}
		}
	}
	return result;
}