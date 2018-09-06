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
    this.setState({activeMenuItem: menuItem})
  }

  getMenuItems(menu, depth=0){
    return menu.map(menuItem => {
      let currentDepth = menuItem.subMenu && menuItem.subMenu.length? depth+1: depth
      return(
        <MenuItemWidget onClick={this.setActive} menuItem={menuItem} depth={depth+1} isActive={this.state.activeMenuItem.id === menuItem.id}
        subMenu={menuItem.subMenu && menuItem.subMenu.length ? this.getMenuItems(menuItem.subMenu, currentDepth):''} 
        collapsed={this.state.collapsed}/>      
      )
    })
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

