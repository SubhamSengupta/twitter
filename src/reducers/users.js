var Users = (state={}, action) => {
    switch(action.type){
        case 'FETCH_TOP_USERS': return {
            ...state,
            top_users: action.data.data
        }
        case 'UPDATE_USER_PROFILE': return {
            ...state,
            user_profile: action.data
        }

        default: return state
    }
}

export default Users