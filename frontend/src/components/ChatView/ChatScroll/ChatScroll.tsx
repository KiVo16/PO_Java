import { PropsWithCustomBase } from '../../../utils/sharedTypes';
import styles from './ChatScroll.module.scss';
import classes from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../..';
import ChatMessage from './ChatMessage/ChatMessage';
import { useEffect, useRef, useState } from 'react';

type ChatScrollProps = PropsWithCustomBase<{}>;

const ChatScroll = ({ style, className }: ChatScrollProps) => {

    const messages = useSelector((state: RootState) => state.global.messages.filter(i => i.topicID === state.global.selectedTopicId)).
        sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
    const members = useSelector((state: RootState) => state.global.members.filter(i => i.topicID === state.global.selectedTopicId));
    const currentUserLogin = useSelector((state: RootState) => state.global.login);

    const mainDiv = useRef<HTMLDivElement>(null);
    const [bottomScorlled, setBottomScrolled] = useState(false); 

    useEffect(() => {
        if (messages.length === 0 || !mainDiv.current || bottomScorlled) return;
        mainDiv.current.scrollTop = mainDiv.current.scrollHeight;
        setBottomScrolled(true);
    }, [messages.length])

    return (
        <div style={styles} className={classes(styles.scroll, className)}>
            {
                messages.map(m => {
                    const memberName = members.find(i => i.id === m.memberID);
                    const reverse = memberName ? memberName.name === currentUserLogin : false;

                    return <ChatMessage
                        name={memberName ? memberName.name : ""}
                        message={m.content}
                        reverse={reverse}
                    />
                })
            }
        </div>
    )
}

export default ChatScroll;