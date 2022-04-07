import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../..';
import Modal from '../../components/Modal/Modal';
import { useInputFieldReducer } from '../../reducers/InputFieldReducer';
import { globalOpenCloseTopicsModal, loadUser, Topic } from '../../redux/GlobalReducer';
import styles from './TopicsModal.module.scss';
import classes from 'classnames';
import InputField from '../../components/InputField/InputField';
import IconButton from '../../components/IconButton/IconButton';
import { ReactComponent as AddIcon } from '../../res/plus.svg';
import { useCallback, useEffect, useState } from 'react';
import { CreateTopic, GetAllTopics, handleApiError, JoinTopic } from '../../api';
import TopicView from '../../components/TopicsList/TopicView/TopicView';
import { produce } from 'immer';
import { NewWebSocketMessage } from '../Pages/MainPage/MainPage';

type JoinableTopic = {
    joined: boolean
} & Topic

const TopicsModal = () => {
    const [nameInput, dispatchNameInput] = useInputFieldReducer();
    const websocket = useSelector((state: RootState) => state.global.webSocket);

    const userId = useSelector((state: RootState) => state.global.userId);
    const open = useSelector((state: RootState) => state.global.topicsModalOpen);
    const userTopics = useSelector((state: RootState) => state.global.topics);

    const [joinableTopics, setJoinableTopics] = useState<JoinableTopic[]>([]);

    const reduxDispatch = useDispatch();

    const onClose = () => reduxDispatch(globalOpenCloseTopicsModal());

    useEffect(() => {
        if (!open) return;
        GetAllTopics().then(response => {
            setJoinableTopics([]);
            for (let i = 0; i < response.data.length; i++) {
                const topic = response.data[i];
                let exists = false;
                for (let x = 0; x < userTopics.length; x++) {
                    const userTopic = userTopics[x];
                    if (userTopic.id === topic.id) {
                        exists = true;
                        break;
                    }
                }

                if (!exists) setJoinableTopics(state => [...state, { id: topic.id, name: topic.name, joined: false }]);
            }
        }).catch(handleApiError);
    }, [open])

    const onTopicAdd = useCallback(() => {
        if (nameInput.value === "") {
            alert("Nazwa nowego pokoju nie może być pusta");
            return;
        }
        CreateTopic({ name: nameInput.value }).then((response) => {
            JoinTopic(response.data.id, userId).then(() => {
                reduxDispatch(loadUser(userId));
                reduxDispatch(globalOpenCloseTopicsModal());
            }).catch(handleApiError);
        }).catch(handleApiError);
    }, [nameInput.value])

    const onTopicJoinClick = (topic: Topic) => {
        JoinTopic(topic.id, userId).then(() => {
            setJoinableTopics(state => produce(state, newState => {
                const index = newState.findIndex(i => i.id === topic.id);
                if (index > -1) newState[index].joined = true;
            }));
            reduxDispatch(loadUser(userId));
            websocket?.send(NewWebSocketMessage({ type: "NEWUSER", userId: userId, messageId: 0, createdAt: 0, topicId: topic.id, content: "" }));

        }).catch(handleApiError);
    }

    return (
        <Modal title={"Zarządzanie pokojami"} open={open} onClose={onClose} >
            <div className={classes(styles.add, "u-margin-top--medium", "u-margin-bottom--medium")}>
                <InputField
                    dispatch={dispatchNameInput}
                    value={nameInput.value}
                    placeholder="Nazwa pokoju"
                    type="text"
                    className={classes(styles.add__input)}
                />
                <IconButton color="primary" icon={AddIcon} className={styles.add__button} onClick={onTopicAdd} />
            </div>
            <div className={classes(styles.list)}>
                {
                    joinableTopics.map(t => <TopicView key={t.id} topic={t} onClick={() => { }} joinable joined={t.joined} onJoinClick={onTopicJoinClick} />)
                }
            </div>
        </Modal>
    )
}

export default TopicsModal;