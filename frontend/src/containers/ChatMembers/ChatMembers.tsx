import styles from './ChatMembers.module.scss';
import classes from 'classnames';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../..';
import ChatMember from './ChatMember/ChatMember';

type ChatMembersProps = PropsWithCustomBase<{}>;

const ChatMembers = ({ style, className }: ChatMembersProps) => {

    const members = useSelector((state: RootState) => state.global.members.filter(i => i.topicID === state.global.selectedTopicId));

    return (
        <div style={style} className={classes(styles.members, className)}>
            <div className={classes(styles.members__title, "text", "text--large", "font__weight__primary--semi-bold")}>Członkowie</div>
            <div className={classes(styles.members__list)}>
                {
                    members.map(m => <ChatMember member={m} />)
                }
            </div>
        </div>
    )
}

export default ChatMembers;