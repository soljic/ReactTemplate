import { Sidebar, Segment, Header, Button, Icon, Grid } from 'semantic-ui-react'
import { formatCurrency } from 'src/utilities/formatCurrency'
import StoreItem  from './StoreItem'
import storeItems from 'src/data/items.json'
import { observer } from 'mobx-react-lite'
import { useStore } from 'src/app/stores/store'
import { Link } from 'react-router-dom'

type ShoppingCartProps = {
  isOpen: boolean
}

 function StoreComponent() {
  const { shoppingCartStore } = useStore();

  const {
    closeCart,
    isOpen,
    cartItems
  } = shoppingCartStore;

  return (
    <Sidebar as={Segment} animation='overlay' direction='right' visible={isOpen} onHide={closeCart}>
      <Header as='h3'>Cart</Header>
      <Grid columns={1}>
        {cartItems.map((item) => (
          <StoreItem name={''} imgUrl={''} key={item.id} {...item} />
        ))}
        <Grid.Row>
          <Grid.Column textAlign='right'>
            <div className="fw-bold fs-5">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i: { id: number }) => i.id === cartItem.id)
                  return total + (item?.price || 0) * cartItem.quantity
                }, 0)
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button icon labelPosition='left' onClick={closeCart}>
              <Icon name='arrow left' />
              Continue Shopping
            </Button>
            <Link to="/checkout">
            <Button icon labelPosition='right' primary>
              Checkout
              <Icon name='arrow right' />
            </Button>
            </Link>
           
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Sidebar>
  )
}

export default observer(StoreComponent)
