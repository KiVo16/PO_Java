import styles from './ChatContent.module.scss';
import classes from 'classnames';
import ChatMembers from '../ChatMembers/ChatMembers';
import ChatView from '../../components/ChatView/ChatView';
import { useSelector } from 'react-redux';
import { RootState } from '../..';

type ChatContentProps = {
    onSend: (content: string) => boolean
}

const ChatContent = ({onSend}: ChatContentProps) => {

    const selectedMembers = useSelector((state: RootState) => state.global.members.filter(i => i.topicID === state.global.selectedTopicId));
    const topic = useSelector((state: RootState) => state.global.topics.find(i => i.id === state.global.selectedTopicId));

    return (
        <div className={classes(styles.content)}>
            <div className={classes(styles.content__header)}>
                <div className={classes(styles.content__header__info, "text", "text--large", "font__weight__primary--semi-bold")}>{topic ? topic.name : ""} - {selectedMembers.length} członków</div>
            </div>
            <div className={classes(styles.content__chat)}>
                <ChatView onSend={onSend} />
            </div>
            <div className={classes(styles.content__members)}>
                <ChatMembers />
            </div>
        </div>
    )
}

export default ChatContent;