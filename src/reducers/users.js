var Users = (state={user:''}, action) => {
    switch(action.type){
        case 'ADD_USER': return {
            ...state,
            user: action.user
        }
        case 'TOP_USERS': return {
            ...state,
            users_data: action.data
        }
        case 'UPDATE_USER_DATA': return {
            ...state,
            user_profile_data: action.data
        }
        default: return state
    }
}

export default Users