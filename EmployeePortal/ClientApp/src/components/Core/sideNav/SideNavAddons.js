import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export const Chevron = props => (
    <i className={classNames('fas', props.className, { 'fa-chevron-left': !props.expanded, 'fa-chevron-down': props.expanded })} />
);

Chevron.propTypes = {
    className: PropTypes.string,
    expanded: PropTypes.bool,
};

Chevron.defaultProps = {
    className: '',
    expanded: false,
};

export const Icon = props => (<i className={classNames(props.className)} />);

Icon.propTypes = {
    className: PropTypes.string,
};

Icon.defaultProps = {
    className: '',
};
