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

  parseMenu(menuJson, depth = 0) {
    console.log(this.state.collapsed)
      const collapsed = this.state.collapsed;
      return menuJson.map(menuItem => {
        let subMenu = '';
        if(menuItem.subMenu){
          const newDepth = depth + 1;
          subMenu = this.parseMenu(menuItem.subMenu, newDepth) 
        }       
        return(
          <MenuItemWidget menuItem={menuItem} depth={depth} subMenu={subMenu} collapsed={collapsed}/>
        )
      })  
  }

  componentDidMount() {
    let promise = this.props.standalone ? this.getMenu() : this.fetchMenu()
    promise.then(menuJson => {
      this.setState({menu:this.parseMenu(menuJson)})
    });    
  }

  fetchMenu() {
    fetch('/api/menu')
    .then(result => result.json())
  }

  getMenu(){
    return new Promise((resolve, reject) => resolve(mockData))
  }

  render(props) {
    return (
      <div className={classNames({[style.navContainer]: true, [style.collapsed]: this.state.collapsed})}>
        <div className={style.dpLogo}>
          <img src={`/assets/images/dp-logo.png`}></img>
          <div class={style.titleContainer}>
            <div className={style.hwxText}><span>Hortonworks</span></div>
            <div className={style.dpText}><span>DataPlane</span></div>
          </div>
        </div>
        <ul className={style.menu}>
          { this.state.menu }
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

