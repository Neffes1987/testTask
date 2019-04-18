import React, {useState} from 'react';// eslint-disable-line
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { useToggle } from './hooks';


/**
* [component] Draws card block with accordion in general
* @author Новицкий Вячеслав, created on 13-04-2019
* @class CardItem
* @param {string} children - text block for dangerouslySetInnerHTML implementation
* @param {string} subtitle - additional header title(second line)
* @param {string} title - primary header title(first line)
* @param {string} avatar - src url for avatar block
*/

export default function CardItem({
  children,
  subtitle,
  title,
  asAccordion,
  avatar
} = {}) {
  const [opened, onToggle] = useToggle(false);
  return (
    <Card >
      <CardHeader
        avatar={ <Avatar aria-label = "Recipe"> {avatar ? <img src = {avatar}/> : 'A'} </Avatar> }
        action={
          asAccordion ? (<Fab color="primary" aria-label="edit" onClick = {onToggle}>
            {opened ? '-' : '+'}
          </Fab>) : null
        }
        title={title}
        subheader={subtitle}
      />
      <Collapse timeout="auto" unmountOnExit in={asAccordion ? opened : true}>
        <CardContent>
          <Typography paragraph ={true}>
            {children}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

CardItem.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.any,
  asAccordion: PropTypes.bool,
};
CardItem.defaultProps = {
  title: '',
  subtitle: '',
  avatar: '',
  children: '',
  asAccordion: true
};
