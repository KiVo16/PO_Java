import styles from './ChatView.module.scss';
import classes from 'classnames';
import InputField from '../InputField/InputField';
import IconButton from '../IconButton/IconButton';
import { useCallback } from 'react';
import { inputChange, useInputFieldReducer } from '../../reducers/InputFieldReducer';
import { ReactComponent as SendIcon } from '../../res/send.svg';
import ChatScroll from './ChatScroll/ChatScroll';

type ChatViewProps = {
    onSend: (content: string) => boolean
}

const ChatView = ({onSend}: ChatViewProps) => {

    const [messageInput, dispatchMessageInput] = useInputFieldReducer();


    const onSendClick = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (onSend(messageInput.value)) {
            inputChange("", dispatchMessageInput);
        }
    }, [messageInput.value])



    return (
        <div className={classes(styles.view)}>

            <ChatScroll className={classes(styles.view__scroll)} />
            <form className={classes(styles.view__form)} onSubmit={onSendClick}>
                <InputField
                    dispatch={dispatchMessageInput}
                    value={messageInput.value}
                    placeholder="Wpisz swoją wiadomośc tutaj"
                    type="text"
                    className={classes(styles.view__form__input)}
                />
                <IconButton color="primary" icon={SendIcon} className={styles.view__form__button} />
            </form>
        </div>
    )
}

export default ChatView;