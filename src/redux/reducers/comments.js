import commentsTypes from '../types/comments';

const initialState = {
	inProgress: false,
	commentsList: [],
	error: ''
};

export default function commentsReducer(state = initialState, action) {
	switch (action.type) {
		case commentsTypes.ADD_COMMENT_TO_ARTICLE_REQUEST:
			return { ...state, inProgress: true };
		case commentsTypes.ADD_COMMENT_TO_ARTICLE_DONE:
			return { ...state, commentsList: [ action.payload, ...state.commentsList ], inProgress: false };
		case commentsTypes.ADD_COMMENT_TO_ARTICLE_ERROR:
			return { ...state, error: action.payload.error, inProgress: false };

		case commentsTypes.FETCH_COMMENTS_FROM_ARTICLE_REQUEST:
			return { ...state, inProgress: true };
		case commentsTypes.FETCH_COMMENTS_FROM_ARTICLE_DONE:
			return { ...state, commentsList: [ ...action.payload ], inProgress: false };
		case commentsTypes.FETCH_COMMENTS_FROM_ARTICLE_ERROR:
			return { ...state, error: action.payload.error, inProgress: false };

		case commentsTypes.REMOVE_COMMENT_FROM_ARTICLE_REQUEST:
			return { ...state, inProgress: true };
		case commentsTypes.REMOVE_COMMENT_FROM_ARTICLE_DONE:
			return { ...state, inProgress: false };
		case commentsTypes.REMOVE_COMMENT_FROM_ARTICLE_ERROR:
			return { ...state, error: action.payload.error, inProgress: false };

		case commentsTypes.UNLOAD_COMMENTS_FROM_ARTICLE:
			return { ...state, commentsList: [] };

		default:
			return state;
	}
}
