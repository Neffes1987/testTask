import StdReduce from './stdReduce';

const COMMENTS = new StdReduce({
  prefix: 'COMMENTS__',
  initialState: []
});

COMMENTS.useUpdate('fetch', ({ action: { response } }) => response.map((comment, id) => ({ ...comment, id })));

export const CommentsCreators = COMMENTS.getActionCreators();

export default COMMENTS.checkActionForState;
