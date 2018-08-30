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
      collapsed: false,
      menu: []
    };
  }

  toggleSideNav() {
    this.setState({
      collapsed: !this.state.collapsed
    });
    console.log(this.state.collapsed)    
    this.state.collapsed? this.props.onCollapse(): this.props.onExpand();
  }

  getMenuItems(menu, depth=0){
    return menu.map(menuItem => {
      return(
        <MenuItemWidget menuItem={menuItem} depth={depth} subMenu={menuItem.subMenu.length?this.getMenuItems(menuItem.subMenu,++depth):''} collapsed={this.state.collapsed}/>      
      )
    })
  }

  componentWillMount() {
    let promise = this.props.standalone ? this.getMenu() : fetch('/api/menu').then(result => result.json())
    promise.then(menuJson => {
      this.setState({menu: menuJson})
    });    
  }

  // fetchMenu() {
  //   return fetch('/api/menu')
  //   .then(result => result.json())
  // }

  getMenu(){
    return new Promise((resolve, reject) => resolve(mockData))
  }

  render(props) {
    let menu = this.state.menu
    return (
      <div className={classNames({[style.navContainer]: true, [style.collapsed]: this.state.collapsed})}>
        <div className={style.dpLogo}>
          <img className={style.logoImg} src={`/assets/images/dp-logo.png`}></img>
          <div className={style.titleContainer}>
            <div className={style.hwxText}><span>Hortonworks</span></div>
            <div className={style.dpText}><span>DataPlane</span></div>
          </div>
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

