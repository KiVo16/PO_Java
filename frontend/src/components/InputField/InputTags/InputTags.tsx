import React from 'react';
import styles from './InputTags.module.scss';
import classes from 'classnames';
import InputTag from "./InputTag/InputTag";
import { PropsWithCustomBase } from '../../../utils/sharedTypes';


export type InputTagType = {
    id: string
    tag: string
}

type InputTagsProps = PropsWithCustomBase<{
    tags: InputTagType[]
}>

const InputTags = ({tags, className}: InputTagsProps) => {
    return (
        <div className={classes(styles.tags, className)}>  
            {
                tags.map(tag => <InputTag key={tag.id} tag={tag.tag} />)
            }
        </div>
    )
}

export default InputTags;