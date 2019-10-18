import _ from 'lodash'
import jsonPlaceHolder from '../apis/jsonPlaceholder'

/**
 * fethchPostsAndUsers()
 * call 'fetchPosts;
 * Get List of posts
 * find all unique userId's from list of posts
 * Iterate over unique userId's
 * call 'fetchUser' with each userId
 */

 // fetchPostsAndUsers is the only action creator we are going to call

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts())
    
    const userIds = _.uniq(_.map(getState().posts, 'userId'))
    userIds.forEach(id => dispatch(fetchUser(id)))
}

export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceHolder.get('/posts')

        dispatch({ type: 'FETCH_POSTS', payload: response.data })
    }

    // export const fetchUser = (id) =>  dispatch => {
    //     _fetchUser(id, dispatch)
    // }

    // this use of lodash with memoize solves our over fetching of users issues
    /*_.memoize runs the function only one time and if its called again, 
    it doesnt rerun the function but instead returns it from its previous memory*/
    
    // const _fetchUser = _.memoize(async(id,dispatch) => {
    //     const response = await jsonPlaceHolder.get(`/users/${id}`)

    //     dispatch({ type: 'FETCH_USER', payload: response.data })
    // })

    export const fetchUser = id => async dispatch => {
        const response = await jsonPlaceHolder.get(`/users/${id}`)

        dispatch({ type: 'FETCH_USER', payload: response.data })
    }

    
  