import { ref, onMounted, onUnmounted } from 'vue';
import axios from "axios";

export const spin = (color) => {
    return `<svg class="mr-2 inline h-5 w-5 text-gray-200 animate-spin dark:text-gray-600 fill-${color}-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>`
}

export const getCmtsFromOneTask = async(taskId) => {
    const response = await axios.get(
        `http://localhost:3000/tasks/${taskId}/comments`, 
        {withCredentials: true}
    );
    const result = response.data;
    return result;
}

export const getTasks = async() => {
    const response = await axios.get('http://localhost:3000/tasks', {withCredentials: true});
    return response.data;
};


export const createTask = async(data) => {
    await axios.post('http://localhost:3000/tasks', data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    })
}

// Like
export const addLike = async (taskId) => {
    console.log('inside addLike Fetch.js');
    const data = {status: true};
    const response = await axios.post(`http://localhost:3000/tasks/${taskId}/likes`, data, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    });
    return response.data;
}

export const deleteLike = async(taskId) => {
    await axios.delete(`http://localhost:3000/tasks/${taskId}/likes`, {
        headers: {
            Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    });

    return true;
}

// Comment
export const createComment = async(taskId, data) => {
    const response = await axios.post(`http://localhost:3000/tasks/${taskId}/comments`, data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    })

    return response.data;
}

export const deleteComment = async(commentId) => {
    await axios.delete(`http://localhost:3000/tasks/comments/${commentId}`, {withCredentials: true});
}


export const timeAgoComment = (comment) => {
    const createdAt = parseInt(comment.createdAt) / (1000 * 3600 * 24);
    const now = Date.now() / (1000 * 3600 * 24);
    const diff = Math.floor(now - createdAt);
    if( diff === 0) {return 'Today'}
    else if( diff === 1) {return '1 day ago'}
    else if(diff > 30) { return 'over 30 days ago' }
    else {return `${diff} days ago` }
} 

// Task
export const saveEditTask = async(taskId, data) => {
    console.log('inside saveEditTask Fetch');
    const response = await axios.patch(`http://localhost:3000/tasks/${taskId}`, data ,{withCredentials: true});
    return response.data; 
}

export const deleteTask = async(taskId) => {
    await axios.delete(`http://localhost:3000/tasks/${taskId}`, {withCredentials: true});
}

// Follow
export const follow = async(data) => {
    console.log('insdide follow Fetch');
    const response = await axios.post(`http://localhost:3000/follows`, data, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    })
    return response.data;
}

export const deleteFollow = async(relationId) => {
    console.log('inside delelteFollow Fetch');
    await axios.delete(`http://localhost:3000/follows/${relationId}`, {withCredentials: true});
}

export const getAllRelations = async() => {
    const response = await axios.get('http://localhost:3000/follows', {withCredentials: true});
    return response.data;
}

export const getRelation = async(followerId, followingId) => {
    const response = await axios.get(`http://localhost:3000/follows/follower/${followerId}?following=${followingId}`, {withCredentials: true});
    return response.data;
}


// Authentication
export const login = async(isRememberMe, data) => {
    const response = await axios.post(`http://localhost:3000/auth/signin?rememberMe=${isRememberMe}`, data, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    });

    return response.data;
}

export const register = async(data) => {
    const response = await axios.post('http://localhost:3000/auth/signup', data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
    });

    return response.data;
}