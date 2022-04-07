import produce from "immer";
import { Dispatch } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Action, Reducer } from "redux";
import { GetTopicMessages, GetTopicUsers, GetUser, handleApiError } from "../api";




export enum GlobalActions {
    setUser = "setUser",
    setTopics = "setTopics",
    setMembers = "setMembers",
    setMessages = "setMessages",
    addMessage = "addMessage",
    setTopicCompound = "setTopicCompound",
    setSelectedTopicId = "setSelectedTopicId",
    setTopicMembers = "setTopicsMembers",
    setTopicMessages = "setTopicMessages",
    openCloseTopicsModal = "openCloseTopicsModal",
    setMode = "setMode",
    setWebSocket = "setWebSocket"
}

export type TopicCompound = {
    name: string
    members: Member[]
    messages: Message[]
}

export type Topic = {
    id: number
    name: string
}

export type Member = {
    id: number
    name: string
    topicID: number
}

export type Message = {
    id: number
    topicID: number
    memberID: number
    createdAt: number
    content: string
}



export type GlobalState = {
    login: string
    userId: number
    webSocket?: WebSocket
    selectedTopicId: number
    topicsModalOpen: boolean
    topics: Topic[]
    members: Member[]
    messages: Message[]
    mode: "login" | "main"
}

const startGlobalState: GlobalState = {
    login: "-1",
    userId: -1,
    selectedTopicId: -1,
    topicsModalOpen: false,
    mode: "login",
    topics: [
        /*{ id: 0, name: "topic1" },
        { id: 1, name: "topic2" },*/
    ],
    members: [
        /* { id: 0, topicID: 0, name: "test" },
         { id: 1, topicID: 0, name: "test2" },*/
    ],
    messages: [
        /*   { id: 0, topicID: 0, memberID: 0, content: "Hej", timeCreated: 0 },
           { id: 1, topicID: 0, memberID: 0, content: "HejxdSD", timeCreated: 1 },
           { id: 2, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 3, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 4, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 5, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 6, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 7, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 8, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 9, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 10, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 11, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 12, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },
           { id: 13, topicID: 0, memberID: 0, content: "Hej2", timeCreated: 2 },*/
    ]
}

export interface DispatchGlobalAction extends Action<GlobalActions> {
    params?: Partial<GlobalState> | any;
}

export const useGlobalTypedSelector: TypedUseSelectorHook<GlobalState> = useSelector;


const GlobalReducer: Reducer<GlobalState, DispatchGlobalAction> = (currentState = startGlobalState, action): GlobalState => {
    switch (action.type) {
        case GlobalActions.setWebSocket:
            return setWebSocket(currentState, action.params.webSocket);
        case GlobalActions.setMode:
            return setMode(currentState, action.params.mode);
        case GlobalActions.openCloseTopicsModal:
            return openCloseTopicsModal(currentState);
        case GlobalActions.setUser:
            return setUser(currentState, action.params.login, action.params.id);
        case GlobalActions.setTopics:
            return setTopics(currentState, action.params.topics);
        case GlobalActions.setMembers:
            return setMembers(currentState, action.params.members);
        case GlobalActions.setMessages:
            return setMessages(currentState, action.params.messages);
        case GlobalActions.addMessage:
            return addMessage(currentState, action.params.message);
        case GlobalActions.setTopicCompound:
            return setTopicCompound(currentState, action.params.topic);
        case GlobalActions.setSelectedTopicId:
            return setSelectedTopicId(currentState, action.params.id);
        case GlobalActions.setTopicMembers:
            return setTopicMembers(currentState, action.params.id, action.params.members);
        case GlobalActions.setTopicMessages:
            return setTopicMessages(currentState, action.params.id, action.params.messages);
        default: return currentState
    }
}

export default GlobalReducer;

const setWebSocket = (state: GlobalState, webSocket?: WebSocket): GlobalState =>
    produce(state, newState => {
        newState.webSocket = webSocket;
    });

const setMode = (state: GlobalState, mode: "login" | "main"): GlobalState =>
    produce(state, newState => {
        newState.mode = mode;
    });

const openCloseTopicsModal = (state: GlobalState): GlobalState =>
    produce(state, newState => {
        newState.topicsModalOpen = !newState.topicsModalOpen;
    });

const setTopicMembers = (state: GlobalState, id: number, members: Member[]): GlobalState =>
    produce(state, newState => {
        newState.members = newState.members.filter(i => i.topicID != id);
        newState.members.push(...members);
    });

const setTopicMessages = (state: GlobalState, id: number, messages: Message[]): GlobalState =>
    produce(state, newState => {
        newState.messages = newState.messages.filter(i => i.topicID != id);
        newState.messages.push(...messages);
    });

const setUser = (state: GlobalState, login: string, id: number): GlobalState =>
    produce(state, newState => {
        newState.login = login;
        newState.userId = id;
    });

