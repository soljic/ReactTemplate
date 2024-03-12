import { Button, Grid, Icon } from "semantic-ui-react";
import storeItems from "src/data/items.json";
import StoreItem from "./StoreItem";
import ShoppingCart from "./ShoppingCart";
import StoreComponent from "./StoreComponent";
import { useStore } from "src/app/stores/store";

export function Store() {
    const { shoppingCartStore } = useStore();

    const {
      closeCart,
      isOpen,
      cartItems
    } = shoppingCartStore;
  return (
    <>
      <h1>Store</h1>
      <StoreComponent />
      <Grid columns={3} stackable>
       
        {storeItems.map((item) => (
          <Grid.Column key={item.id}>
            <StoreItem {...item} />
          </Grid.Column>
        ))}
          <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button icon labelPosition='left' onClick={closeCart}>
              <Icon name='arrow left' />
              Continue Shopping
            </Button>
            <Button icon labelPosition='right' primary>
              Checkout
              <Icon name='arrow right' />
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
