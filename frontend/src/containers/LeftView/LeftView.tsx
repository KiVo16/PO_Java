import styles from './LeftView.module.scss';
import classes from 'classnames';
import NameView from '../../components/NameView/NameView';
import IconButton from '../../components/IconButton/IconButton';
import { ReactComponent as PlusIcon } from '../../res/plus.svg';
import TopicsList from '../../components/TopicsList/TopicsList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../..';
import { globalOpenCloseTopicsModal } from '../../redux/GlobalReducer';

const LeftView = () => {

    const topics = useSelector((state: RootState) => state.global.topics);
    const login = useSelector((state: RootState) => state.global.login);
    const reduxDispatch = useDispatch();

    const onTopicsModalOpen = () => reduxDispatch(globalOpenCloseTopicsModal());

    return (
        <div className={classes(styles.view)}>
            <div className={classes(styles.view__header)}>
                <NameView name={login} />
            </div>
            <div className={classes(styles.view__control)}>
                <div className={classes(styles.view__content__name, "text", "text--large", "font__weight__primary--semi-bold")}>Pokoje</div>
                <IconButton color="white" icon={PlusIcon} onClick={onTopicsModalOpen}/>
            </div>
            <TopicsList className={classes(styles.view__list)} topics={topics} mode="list" />
        </div>
    )
}

export default LeftView;