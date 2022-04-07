import { Topic } from '../../../redux/GlobalReducer';
import styles from './TopicView.module.scss';
import classes from 'classnames';
import NameView from '../../NameView/NameView';
import { PropsWithCustomBase } from '../../../utils/sharedTypes';
import Button from '../../Button/Button';

type TopicViewProps = PropsWithCustomBase<{
    topic: Topic
    onClick: () => void
    active?: boolean
    joinable?: boolean
    joined?: boolean
    onJoinClick?: (topic: Topic) => void
}>

const TopicView = ({ topic, onClick, active, joinable, joined, onJoinClick }: TopicViewProps) => {
    const { name } = topic;

    return (
        <div className={classes(styles.view, {
            [styles.active]: active
        })} onClick={onClick}>
            <NameView name={name} />
            {
                joinable === true ?
                    joined
                    ? <div className={classes("text", "text--small")}>Dołączono</div>
                    : <Button color="primary" onClick={() => onJoinClick?.(topic)}>Dołącz</Button>
                    : <></>
            }
        </div>
    )
}

export default TopicView;