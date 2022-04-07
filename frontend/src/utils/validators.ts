import { InputDispatchType, inputSetError } from "../reducers/InputFieldReducer";

export type ValidatorFunc = (value: string, message: string) => string | undefined;
export type ValidatorSingleParamFunc<T extends any = any> = (param: T, value: string, message: string) => string | undefined;

export type Validator<T extends any = any> = { check: ValidatorFunc | ValidatorSingleParamFunc<T>, message: string, value?: T }

export type ValidatorsMap = Map<string, Validator[]>;
export const newValidatorsMap = (arr: { name: string, validators: Validator[] }[]): ValidatorsMap => {
    const m: ValidatorsMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        const { name, validators } = arr[i];
        m.set(name, validators);
    }
    return m;
}

export const getValidators = (name: string, m: ValidatorsMap): Validator[] => {
    const val = m.get(name);
    if (val) return val;
    else return [];
}

export const validateManyInputs = (m: ValidatorsMap, arr: { name: string, val: string, dispatch?: InputDispatchType }[]): boolean => {
    let error: string | undefined = undefined;

    for (let i = 0; i < arr.length; i++) {
        const { name, val, dispatch } = arr[i];
        const validators = getValidators(name, m);
        const err = validateInput(validators, val);
        if (err && dispatch) inputSetError(err, dispatch);
        if (error === undefined) error = err;
    }

    return error === undefined;
}

export class Validators {

    static PatternEmail = new RegExp(/^(\s*|(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/);
    static PatternNumber = new RegExp(/^(\s*|\d+)$/);
    static PatternPhone = new RegExp(/^(\s*|\d{9})$/);

    private static isValueNumber(value: string): boolean {
        return !isNaN(+value);
    }

    static pattern(pattern: string, value: string, message: string): string | undefined {
        if (!new RegExp(pattern).test(value)) return message;
        return undefined;
    }

    static patternRegex(pattern: RegExp, value: string, message: string): string | undefined {
        if (!pattern.test(value) || !value) return message;
        return undefined;
    }

    static minLength(lenght: number, value: string, message: string): string | undefined {
        if (value.length < lenght && value.length > 0) return message;
        return undefined;
    }

    static maxLength(lenght: number, value: string, message: string): string | undefined {
        if (value.length > lenght && value.length > 0) return message;
        return undefined;
    }

    static email(value: string, message: string): string | undefined {
        return Validators.patternRegex(Validators.PatternEmail, value, message);
    }

    static number(value: string, message: string): string | undefined {
        return Validators.patternRegex(Validators.PatternNumber, value, message);
    }

    static phone(value: string, message: string): string | undefined {
        return Validators.patternRegex(Validators.PatternPhone, value, message);
    }

    static numberGreaterThan(n: number, value: string, message: string): string | undefined {
        console.log("numberGreaterThan: ", Validators.isValueNumber(value), value, Number(value), Number(value) < n, message);
        if (!Validators.isValueNumber(value)) return message;
        if (!(Number(value) > n)) return message;
        return undefined;
    }

    static numberGreaterThanOrEqual(n: number, value: string, message: string): string | undefined {
        console.log("numberGreaterThanOrEqual: ", Validators.isValueNumber(value), value, Number(value), Number(value) < n, message);
        if (!Validators.isValueNumber(value)) return message;
        if (!(Number(value) >= n)) return message;
        return undefined;
    }

    static numberLessThan(n: number, value: string, message: string): string | undefined {
        if (!Validators.isValueNumber(value)) return message;
        if (!(Number(value) < n)) return message;
        return undefined;
    }

    static numberLessThanOrEqual(n: number, value: string, message: string): string | undefined {
        if (!Validators.isValueNumber(value)) return message;
        if (!(Number(value) <= n)) return message;
        return undefined;
    }

    static required(value: string, message: string): string | undefined {
        if (value === undefined || value.toString().trim().length === 0) return message;
        return undefined;
    }

}


export const validateInput = (validators: Validator[], value?: string): string | undefined => {
    for (let i = 0; i < validators.length; i++) {
        let error: string | undefined = undefined;
        const fValue = value !== undefined ? value : "";
        if (validators[i].value !== undefined) {
            const func = validators[i].check as ValidatorSingleParamFunc;
            error = func(validators[i].value, fValue, validators[i].message);
        } else {
            const func = validators[i].check as ValidatorFunc;
            error = func(fValue, validators[i].message);
        }
        if (error) return error;
    }
    return undefined;
}