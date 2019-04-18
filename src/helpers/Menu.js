import React, {useCallback} from 'react';// eslint-disable-line
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import ActiveIcon from '@material-ui/icons/Done';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useToggle, useInputControl } from './hooks';

let controlBtn = null;
export default function MenuComp({
  filterBy, searchBy, selectedButton, classes
}) {
  const [opened, setOpened] = useToggle(false);
  const [searchValue, setSearchValue] = useInputControl('');

  const onClick = useCallback((e) => {
    if (!opened) {
      controlBtn = e.currentTarget;
    }

    if (e.currentTarget.id !== 'search') {
      return setOpened();
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, [opened, setOpened]);

  const onSearch = useCallback(() => { searchBy(searchValue); }, [searchBy, searchValue]);

  return (
    <IconButton
      className={classes.menuButton}
      onClick={onClick}
      color="inherit"
      aria-label="Menu"
      aria-owns='simple-menu'
    >
      <MenuIcon />
      <Menu
        anchorEl={controlBtn}
        open={opened}
        onClose={onClick}
      >
        <MenuItem onClick = {filterBy} id='positive'>
          {selectedButton === 'positive' && <ActiveIcon/>}
          Только положительные
        </MenuItem>
        <MenuItem onClick = {filterBy} id='negative'>
          {selectedButton === 'negative' && <ActiveIcon/>}
          Только отрицательные
        </MenuItem>
        <MenuItem id='search' onClick ={onClick} >
          <InputBase
            placeholder="Search…"
            defaultValue = {searchValue}
            onBlur = {setSearchValue}
          />
          <IconButton onClick = {onSearch} >
            <SearchIcon />
          </IconButton>
        </MenuItem>
      </Menu>
    </IconButton>
  );
}

MenuComp.propTypes = {
  title: PropTypes.string.isRequired,
  filterBy: PropTypes.func.isRequired,
  searchBy: PropTypes.func.isRequired,
  selectedButton: PropTypes.string,
  classes: PropTypes.object,
};
MenuComp.defaultProps = {
  title: '',
  selectedButton: '',
  classes: {},

};
