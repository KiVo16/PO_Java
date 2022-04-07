
import classes from 'classnames';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleApiError, Login } from '../../../api';
import CatchPhrase from '../../../components/CatchPhrase/CatchPhrase';
import IconButton from '../../../components/IconButton/IconButton';
import InputField from '../../../components/InputField/InputField';
import Section from '../../../components/Section/Section';
import { useInputFieldReducer } from '../../../reducers/InputFieldReducer';
import { globalSetMode, globalSetUser, loadUser } from '../../../redux/GlobalReducer';
import { ReactComponent as LoginIcon } from '../../../res/login.svg';
import BasePage from '../../BasePage/BasePage';
import styles from './LoginPage.module.scss';

const LoginPage = () => {

    const [loginInput, dispatchLoginInput] = useInputFieldReducer();
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();

    const onLogIn = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (loginInput.value === "") {
            alert("Login nie może być pusty");
            return;
        }

        Login({ login: loginInput.value }).then((response) => {
            reduxDispatch(globalSetUser(response.data.id, response.data.name));
            reduxDispatch(loadUser(response.data.id));
            navigate("/");
        }).catch(err => {
            handleApiError(err.response);
        })

    }, [loginInput.value])

    return (
        <BasePage>
            <CatchPhrase className={classes("u-margin-layout-bottom--small", "u-margin-layout-top--small")} heading="Podaj swój login" content="Twój login jest również twoim unikalnym identyfikatorem" />
            <Section className={classes(styles.login)}>
                <form className={classes(styles.login__form)} onSubmit={onLogIn}>
                    <InputField
                        dispatch={dispatchLoginInput}
                        value={loginInput.value}
                        placeholder="Login"
                        type="text"
                        className={classes(styles.login__form__input)}
                    />
                    <IconButton color="primary" icon={LoginIcon} className={styles.login__form__button} />
                </form>
            </Section>
        </BasePage>
    )
}

export default LoginPage;