const setTopics = (state: GlobalState, topics: Topic[]): GlobalState =>
    produce(state, newState => {
        newState.topics = topics;
    });

const addMessage = (state: GlobalState, message: Message): GlobalState =>
    produce(state, newState => {
        newState.messages.push(message);
    });

const setMembers = (state: GlobalState, members: Member[]): GlobalState =>
    produce(state, newState => {
        newState.members = members;
    });

const setMessages = (state: GlobalState, messages: Message[]): GlobalState =>
    produce(state, newState => {
        newState.messages = messages;
    });


const setTopicCompound = (state: GlobalState, topic: TopicCompound): GlobalState =>
    produce(state, newState => {

    });


const setSelectedTopicId = (state: GlobalState, id: number): GlobalState =>
    produce(state, newState => {
        newState.selectedTopicId = id;
    });

export const globalSetWebSocket = (webSocket?: WebSocket) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setWebSocket, params: { webSocket: webSocket } });
    }

export const globalSetMode = (mode: "login" | "main") =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setMode, params: { mode: mode } });
    }

export const globalOpenCloseTopicsModal = () =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.openCloseTopicsModal, params: {} });
    }


export const globalSetTopicMembers = (id: number, members: Member[]) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setTopicMembers, params: { members: members, id: id } });
    }

export const globalSetTopicMessages = (id: number, messages: Message[]) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setTopicMessages, params: { messages: messages, id: id } });
    }

export const globalSetUser = (id: number, login: string) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setUser, params: { login: login, id: id } });
    }

export const globalSetTopics = (topics: Topic[]) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setTopics, params: { topics: topics } });
    }

export const globalSetMembers = (members: Member[]) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setMembers, params: { members: members } });
    }

export const globalSetMessages = (messages: Message[]) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setMessages, params: { messages: messages } });
    }

export const globalAddMessage = (message: Message) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.addMessage, params: { message: message } });
    }


export const globalSetTopicCompound = (topic: TopicCompound) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setTopicCompound, params: { topic: topic } });
    }

export const globalSetSelectedTopicId = (id: number) =>
    (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActions.setSelectedTopicId, params: { id: id } });
    }



export const loadUser = (id: number) =>
    (dispatch: Dispatch<any>) => {
        GetUser(id).then((response) => {
            dispatch(globalSetUser(response.data.id, response.data.login));
            dispatch(globalSetTopics(response.data.topics));
            dispatch(globalSetMode("main"));

            if (response.data.topics.length > 0) dispatch(selectTopic(response.data.topics[0].id));
        }).catch(handleApiError);
    };

export const selectTopic = (id: number) =>
    (dispatch: Dispatch<any>) => {
        dispatch(globalSetSelectedTopicId(id));
        dispatch(loadTopic(id));
    };

export const loadTopic = (id: number) =>
    (dispatch: Dispatch<any>) => {
        GetTopicMessages(id).then((response) => {
            dispatch(globalSetTopicMessages(id,
                response.data.reduce<Message[]>((arr, m) => [...arr, { id: m.id, content: m.content, createdAt: m.createdAt, topicID: id, memberID: m.userId }], [])

            ));
        }).catch(handleApiError);

        GetTopicUsers(id).then((response) => {
            dispatch(globalSetTopicMembers(id,
                response.data.reduce<Member[]>((arr, m) => [...arr, { id: m.id, name: m.login, topicID: id }], [])
            ));
        }).catch(handleApiError);
    };

/*
export const globalGetListProducts = (search?: string) =>
    (dispatch: Dispatch<any>) => {
        GetProductList(search).then((response) => {
            dispatch(globalSetProducts(response.data));
        }).catch(handleApiError);
    };

export const globalGetListOrders = () =>
    (dispatch: Dispatch<any>) => {
        GetOrdersList().then((response) => {
            dispatch(globalSetOrders(response.data));
        }).catch(handleApiError);
    };

export const globalGetOrder = (id: number, key: string) =>
    (dispatch: Dispatch<any>) => {
        GetOrder(id).then((response) => {
            dispatch(globalSetOrder(response.data));
        }).catch(handleApiError);
    };

export const globalLogin = (login: string, pass: string) =>
    (dispatch: Dispatch<any>) => {
        Login({ login: login }).then((response) => {
            dispatch(globalSetLogin(response.data.login, response.data.token));
        }).catch(handleApiError);
    };

export const globalAuth = () =>
    (dispatch: Dispatch<any>) => {
        Auth().then((response) => {
            dispatch(globalSetLogin(response.data.login, response.data.token));
        }).catch(handleApiError);
    };


export const globalLogout = () =>
    (dispatch: Dispatch<any>) => {
        LogOut().then(() => {
            dispatch(globalSetLogin("", ""));
        }).catch(handleApiError);
    };
*/
