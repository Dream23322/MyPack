
export class IList {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.data = new Map();
        this.most_recent_key = null;
    }

    /**
     * @name get
     * @description Retrieves the data associated with the given key, or an empty array if the key does not exist.
     * If the key does not exist, it initializes a new array of the specified size filled with zeros.
     * @param {string} key 
     * @returns {Array} Data associated with the key, or an empty array if the key does not exist.
     * @example
     * const list = new IList(5);
     * list.get("key1"); // Returns an empty array if "key1" does not exist
     * list.push("value1", "key1"); // Sets "value1" for "key1"
     * list.get("key1"); // Returns ["value1", 0, 0, 0, 0] if maxSize is 5
     */
    get(key) {
        this.most_recent_key = key;
        return this.data.get(key) || new Array(this.maxSize).fill(0);
    }
    
    /**
     * @name push
     * @description
     * Sets a value for the given key, or for the most recent key used by the get method.
     * If the key does not exist, it creates a new array of the specified size and sets the value to the first position.
     * If the key does exist, it adds the value to the end of the array and removes the first element if the array exceeds the specified size.
     * @param {*} value The value to set
     * @param {string} [key] The key to associate with the value, defaults to the most recent key used by the get method
     * @example
     * const list = new IList(5);
     * list.push("value1", "key1"); // Sets "value1" for "key1"
     * list.push("value2"); // Sets "value2" for the most recent key used (which is "key1")
     * list.push("value3", "key2"); // Sets "value3" for "key2"
     * list.push("value4"); // Sets "value4" for the most recent key used (which is "key2")
     * list.push("value5", "key1"); // Sets "value5" for "key1"
     * @returns {void}
     */
    push(value, key = this.most_recent_key) {
        this.most_recent_key = key;
        if (!this.most_recent_key && !key) {
        throw new Error("Key must be provided or set before using set method.");
        }
        if (this.data.has(key)) {
        const currentData = this.data.get(key);
        currentData.push(value);
        if (currentData.length > this.maxSize) {
            currentData.shift();
        }
        this.data.set(key, currentData);
        } else {
        this.data.set(key, new Array(this.maxSize).fill(0));
        this.data.get(key).push(value);
        }
    }

    /**
     * @name removeData
     * @description Removes data associated with the given key, or all data if no key is provided
     * @param {string} [key] The key to remove data for, defaults to null
     * @example
     * const list = new IList(5);
     * list.push("value1", "key1"); // Sets "value1" for "key1"
     * list.removeData("key1"); // Removes data for "key1"
     * list.push("value2"); // Sets "value2" for the most recent key used (which is "key1")
     * list.removeData(); // Removes all data
     * @returns {boolean} Whether the key was found and removed if a key was provided, or undefined if no key was provided
     */ 
    removeData(key = null) {
        if(key) {
            return this.data.delete(key);
        }
        this.data.clear();
    }

    /**
     * @name has
     * @description Checks if the data for the given key exists, or if any data exists if no key is provided.
     * Checks if the data for the given key exists, or if any data exists if no key is provided
     * @param {string} [key] The key to check for, defaults to null
     * @example
     * const list = new iList(5);
     * list.push("value1", "key1"); // Sets "value1" for "key1"
     * list.has("key1"); // Returns true
     * list.has("key2"); // Returns false
     * list.has(); // Returns true if any data exists
     * @returns {boolean} Whether the key was found or not
     */
    has(key = this.most_recent_key) {
        if (!key && !this.most_recent_key) {
            throw new Error("Key must be provided or set before using has method.");
        }
        return this.data.has(key || this.most_recent_key);
    }

    /**
     * @name getSize
     * @description
     * Returns the size of the data associated with the given key, or 0 if no data exists for the given key
     * @param {string} [key] The key to get the size for, defaults to null
     * @returns {number} The size of the data associated with the key
     * @example
     * const list = new IList(5);
     * list.push("value1", "key1"); // Sets "value1" for "key1"
     * list.getSize("key1"); // Returns 1
     * list.push("value2", "key1"); // Adds "value2" to "key1"
     * list.getSize("key1"); // Returns 2
     */
    getSize(key = this.most_recent_key) {
        if (!key && !this.most_recent_key) {
            throw new Error("Key must be provided or set before using getSize method.");
        }
        return this.data.has(key) ? this.data.get(key).length : 0;
    }

    /**
     * @name map
     * @description
     * Returns the underlying Map object used to store the data.
     * @returns {Map<string, Array<*>>} The underlying Map object
     * @example
     * const list = new IList(5);
     * list.push("value1", "key1"); // Sets "value1" for "key1"
     * list.map(); // Returns the Map object containing the data
     */
    map() {
        return this.data;
    }

    /**
     * Raw functions (not recommended to be used often)
     */
    

    /**
     * @name rawGet
     * @description
     * Retrieves the data associated with the specified key without any default value or error handling.
     * @param {string} key - The key for which the data needs to be retrieved.
     * @returns {*} The data associated with the key, or undefined if the key does not exist.
     * @example
     * const list = new IList(5);
     * list.rawSet("key1", ["value1", "value2"]);
     * list.rawGet("key1"); // Returns ["value1", "value2"]
     * @returns {*} The data associated with the key, or undefined if the key does not exist.
     */
    rawGet(key) {
        return this.data.get(key);
    }

    /**
     * @name rawSet
     * @description
     * Sets the data for the specified key without any checks or default values.
     * @param {string} key - The key for which the data needs to be set.
     * @param {*} value - The value to set for the key.
     * @example
     * const list = new IList(5);
     * list.rawSet("key1", ["value1", "value2"]);
     * list.rawGet("key1"); // Returns ["value1", "value2"]
     * @returns {void}
     */
    rawSet(key, value) {
        this.data.set(key, value);
    }

    /**
     * @name clear
     * @description
     * Clears all data in the IsoList.
     * @example
     * const list = new IList(5);
     * list.push("value1", "key1"); // Sets "value1" for "key1"
     * list.clear(); // Clears all data in the IsoList
     * @returns {void}
     */
    clear() {
        this.data.clear();
        this.most_recent_key = null;
    }

    /**
     * @name getMostRecentKey
     * @description
     * Returns the most recent key used in the IsoList.
     * @example
     * const list = new IList(5);
     * list.push("value1", "key1"); // Sets "value1" for "key1"
     * list.getMostRecentKey(); // Returns "key1"
     * @returns {string|null} The most recent key, or null if no key has been used.
     */
    getMostRecentKey() {
        return this.most_recent_key;
    }
}