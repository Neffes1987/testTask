import React from 'react';// eslint-disable-line
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    flexGrow: 1,
  }
};

function ButtonAppBar({ children, classes, title }) {
  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          {children}
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.any,
};
ButtonAppBar.defaultProps = {
  classes: {},
  title: '',
  children: '',
};

export default withStyles(styles)(ButtonAppBar);
