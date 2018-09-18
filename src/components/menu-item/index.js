/*!
 *   HORTONWORKS DATAPLANE SERVICE AND ITS CONSTITUENT SERVICES
 *
 *   (c) 2016-2018 Hortonworks, Inc. All rights reserved.
 *
 *   This code is provided to you pursuant to your written agreement with Hortonworks, which may be the terms of the
 *   Affero General Public License version 3 (AGPLv3), or pursuant to a written agreement with a third party authorized
 *   to distribute this code.  If you do not have a written agreement with Hortonworks or with an authorized and
 *   properly licensed third party, you do not have any rights to this code.
 *
 *   If this code is provided to you under the terms of the AGPLv3:
 *   (A) HORTONWORKS PROVIDES THIS CODE TO YOU WITHOUT WARRANTIES OF ANY KIND;
 *   (B) HORTONWORKS DISCLAIMS ANY AND ALL EXPRESS AND IMPLIED WARRANTIES WITH RESPECT TO THIS CODE, INCLUDING BUT NOT
 *     LIMITED TO IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE;
 *   (C) HORTONWORKS IS NOT LIABLE TO YOU, AND WILL NOT DEFEND, INDEMNIFY, OR HOLD YOU HARMLESS FOR ANY CLAIMS ARISING
 *     FROM OR RELATED TO THE CODE; AND
 *   (D) WITH RESPECT TO YOUR EXERCISE OF ANY RIGHTS GRANTED TO YOU FOR THE CODE, HORTONWORKS IS NOT LIABLE FOR ANY
 *     DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES INCLUDING, BUT NOT LIMITED TO,
 *     DAMAGES RELATED TO LOST REVENUE, LOST PROFITS, LOSS OF INCOME, LOSS OF BUSINESS ADVANTAGE OR UNAVAILABILITY,
 *     OR LOSS OR CORRUPTION OF DATA.
 */
import { h, Component } from "preact";
import style from "./style.scss";
import fontAwesome from "font-awesome/css/font-awesome.css"
import classNames from "classnames";
import mockData from "./../../mock"

export default class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subMenuOpen: this.props.subMenuOpen
        };
        this.handleClick = this.handleClick.bind(this)
    }

    toggleSubMenu(e){
        e.stopPropagation()
        e.preventDefault();
        this.setState({
            subMenuOpen: !this.state.subMenuOpen
        });
    }

    handleClick(e){
        e.stopPropagation()
        this.props.onClick(this.props.menuItem)
    }

    render() {
        let levelClass = style[`level${this.props.depth}`]
        let menuIconClasses = this.props.menuItem.icon? this.props.menuItem.icon.split(" "):[];
        let menuIcon = ''
        menuIconClasses.forEach(element => {
            menuIcon += (` ${fontAwesome[element]}`)
        });
        return(
            <li onClick={(e) =>this.handleClick(e)} className={classNames({[style.active]:this.props.isActive}, {[style.menuItem]:true}, 
                {[style.subMenuOpen]:this.state.subMenuOpen}, {[style.menuCollapsed]:this.props.collapsed})}>
            <a>
                <span className={`${style.menuText}`}>
                    {this.props.isActive?<i className={`${style.activeIcon} ${fontAwesome.fa} ${fontAwesome['fa-caret-right']}`}></i>:''} 
                    <i className={`${style.menuIcon} ${fontAwesome.fa} ${menuIcon}`}></i>
                    <span className={style.menuItemText}>
                        {this.props.menuItem.displayName} 
                        {this.props.menuItem.subMenu && this.props.menuItem.subMenu.length ?
                        <span onClick={(e)=>this.toggleSubMenu(e)}><i className={`${style.subMenuExpander} ${fontAwesome.fa} ${fontAwesome['fa-angle-down']}`}></i></span>:''}
                    </span>
                </span>
            </a>
            { this.state.subMenuOpen && this.props.menuItem.subMenu && this.props.menuItem.subMenu.length > 0? <ul className={classNames({[style.subMenu]:true},{[`${levelClass}`]:true},)}> {this.props.subMenu} </ul>: '' }
            </li>
        )
    }
}