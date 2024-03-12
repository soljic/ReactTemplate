import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button, Dropdown, Icon, Image, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import "./NavBar.css";
import { FaBars, FaTimes, FaShoppingBasket } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import ShoppingCart from "src/features/store/ShoppingCart";

 function Navbar() {
  const {
    userStore: { user, isLoggedIn, logout },
    shoppingCartStore: { cartQuantity, isOpen, closeCart, openCart },
    modalStore,
  } = useStore();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [basketItemsCount, setBasketItemsCount] = useState(0);

  const navRef = useRef<HTMLElement | null>(null);

  const showNavbar = () => {
    setMenuIsOpen(!menuIsOpen);
    navRef.current?.classList.toggle("responsive_nav");
  };

  function handleMenuClick() {
    setMenuIsOpen(!menuIsOpen);
  }
 
  useEffect(() => {
    setBasketItemsCount(cartQuantity);
    
  }, [cartQuantity]); // Ovo je samo primjer, zamijenite ovu vrijednost sa stvarnim brojem predmeta u košarici

  return (
    <header>
        <div className="navbarLogo">
          <NavLink to="/">
            <Image src="/assets/logo.png" alt="logo" />
          </NavLink>
        </div>
        <nav className="navbar" ref={navRef}>
          {isLoggedIn ? (
            <>
            <ShoppingCart /> 
              <div
                className={`navbarLinks ${
                  menuIsOpen ? "navbarLinksMobile" : ""
                }`}
              >
                <NavLink to="/activities" className="navbarLink">
                  Activities
                </NavLink>
                <NavLink to="/quizzes" className="navbarLink">
                  Quizz
                </NavLink>
                <NavLink to="/store" className="navbarLink">
                  Store
                </NavLink>
                <NavLink to="/createActivity">
                  <Button
                    className="navbarButton"
                    content="Create Activity"
                    positive
                  />
                </NavLink>
              </div>
              <Dropdown
                className="navbarDropdown"
                trigger={
                  <span>
                    <Image
                      src={user?.image || "/assets/user.png"}
                      avatar
                      spaced="right"
                    />
                    {user?.displayName}
                  </span>
                }
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/profiles/${user?.username}`}
                    text="My Profile"
                    icon="user"
                  />
                    <Dropdown.Item
                    onClick={() => openCart()}
                    text={
                      <span>
                        Basket 
                        <Icon.Group>
                          {/* Provjeravamo ima li vrijednosti za basketItemsCount */}
                          {basketItemsCount && basketItemsCount> 0 ? (
                            <Label
                              circular
                              color="red"
                              size="mini"
                              floating
                              content={basketItemsCount}
                              className="redDot"
                            />
                          ) : null}
                        </Icon.Group>{" "}
                      </span>
                    }
                    
                    icon="shopping basket"
                  />
                  <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <div
                className={`navbarLinks ${
                  menuIsOpen ? "navbarLinksMobile" : ""
                }`}
              >
                <NavLink to="/aboutUs" className="navbarLink">
                  About Us
                </NavLink>
                <NavLink to="/services" className="navbarLink">
                  Services
                </NavLink>
                <NavLink to="/gallery" className="navbarLink">
                  Gallery
                </NavLink>
                <div className="navbarButtonGroup">
                  <Button
                    onClick={() => modalStore.openModal(<LoginForm />)}
                    size="huge"
                    inverted
                  >
                    Login!
                  </Button>
                  <Button
                    onClick={() => modalStore.openModal(<RegisterForm />)}
                    size="huge"
                    inverted
                  >
                    Register!
                  </Button>
                </div>
              </div>
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </>
          )}
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
        {menuIsOpen ?  <FaBars/> : <FaTimes/> }
      </button>
      </header>
  );
}
export default observer(Navbar);