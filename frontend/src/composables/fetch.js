import { ref, onMounted, onUnmounted } from 'vue';
import axios from "axios";

export const getTasks = async() => {
    const response = await axios.get('http://localhost:3000/tasks', {withCredentials: true});
    const result = response.data;
    return result;
};

export const getCmtsFromOneTask = async(taskId) => {
    const response = await axios.get(
        `http://localhost:3000/tasks/${taskId}/comments`, 
        {withCredentials: true}
    );
    const result = response.data;
    return result;
}

export const createTask = async(data) => {
    await axios.post('http://localhost:3000/tasks', data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    })
}


export const createComment = async(data) => {
    await axios.post(`http://localhost:3000/tasks/${taskId}/comments`, data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    })
}