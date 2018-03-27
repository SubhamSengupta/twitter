var Users = (state={}, action) => {
    switch(action.type){
        case 'TOP_USERS': return {
            ...state,
            users_data: action.data
        }
        case 'UPDATE_USER_DATA': return {
            ...state,
            user_profile_data: action.data
        }
        case 'UPDATE_POST_DATA': return {
            ...state,
            user_post_data: action.data
        }
        case 'UPDATE_FOLLOWER_DATA': return {
            ...state,
            user_follower_data: action.data
        }
        default: return state
    }
}

export default Users