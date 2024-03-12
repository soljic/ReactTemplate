import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import { useStore } from 'src/app/stores/store';
import { observer } from 'mobx-react-lite';
import { formatCurrency } from 'src/utilities/formatCurrency';
import storeItems from "src/data/items.json";

function Checkout() {
  const { shoppingCartStore } = useStore();
  const { cartItems, clearCart, getTotalPrice } = shoppingCartStore;

  const navigate = useNavigate ();

  const [totalPrice, setTotalPrice] = useState(0);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleCustomerInfoChange = (e: { target: { name: any; value: any; }; }) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice());
    
  }, [getTotalPrice]);

  const handleSubmit = () => {
    // send customerInfo and cartItems to backend
    // clear the cart
    clearCart();
    // navigate to confirmation page
    navigate('/confirmation');
  };

  return (
    <>
      <Header as="h1" icon textAlign="center" style={{ marginTop: '2rem' }}>
        <Icon name="cart" circular />
        <Header.Content>Checkout</Header.Content>
      </Header>
      <Form onSubmit={handleSubmit} style={{ margin: '2rem' }}>
        <Form.Field>
          <label>Name</label>
          <input name="name" value={customerInfo.name} onChange={handleCustomerInfoChange} />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input name="email" type="email" value={customerInfo.email} onChange={handleCustomerInfoChange} />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input name="address" value={customerInfo.address} onChange={handleCustomerInfoChange} />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <input name="phone" value={customerInfo.phone} onChange={handleCustomerInfoChange} />
        </Form.Field>
        <div className="ui divider" />
        <div className="ui grid">
          <div className="row">
            <Button style={{ backgroundColor: 'green', color: 'white' }} type="submit">
              Proceed to Checkout
              <Icon name="arrow right" />
            </Button>
            <div className="column right aligned">
              Total   {formatCurrency(
                totalPrice
              )}
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default observer(Checkout);
