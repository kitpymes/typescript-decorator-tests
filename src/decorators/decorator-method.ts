export { tryCatch, timer, upper, lower, cache, onlyRead, logger, requiredAll, requiredAllString, requiredAllNumber };

/*************************************************************************************
* @name tryCatch
* @description Cachea si ocurre una excepción en el método decorado.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {TypedPropertyDescriptor<TFunction>)} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
const tryCatch = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    return <any>{
        value: (...args: any[]) => {
            try {
                descriptor.value.apply(this, args);
            } catch (error) {
                console.error(error);
            }
        }
    };
};

/*************************************************************************************
* @name timer
* @description Cálcula el tiempo que tarda una tarea.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {TypedPropertyDescriptor<TFunction>)} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
const timer = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    return <any>{
        value: (...args: any[]) => {
            const dateFormat = new Intl.DateTimeFormat(this, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            }).format(Date.now());

            let start = window.performance.now();
            descriptor.value.apply(this, args);
            let end = window.performance.now();
            let time = end - start;
            console.log(`Date: ${dateFormat}\nTask: ${propertyKey}(${args})\n Timer: ${time} milliseconds.`);
        }
    };
};

/*************************************************************************************
* @name upper
* @description Transforma los parámetros en mayúsculas.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {TypedPropertyDescriptor<TFunction>)} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
const upper = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    return <any>{
        value: (...args: any[]) => {
            const values = args.map((arg) => arg.toUpperCase());
            descriptor.value.apply(this, values);
        }
    };
};

/*************************************************************************************
* @name lower
* @description Transforma los parámetros en minúscula.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {TypedPropertyDescriptor<TFunction>)} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
const lower = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    return <any>{
        value: (...args: any[]) => {
            const values = args.map((arg) => arg.toLowerCase());
            descriptor.value.apply(this, values);
        }
    };
};

/*************************************************************************************
* @name cache
* @description El resultado del método decorado se guarda en memoria para luego obtenerlo del cache.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {PropertyDescriptor} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
var cacheList: any = {};
const cache = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    const fn = descriptor.value;

    descriptor.value = (...args: any[]) => {

        const cached = cacheList[fn];

        if (cached) {
            console.info(`Get cache: ${propertyKey}()`);
            return cached;
        }

        const value = fn();
        cacheList[fn] = value;

        console.info(`Save cache: ${propertyKey}()`);
        return value;
    }

    return descriptor;
}

/*************************************************************************************
* @name onlyRead
* @description El método es de solo lectura no puede ser editado o asignado.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {TypedPropertyDescriptor<TFunction>)} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {TypedPropertyDescriptor<TFunction>} Un descriptor para ser usado para la asignación de propiedades.
*/
const onlyRead = <TFunction extends Function>(
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<TFunction>): TypedPropertyDescriptor<TFunction> => {

    const fn = descriptor.value;
    descriptor.writable = false;
    return descriptor;
}

/*************************************************************************************
* @name logger
* @description Loguea en consola el nombre del método, sus párametros y el resultado.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {PropertyDescriptor} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
const logger = (messageStart?: string, messageEnd?: string) => <TFunction extends Function>(
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    const fn = descriptor.value;

    descriptor.value = (...args: any[]) => {

        if (messageStart) console.log(messageStart);

        // convert list of foo arguments to string
        var a = args.map(a => JSON.stringify(a)).join();

        // invoke foo() and get its return value
        var result = fn.apply(this, args);

        // convert result to string
        var r = JSON.stringify(result);

        // display in console the function call details
        console.log(`Call: ${propertyKey}(${a}) => ${r}`);

        if (messageEnd) console.log(messageEnd);

        // return the result of invoking foo
        return result;
    }

    return descriptor;
};


/*************************************************************************************
* @name requiredAll
* @description Lanza una excepción si algun argumento es "", null, undefined.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {PropertyDescriptor} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
const requiredAll = <TFunction extends Function>(
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    const fn = descriptor.value;

    descriptor.value = (...args: any[]) => {
        if (args.length !== fn.length ||
            args.filter(arg =>
                arg === undefined ||
                arg === "undefined" ||
                arg === null ||
                arg === "").length > 0
        ) {
            throw new Error("Arguments required or invalid.");
        }

        var result = fn.apply(this, args);
        return result;
    };

    return descriptor;
}

/*************************************************************************************
* @name requiredAllString
* @description Lanza una excepción si algun argumento es "", null, undefined o no es un string.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {PropertyDescriptor} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
const requiredAllString = <TFunction extends Function>(
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    const fn = descriptor.value;

    descriptor.value = (...args: any[]) => {

        if (args.length !== fn.length ||
            args.filter(arg =>
                arg === undefined ||
                arg === "undefined" ||
                arg === null ||
                arg === "" ||
                typeof arg !== "string").length > 0
        ) {
            throw new Error("Arguments required or invalid.");
        }

        var result = fn.apply(this, args);
        return result;
    };

    return descriptor;
}

/*************************************************************************************
* @name requiredAllNumber
* @description Lanza una excepción si algun argumento es "", null, undefined o no es un número.
* @param target {Object} El método decorado.
* @param propertyKey {string} El nombre del método decorado.
* @param descriptor {PropertyDescriptor} Las propiedades del descripctor @see Object.getOwnPropertyDescriptor()
* @return {PropertyDescriptor} Un descriptor para ser usado para la asignación de propiedades.
*/
const requiredAllNumber = <TFunction extends Function>(
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor): PropertyDescriptor => {

    const fn = descriptor.value;

    descriptor.value = (...args: any[]) => {

        if (args.length !== fn.length ||
            args.filter(arg =>
                arg === undefined ||
                arg === "undefined" ||
                arg === null ||
                arg === "" ||
                typeof arg !== "number").length > 0
        ) {
            throw new Error("Arguments required or invalid.");
        }

        var result = fn.apply(this, args);
        return result;
    };

    return descriptor;
}