import React from 'react';
import { Button } from '../components';
import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from './ShoppingCart.module.scss';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { LoginRequiredMessage } from '../components/LoginRequiredMessage';

export const ShoppingCart: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { cartItems, removeFromCart, totalPrice } = useCart();

  if (!isLoggedIn) {
    return (
       <LoginRequiredMessage
        title="Please log in first"
        message="You need to be logged in to view your shopping cart and place orders."
        buttonText="Go to Login"
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className={layoutStyles.contentWrapper}>
        <section className={styles.cartSection}>
          <h2>Shopping Cart</h2>
          <div className={styles.emptyCart}>
            <p>
              Your cart is currently empty.
            </p>
            <Button
              to="/"
              variant="outline"
            >
              Start Shopping
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={layoutStyles.contentWrapper}>
      <section className={styles.cartSection}>
        <h2>Shopping Cart</h2>

        <div>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img
                src={item.imageSrc}
                alt={item.title}
                className={styles.cartItemImage}
              />

              <div className={styles.cartItemDetails}>
                <h3 className={styles.cartItemTitle}>{item.title}</h3>
                <p className={styles.detailAuthor}>
                  by <span className={styles.authorName}>{item.author}</span>
                </p>

                {item.quantity > 1 && (
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginTop: '5px',
                    }}
                  >
                    Qty: {item.quantity}
                  </p>
                )}
              </div>

              <div className={styles.cartItemActionsGroup}>
                <div className={styles.cartItemPrice}>
                  {(item.price * item.quantity).toFixed(2)} $
                </div>

                <button
                    className={styles.cartItemRemove}
                    onClick={() => removeFromCart(item.id)} 
                  >
                    <span>🗑️</span> Remove
                  </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cartSummary}>
          <div className={styles.cartTotal}>
            <span>Total:</span>
            <span className={styles.totalPrice}>{totalPrice.toFixed(2)} $</span>
          </div>

          <div className={styles.cartActions}>
            <Button
              to="/"
              variant="outline"
            >
              Continue Shopping
            </Button>
            <Button to="/orders-details" variant="primary">
              Place Order
            </Button>
       
          </div>
        </div>
      </section>
    </main>
  );
};
