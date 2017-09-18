export default (dispatch, errorHandler) => error =>
    error.response.status === 401 ? dispatch({
        type: 'LOG_OUT'
    }) :
    dispatch(errorHandler(error))