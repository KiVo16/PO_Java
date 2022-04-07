import styles from './MainPage.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import NameCircle from '../../../components/NameCircle/NameCircle';
import NameView from '../../../components/NameView/NameView';
import { useInputFieldReducer } from '../../../reducers/InputFieldReducer';
import BasePage from '../../BasePage/BasePage';
import LeftView from '../../LeftView/LeftView';
import classes from 'classnames';
import ChatContent from '../../ChatContent/ChatContent';
import { RootState } from '../../..';
import { globalAddMessage, globalSetWebSocket, loadTopic, selectTopic } from '../../../redux/GlobalReducer';
import ChatContentEmpty from '../../ChatContentEmpty/ChatContentEmpty';

type WebSocketMessage = {
    type: "OPEN" | "MESSAGE" | "CLOSE" | "NEWUSER"
    messageId: number
    createdAt: number
    userId: number
    topicId: number
    content: string
}

export const NewWebSocketMessage = (msg: WebSocketMessage) => JSON.stringify(msg);



const MainPage = () => {
    const [searchReducer, dispatchSearchReducer] = useInputFieldReducer();
    const websocket = useSelector((state: RootState) => state.global.webSocket);
    const navigate = useNavigate();

    const reduxDispatch = useDispatch();
    const login = useSelector((state: RootState) => state.global.login);
    const userId = useSelector((state: RootState) => state.global.userId);
    const selectedTopicId = useSelector((state: RootState) => state.global.selectedTopicId);
    //const products = useSelector((state: RootState) => state.global.products);
    //const token = useSelector((state: RootState) => state.global.token);

    const membersMessages = useSelector((state: RootState) => state.global.messages.filter(i => i.topicID === state.global.selectedTopicId));

    useEffect(() => {
        //reduxDispatch(globalGetListProducts());
        //if (login === "-1") return;

        const webSocket = new WebSocket("ws://localhost:8080/websocket",
            'com.example.app');



        webSocket.onopen = function () {
            console.log('Client connection opened');
            console.log('Subprotocol: ' + webSocket.protocol);
            console.log('Extensions: ' + webSocket.extensions);

            webSocket.send(NewWebSocketMessage({ type: "OPEN", messageId: 0, createdAt: 0, userId: userId, topicId: 0, content: "" }))
        };

        webSocket.onclose = function (event) {
            console.log('Client connection closed: ' + event.code);
        };

        const disconnect = () => {
            if (webSocket != null) {
                webSocket.close();
            }
        }

        webSocket.onmessage = function (event) {

            const json = JSON.parse(event.data);
            const msg: WebSocketMessage = json as WebSocketMessage;
            console.log('Client received: ' + msg);


            if (msg.type === "MESSAGE") {
                reduxDispatch(globalAddMessage({ id: msg.messageId, content: msg.content, memberID: msg.userId, topicID: msg.topicId, createdAt: msg.createdAt }));
            } else if (msg.type === "NEWUSER") {
                reduxDispatch(loadTopic(msg.topicId));
            }


        };
        webSocket.onerror = function (event) {
            console.log('Client error: ' + event);
        };

        reduxDispatch(globalSetWebSocket(webSocket));
    }, [])

    useEffect(() => {
        // reduxDispatch(globalGetListProducts(searchReducer.value));
    }, [searchReducer.value])

    const onSend = (content: string): boolean => {
        if (selectedTopicId === -1 || userId === -1 || content.length === 0) return false;
        websocket?.send(NewWebSocketMessage({ type: "MESSAGE", userId: userId, messageId: 0, createdAt: 0, topicId: selectedTopicId, content: content }));
        return true;
    }

    const onOrdersClick = () => navigate("/orders");

    return (
        <BasePage className={classes(styles.page)}>
            <LeftView />
            {
                selectedTopicId === -1
                    ? <ChatContentEmpty />
                    : <ChatContent onSend={onSend} />
            }
        </BasePage>
    )
}

export default MainPage;