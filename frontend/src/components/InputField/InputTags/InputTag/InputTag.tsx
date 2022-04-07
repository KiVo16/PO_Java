import React from 'react';
import styles from './InputTag.module.scss';
import classes from 'classnames';
import { motion, Variants } from 'framer-motion';

const variants: Variants = {
    hide: {
        opacity: 0
    },
    show: {
        opacity: 1
    }
}

type InputTagProps = {
    tag: string
}

const InputTag = ({ tag }: InputTagProps) => {
    return (
        <motion.div
            className={classes(
                //"text", "text--medium", "font__wieght__primary--regular",  
                styles.tag)}
            initial="hide"
            animate="show"
            exit="hide"
        >
            {tag}
        </motion.div>
    )
}

export default InputTag;