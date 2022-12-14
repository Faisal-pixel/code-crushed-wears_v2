import { Fragment, useContext } from "react"
import { Outlet } from "react-router-dom"


import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropDown  from "../../components/cart-dropdown/cart-dropdown.component"

import { UserContext } from "../../contexts/user.context"
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { CartContext } from "../../contexts/cart.context"

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="Logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">Shop</NavLink>
                
                {
                  currentUser ? <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink> : <NavLink to="/auth">SIGN IN</NavLink>
                }
                <CartIcon />
            </NavLinks>
            {
              isCartOpen && <CartDropDown />
            }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation