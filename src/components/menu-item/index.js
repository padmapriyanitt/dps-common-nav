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
    }

    toggleSubMenu(){
        this.setState({
            subMenuOpen: !this.state.subMenuOpen
        });
    }

    render() {
        let levelClass = style[`level${this.props.depth}`]
        return(
            <li className={classNames({[`${levelClass}`]:true}, {[style.subMenu]:this.props.menuItem.subMenu.length > 0}, 
                {[style.subMenuOpen]:this.state.subMenuOpen}, {[style.menuCollapsed]:this.props.collapsed})}>
            <a>
                <i className={`${fontAwesome.fa} ${fontAwesome[this.props.menuItem.icon]}`}></i>
                <span className={style.menuItemText}>
                {this.props.menuItem.displayName} 
                {this.props.menuItem.subMenu && this.props.menuItem.subMenu.length ?
                    <span onClick={()=>this.toggleSubMenu()}><i className={`${fontAwesome.fa} ${fontAwesome['fa-caret-down']}`}></i></span>:''}
                </span>
            </a>
            { this.props.menuItem.subMenu.length > 0? <ul> {this.props.subMenu} </ul>: '' }
            </li>
        )
    }
}