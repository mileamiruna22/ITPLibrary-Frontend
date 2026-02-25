import React from 'react';
import { Link } from 'react-router-dom';
import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from './Orders.module.scss';
import { useAuth } from '../contexts/AuthProvider';
import { useOrders } from '../hooks/useOrders';
import { LoginRequiredMessage } from '../components/LoginRequiredMessage';
import type { OrderDto } from '../api/dtos/OrderDTO';

export const Orders: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { orders, isLoading, error } = useOrders();

  if (!isLoggedIn) {
    return (
      <LoginRequiredMessage
        title="Please log in first"
        message="You need to be logged in to view your orders."
        buttonText="Go to Login"
      />
    );
  }

  if (isLoading) {
    return (
      <main className={layoutStyles.contentWrapper}>
        <div className={styles.stateMessage}>Loading your orders...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={layoutStyles.contentWrapper}>
        <div className={`${styles.stateMessage} ${styles.stateMessageError}`}>
          Error loading orders. Please try again later.
        </div>
      </main>
    );
  }

  return (
    <main className={layoutStyles.contentWrapper}>
      <section className={styles.ordersSection}>
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <div className={styles.emptyOrders}>
            <p>You haven't placed any orders yet.</p>
            <Link to="/" className={styles.startShoppingLink}>
              Start shopping
            </Link>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {[...orders].sort((a: OrderDto, b: OrderDto) => a.id - b.id).map((order: OrderDto) => {
              const formattedDate = new Date(order.orderDate).toLocaleDateString('ro-RO');
              const isCompleted = order.status === 'Completed';

              return (
                <div key={order.id} className={styles.orderItem}>
                  <div className={styles.orderIcon}>
                    <img src="../public/orders.jpg" alt="Order Thumbnail" />
                  </div>

                  <div className={styles.orderDetails}>
                    <h3 className={styles.orderTitle}>Order #{order.id}</h3>
                    <p className={styles.orderStatus}>
                      Delivery Status:{' '}
                      <span className={isCompleted ? styles.statusCompleted : styles.statusPending}>
                        {isCompleted ? 'Completed' : 'Processing'}
                      </span>
                    </p>
                    <p className={styles.orderMeta}>Placed on: {formattedDate}</p>
                    {order.shippingAddress && (
                      <p className={styles.orderMeta}>
                        Ship to: {order.shippingAddress.street}, {order.shippingAddress.city}
                      </p>
                    )}
                  </div>

                  <div className={styles.orderActionsGroup}>
                    <div className={styles.orderPrice}>
                      {order.totalAmount.toFixed(2)} $
                    </div>

                    {isCompleted ? (
                      <button className={`${styles.orderEdit} ${styles.orderEditDisabled}`} disabled>
                        <span className={styles.editIcon}>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                            alt="Edit"
                          />
                        </span>
                        Cannot Edit
                      </button>
                    ) : (
                      <Link to={`/orders/edit/${order.id}`} className={styles.orderEdit}>
                        <span className={styles.editIcon}>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                            alt="Edit"
                          />
                        </span>
                        Edit Order
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};