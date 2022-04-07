import styles from './NameView.module.scss';
import classes from 'classnames';
import NameCircle from '../NameCircle/NameCircle';

type NameViewProps = {
    name: string
}

const NameView = ({ name }: NameViewProps) => {

    return (
        <div className={classes(styles.view, "font--primary", "font__weight__primary--semi-bold")}>
            <NameCircle name={name} />
            <div className={classes(styles.view__name, "text--medium")}>
                {name}
            </div>
        </div>
    )
}

export default NameView;