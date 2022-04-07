import classes from 'classnames';
import { PropsWithCustomBase } from '../../../../utils/sharedTypes';
import NameCircle from '../../../NameCircle/NameCircle';
import styles from './ChatMessage.module.scss';

type ChatMessageProps = PropsWithCustomBase<{
    message: string
    name: string
    reverse: boolean
}>;

const ChatMessage = ({ style, className, message, name, reverse }: ChatMessageProps) => {
    return (
        <div style={styles} className={classes(styles.message,  className, {[styles.reverse]: reverse})}>
            {
                !reverse
                    ? <>
                        <NameCircle name={name} />
                        <div className={classes(styles.message__content, "text", "text--medium", "text-color--white")}>
                            {message}
                        </div>
                    </>
                    : <>
                        <div className={classes(styles.message__content, "text", "text--medium", "text-color--white")}>
                            {message}
                        </div>
                        <NameCircle name={name} />
                    </>
            }
        </div>
    )
}

export default ChatMessage;