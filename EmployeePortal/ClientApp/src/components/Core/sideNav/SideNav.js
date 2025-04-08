import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './../sideNav/styles/DefaultTheme.scss';
import './../sideNav/styles/SideNav.scss';
import { activateItemWithLink, animateItemWithId, createItemTree, toggleExpandedItemWithId } from './SideNavHelpers';
import SideNavItem from './SideNavItem';

/**
 * SideNav
 */
class SideNav extends Component {
    state = {
        items: [],
        activeItemLink: null, // eslint-disable-line react/no-unused-state
    };

    // Create Item tree with additional properties
    componentDidMount() {
        let items = this.props.items ? createItemTree(this.props.items) : [];
        if (this.props.activeItem && this.props.items) items = activateItemWithLink(this.props.activeItem, items);
        this.setState({ activeItemLink: this.props.activeItem, items }); // eslint-disable-line react/no-unused-state
    }

    static getDerivedStateFromProps(newProps) {
        if (newProps && newProps.activeItem) {
            const items = activateItemWithLink(newProps.activeItem, this.state.items);
            return{ activeItemLink: newProps.activeItem, items }; // eslint-disable-line react/no-unused-state
        }
        return null;
    }

    onItemClick = id => ((e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        const items = this.toggleItem(id);
        this.animateItem(id, items);
    });

    animateItem = (id, oldItems) => {
        const items = animateItemWithId(id, (typeof oldItems !== 'undefined') ? oldItems : this.state.items, this.animateItem);
        this.setState({ items });
    }

    toggleItem = id => toggleExpandedItemWithId(id, this.state.items);

    renderItems = () => (
        this.state.items.map(item =>
        (<SideNavItem
            key={item.id}
            level={0}
            linkComponent={this.props.linkComponent}
            chevronComponent={this.props.chevronComponent}
            iconComponent={this.props.iconComponent}
            onItemClick={this.onItemClick}
            {...item}
        />))
    );

    render = () => (
        <div className={classNames('side-nav', this.props.className, { 'default-theme': !this.props.className })} >
            {this.renderItems()}
        </div>
    )
}

SideNav.propTypes = {
    linkComponent: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
    activeItem: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    className: PropTypes.string,
    chevronComponent: PropTypes.func,
    iconComponent: PropTypes.func,
};

SideNav.defaultProps = {
    items: null,
    activeItem: null,
    className: null,
    chevronComponent: null,
    iconComponent: null,
    linkComponent: null,
};

export default SideNav;
