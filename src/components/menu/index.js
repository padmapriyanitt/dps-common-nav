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
import { h, Component, Fragment } from "preact";
import style from "./style.scss";
import fontAwesome from "font-awesome/css/font-awesome.css"
import classNames from "classnames";
import mockData from "./../../mock"
import MenuItemWidget from "../menu-item";


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapseOnInit ? props.collapseOnInit : false,
      menu: [],
      activeMenuItem: {}
    };
    this.setActive = this.setActive.bind(this)
  }

  toggleSideNav() {
    this.setState({
      collapsed: !this.state.collapsed
    });
    this.state.collapsed? this.props.onCollapse(): this.props.onExpand();
  }

  setActive(menuItem) {
    if(this.props.navigate && typeof this.props.navigate === 'function'){
      this.props.navigate(menuItem.link, this.props.urlPrefix && !menuItem.url.startsWith(this.props.urlPrefix))
    }else{
      window.location.href = menuItem.link
    }
    this.setState({activeMenuItem: menuItem})    
  }

  getMenuItems(menu, depth=0){
    return menu.map(menuItem => {
      let currentDepth = menuItem.subMenu && menuItem.subMenu.length? depth+1: depth
      this.markMenusToOpen(menuItem, menuItem.subMenu)
      console.log(menuItem);
      return(
        <MenuItemWidget onClick={this.setActive} menuItem={menuItem} depth={depth+1} 
        subMenuOpen={menuItem.subMenuOpen}
        isActive={this.state.activeMenuItem.id === menuItem.id || window.location.href.endsWith(menuItem.link)}
        subMenu={menuItem.subMenu && menuItem.subMenu.length ? this.getMenuItems(menuItem.subMenu, currentDepth):''} 
        collapsed={this.state.collapsed}/>      
      )
    })
  }

  markMenusToOpen(menuItem, subMenu) {
    if(!subMenu || subMenu.length === 0){
      return;
    }else {
      subMenu.forEach(subMenuItem => {
        this.markMenusToOpen(subMenuItem, subMenuItem.subMenu);
        if(window.location.href.endsWith(subMenuItem.link)){
          menuItem.subMenuOpen = true;
        }
      });
    }        
  }

  componentWillMount() {
    let promise = this.props.standalone ? this.getMenu() : fetch('/api/menu').then(result => result.json())
    promise.then(menuJson => {
      this.setState({menu: menuJson})
    });    
  }

  getMenu(){
    return new Promise((resolve, reject) => resolve(mockData))
  }

  render(props) {
    let menu = this.state.menu
    return (
      <div className={classNames({[style.navContainer]: true, [style.collapsed]: this.state.collapsed})}>
        <div className={style.dpLogo}>
          <a href="">
            <img className={style.logoImg} src={`/assets/images/dp-logo.png`}></img>
            <div>Hortonworks</div>
            <div>DataPlane</div>
          </a>
        </div>
        <ul className={style.menu}>
          { this.getMenuItems(menu, 0) }
        </ul>
        <div onClick={()=>this.toggleSideNav()}  className={style.expander}>
          {
            this.state.collapsed ?
            <i className={`${fontAwesome.fa} ${fontAwesome['fa-angle-double-right']}`}></i> :
            <i className={`${fontAwesome.fa} ${fontAwesome['fa-angle-double-left']}`}></i>
          }
        </div>
      </div>
    );
  }
}

