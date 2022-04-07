import classes from 'classnames';
import styles from './ChatContentEmpty.module.scss';

const ChatContentEmpty = () => {


    return (
        <div className={classes(styles.content)}>
            <div className={classes(styles.content__text, "text", "text--large", "font__weight__primary--semi-bold")}>Nie wybrałeś żadnego pokoju</div>

        </div>
    )
}

export default ChatContentEmpty;