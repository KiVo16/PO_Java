import classes from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../..';
import { selectTopic, Topic } from '../../redux/GlobalReducer';
import { PropsWithCustomBase } from '../../utils/sharedTypes';
import styles from './TopicsList.module.scss';
import TopicView from './TopicView/TopicView';

type TopicsListProps = PropsWithCustomBase<{
    topics: Topic[]
    mode: "list" | "join"

}>

const TopicsList = ({ className, style, topics, mode }: TopicsListProps) => {

    const reduxDispatch = useDispatch();
    const selectedTopicId = useSelector((state: RootState) => state.global.selectedTopicId);

    const onTopicClick = (id: number) => {
        reduxDispatch(selectTopic(id));
    }

    return (
        <div style={style} className={classes(styles.list, className)} >
            {
                topics.map(t => <TopicView key={t.id} topic={t} onClick={() => onTopicClick(t.id)} active={selectedTopicId === t.id} joinable={false} />)
            }
        </div>
    )
}

export default TopicsList;