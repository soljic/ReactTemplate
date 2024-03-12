import { Modal, Header, Button, Icon, Label, List } from "semantic-ui-react";
import { formatCurrency } from "src/utilities/formatCurrency";
import storeItems from "src/data/items.json";
import StoreItem from "./StoreItem";
import { useStore } from "src/app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function ShoppingCart() {
  const { shoppingCartStore } = useStore();

  const { closeCart,clearCart, setTotalPrice, totalPrice, isOpen, cartItems } = shoppingCartStore;

 const handleProceedToCheckout = () => {
    // send customerInfo and cartItems to backend
    setTotalPrice(cartItems.reduce((total, cartItem) => {
        const item = storeItems.find((i) => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
      }, 0));
    closeCart();
    console.log("TestCose");
  };

  

 
  return (
    <Modal
      open={isOpen}
      onClose={closeCart}
      closeIcon
      size="small"
      dimmer="blurring"
      centered={false}
    >
      <Header icon="cart" content="Cart" />
      <Modal.Content>
        <List divided relaxed>
          {cartItems.map((item) => (
            <StoreItem
              name={""}
              imgUrl={""}
              key={item.id}
              {...item}
            />
          ))}
        </List>
        <div className="ui divider" />
        <div className="ui grid">
          <div className="row">
            <Link to="/checkout">
              <Button onClick={handleProceedToCheckout} style={{ backgroundColor: "green", color: "white" }}>
                Proceed to Checkout
                <Icon name="arrow right" />
              </Button>
            </Link>
            <div className="column right aligned">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}
export default observer(ShoppingCart);
