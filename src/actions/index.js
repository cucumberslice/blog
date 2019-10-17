import _ from 'lodash'
import jsonPlaceHolder from '../apis/jsonPlaceholder'

export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceHolder.get('/posts')

        dispatch({ type: 'FETCH_POSTS', payload: response.data })
    }

    export const fetchUser = (id) =>  dispatch => {
        _fetchUser(id, dispatch)
    }

    // this use of lodash with memoize solves our over fetching of users issues
    
    const _fetchUser = _.memoize(async(id,dispatch) => {
        const response = await jsonPlaceHolder.get(`/users/${id}`)

        dispatch({ type: 'FETCH_USER', payload: response.data })
    })

  