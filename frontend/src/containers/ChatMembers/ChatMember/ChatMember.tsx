import { Member } from '../../../redux/GlobalReducer';
import { PropsWithCustomBase } from '../../../utils/sharedTypes';
import styles from './ChatMember.module.scss';
import classes from 'classnames';
import NameView from '../../../components/NameView/NameView';
import { ReactComponent as ArrowIcon } from '../../../res/info.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../..';

type ChatMemberProps = PropsWithCustomBase<{
    member: Member
}>

const ChatMember = ({ style, className, member }: ChatMemberProps) => {
    const { name } = member;
    const [openState, setOpenState] = useState(false);

    const messages = useSelector((state: RootState) => state.global.messages.filter(i => i.topicID === state.global.selectedTopicId && i.memberID === member.id)).
        sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));;

    return (
        <div style={style} className={classes(styles.member, className, { [styles.active]: openState })} onClick={() => setOpenState(state => !state)}>
            <div className={classes(styles.member__header)}>
                <NameView name={name} />
                <ArrowIcon className={classes(styles.member__header__arrow, { [styles.active]: openState })} />
            </div>
            {
                openState &&
                <div className={classes("u-margin-top--small", "text", "text--medium")}>
                    {messages.length} wysłanych wiadomości<br />
                    Ostatnia wiadomość: {messages.length === 0 ? "nic jeszcz nie wysłano" : messages[messages.length - 1].content}
                </div>
            }
        </div>
    )
}

export default ChatMember;