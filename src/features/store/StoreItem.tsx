import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "src/app/stores/store";
import { formatCurrency } from "src/utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

 function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { shoppingCartStore } = useStore();

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = shoppingCartStore;

  const quantity = getItemQuantity(id);

  const renderAddToCartButton = () => (
    <Button fluid color="green" onClick={() => increaseCartQuantity(id)}>
      Add to cart
    </Button>
  );

  const renderRemoveButton = () => (
    <Button
      fluid
      basic
      color="red"
      size="small"
      onClick={() => removeFromCart(id)}
    >
      Remove
    </Button>
  );

  const renderCartQuantity = () => (
    <div className="d-flex align-items-center justify-content-center">
      <Button icon="minus" onClick={() => decreaseCartQuantity(id)} />
      <span className="fs-3 mx-3">{quantity}</span>
      <Button icon="plus" onClick={() => increaseCartQuantity(id)} />
    </div>
  );

  return (
    <Card style={{ height: "100%" }}>
      <Image
        src={imgUrl}
        alt={`Image of ${name}`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">{formatCurrency(price)}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {quantity === 0 ? renderAddToCartButton() : renderCartQuantity()}
        {quantity !== 0 && renderRemoveButton()}
      </Card.Content>
    </Card>
  );
}
export default observer(StoreItem);
