import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SideNav } from 'react-side-nav';
import './css/SideNavMenu.css';

const NavLink = props => (<Link to={props.to} {...props}><i className={`fa ${props.icon}`} />{props.label}</Link>);
const Chevron = props => (<i className={('fa', props.className, { 'fa-chevron-left': !props.expanded, 'fa-chevron-down': props.expanded })} />);
const Icon = props => (<i className={('fa', props.className)} />);

export class SideBar extends Component {

    /*Example of how to create menuItems object
     menuItems = [
     {
       id: 1,
       label: 'Item 1',
       icon: 'fas',
       link: '/item11',
      
     },
     {
       id: 2,
       label: 'Item 2',
       icon: 'fas',
       link: '/item12',
      
     },
     { id: 3,
       label: 'Item 3',
       icon: 'fas',
       items: [
         { id: 11,
           label: 'Item 1.1',
           icon: 'fas fa-car',
           link: '/item11',
         },
         { id: 12,
           label: 'Item 1.2',
           icon: 'fas fa-bullhorn',
           link: '/item12',
         },
       ],
     },
   ]; */

    render() {
        let { menuItems } = this.props
        return (
            <div className="hidesidenav">
                <SideNav
                    items={menuItems}
                    linkComponent={NavLink}
                    chevronComponent={Chevron}
                    iconComponent={Icon} style={{
                        minHeight: "200px"
                    }}
                /></div>
        )
    }
}

export default SideBar
