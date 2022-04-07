import axios from "axios"
import { Member, Message, Topic } from "./redux/GlobalReducer";

const baseURL = "http://localhost:8080/api"
const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
  })
  

export const handleApiError = (err: any) => console.error("API error: ", err);

type GeneralResponse = {
    data: string
}

type CreateOrderResponse = {
    id: number
    key: string
}


type TokenResponse = {
    login: string
    token: string
}

type TopicRequest = {
    name: string
}

type MemberWithTopics = {
    id: number
    login: string
    topics: Topic[]
}

type ApiMessage = {
    id: number
    content: string
    createdAt: number
    userId: number
}

type ApiMember = {
    id: number
    login: string
}

export const CreateTopic = (topic: TopicRequest) => {
    const json = JSON.stringify(topic);
    return instance.post<Topic>("topics", json);
}

export const GetTopic = (id: number) => {
    return instance.get<Topic>(`topics/${id}`);
}

export const GetTopicUsers = (id: number) => {
    return instance.get<ApiMember[]>(`topics/${id}/users`);
}

export const GetTopicMessages = (id: number) => {
    return instance.get<ApiMessage[]>(`topics/${id}/messages`);
}

export const GetAllTopics = () => {
    return instance.get<Topic[]>(`topics`);
}

export const JoinTopic = ( topicID: number, memberID: number) => {
    const json = JSON.stringify({id: memberID});
    return instance.post<any>(`topics/${topicID}/users`, json);
}

export const GetUser = (id: number) => {
    return instance.get<MemberWithTopics>(`users/${id}`);
}

export const Login = (data: {login: string}) => {
    const json = JSON.stringify(data);
    return instance.post<Topic>("login", json);
}

