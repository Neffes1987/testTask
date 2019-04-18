import { connect } from 'react-redux';
import Main_view from './Main_view';
import { FetchSaga } from '../sagas';
import { CommentsCreators } from '../reducers/Comments';

const fetchUrl = 'https://arh.chibbistest.ru/test-api/v1/';

const mapDispatchToProps = dispatch => ({
  getComments: () => dispatch(FetchSaga({ url: `${fetchUrl}front-task`, reducerAction: CommentsCreators.fetch }))
});

const mapStateToProps = store => ({
  title: '',
  comments: store.Comments || []
});

const Maint_controller = connect(mapStateToProps, mapDispatchToProps)(Main_view);

export default Maint_controller;
