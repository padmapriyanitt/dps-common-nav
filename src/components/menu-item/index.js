import { h, Component } from "preact";
import style from "./style.scss";
import fontAwesome from "font-awesome/css/font-awesome.css"
import classNames from "classnames";
import mockData from "./../../mock"

export default class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subMenuOpen: false
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