import {
  CURRENT_PAGE_SET,
  SET_PAGE_LOADING,
  AFFILIATES_LOADED,
  ADMIN_LOADED
} from '../actions/types'

const initialState = {
  currentPage: 'dashboard',
  baseURL: window.location.port ? 'http://' + window.location.hostname + ':5000/files/' : 'https://' + window.location.hostname + '/files/',
  pageIsLoading: false,
  affiliates: [],
  admin: {}
}

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case CURRENT_PAGE_SET: {
      return {
        ...state,
        currentPage: payload
      }
    }
    case SET_PAGE_LOADING: {
      return {
        ...state,
        pageIsLoading: payload
      }
    }
    case AFFILIATES_LOADED: {
      return {
        ...state,
        affiliates: payload
      }
    }
    case ADMIN_LOADED: {
      return {
        ...state,
        admin: payload
      }
    }
    default:
      return state
  }
}

export default adminReducer