import classes from 'classnames';
import React, { ChangeEvent, CSSProperties, FocusEvent, FormEvent, InputHTMLAttributes, PropsWithChildren, useCallback } from 'react';
import { DefaultInputDropDownItemType, InputDispatchType, InputDropDownItemType, inputSetError, onInputSingleChange } from '../../reducers/InputFieldReducer';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import { validateInput, Validator } from '../../utils/validators';
import styles from './InputField.module.scss';
import InputTags, { InputTagType } from './InputTags/InputTags';

type IconType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>

type RightIconType = IconType | "arrow";

type MainProps<T extends InputDropDownItemType> = {
    dispatch: InputDispatchType<T>
    values?: T[]
    valuesTagProperty?: keyof T
    error?: string
    beforeInputChildren?: any
    afterInputChildren?: any
    rightIcon?: RightIconType
    wrapperClassName?: string
    inputClassName?: string
    wrapperInputClassName?: string
    inputStyle?: CSSProperties
    validators?: Validator[]
    hideLabel?: boolean
    tagsClassName?: string
    onInputClick?: () => void
    onWrapperClick?: () => void
    extraOnValueChange?: (val: string) => void
}

export type InputFieldProps<T extends InputDropDownItemType> = PropsWithCustomBase<
    PropsWithChildren<
        MainProps<T>
    >
> & InputHTMLAttributes<HTMLInputElement>



const InputField = <Z extends any, T extends InputDropDownItemType = DefaultInputDropDownItemType<Z>>(props: InputFieldProps<T>) => {


    const { dispatch, onInputClick, onWrapperClick, wrapperClassName, tagsClassName, extraOnValueChange, values, valuesTagProperty, error, hideLabel, beforeInputChildren, afterInputChildren, validators, rightIcon, inputClassName, wrapperInputClassName, inputStyle, className, style, children, ...inputProps } = props;
    const { value, multiple, onBlur } = inputProps;

    // const [errorState, setErrorState] = useState<string>();

    const tags = multiple === true
        ? <InputTags className={classes(tagsClassName)} tags={values ? values.reduce<InputTagType[]>((arr, v) => [...arr, { id: v.id, tag: valuesTagProperty ? String(v[valuesTagProperty]) : v.content }], []) : []} />
        : undefined;

    const onValueChange = (val: ChangeEvent<HTMLInputElement>) => {
        extraOnValueChange?.(val.target.value);
        onInputSingleChange(val.target.value, dispatch);
    }

    const onInputBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (validators) inputSetError(validateInput(validators, value ? value?.toString() : ""), dispatch);;

        onBlur?.(e);
    }, [value, validators?.length])

    const onInputInvalidCapture = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        alert("test");
    }

    return (
        <div className={classes(styles.wrapper, className)}>
            <div
                style={style}
                className={classes(styles.wrapper__main, wrapperClassName)}
                onClick={onWrapperClick}
            >
                {beforeInputChildren}
                {tags}
                <div className={classes(styles.wrapper__main__input, wrapperInputClassName)}>
                    <input
                        {...inputProps}
                        value={value}
                        onChange={onValueChange}
                        className={classes(
                            //...DefaultTextClasses,
                            styles.input,
                            inputClassName,
                            {
                                [styles.hidden_label]: hideLabel
                            }
                        )}
                        onBlur={onInputBlur}
                        style={inputStyle}
                        onClick={onInputClick}
                        onInvalidCapture={onInputInvalidCapture}
                        onSubmit={() => alert("test")}
                    />
                    {
                        !hideLabel &&
                        <label
                            className={classes(
                                // ...DefaultTextLabelClasses,
                                styles.label
                            )}
                        >{props.placeholder}</label>
                    }
                </div>
                {afterInputChildren}
            </div>
            {
                error &&
                <div className={classes(
                    //...DefaultErrorClasses, 
                    styles.wrapper__error)}>
                    {error}
                </div>
            }
            {children}
        </div>
    )
}

export default InputField;