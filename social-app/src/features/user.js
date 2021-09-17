import http from '../utils/api'

const LoginReq = (values, history) => {

    const path = '/user/login'
    http.post(path, values).then((res) => {
        if (res) {
            localStorage.setItem('user', JSON.stringify(res))
            history.push('/home')
        }
    })
}


const signup = (data) => {
    const path = '/user/signup'
    http.post(path, data).then((res) => {
        if (res) {
            console.log(res)
        }
    })
}

const AddPeople = (setPeople, id) => {
    const path = `/user/getAll/${id}`
    http.get(path).then(res => {
        if (res) {
            // console.log(res)
            setPeople(res)
        }
    })
}

const getRequests = (id, setreq) => {
    const path = `/user/getRequests/${id}`
    http.get(path).then(res => {
        if (res)
            setreq(res)
    })
}

const addFriend = (id, recieverId) => {
    const path = `/user/sendRequest/${id}`
    const data = {recieverId}
    http.post(path, data).then(res => {
        if (res) {
            console.log(res)
        }
    })
}
const confirmRequest = (id, senderId, confirm) => {
    const path = `/user/confirmRequest/${id}`
    const data = {
        senderId,
        confirm
    }
    http.post(path, data).then(res => {
        if (res) {
            console.log(res)
        }
    })
}




export { LoginReq, signup, getRequests, AddPeople, addFriend, confirmRequest }