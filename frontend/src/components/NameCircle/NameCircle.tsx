import styles from './NameCircle.module.scss';
import classes from 'classnames';

type NameCircleProps = {
    name: string
}

const NameCircle = ({name}: NameCircleProps) => {
    
    const val = (name && name.length > 0) ? `${name.charAt(0)}${name.charAt(1)}`.toUpperCase() : "";
    
    return (
        <div className={classes(styles.circle, "font--primary", "font__weight__primary--semi-bold")}>
            {
                val
            }
        </div>
    )
}

export default NameCircle;