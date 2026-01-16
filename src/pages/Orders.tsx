import React  from 'react';
import { Link } from 'react-router-dom';
import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from './Orders.module.scss';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { LoginRequiredMessage } from '../components/LoginRequiredMessage';

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


  if (!isLoggedIn) return null;

  if (isLoading) {
    return (
      <main className={layoutStyles.contentWrapper}>
        <div style={{ padding: '50px', textAlign: 'center' }}>
          Loading your orders...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={layoutStyles.contentWrapper}>
        <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
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
          <div
            style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}
          >
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
              You haven't placed any orders yet.
            </p>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: '#d4a574',
                border: '1px solid #d4a574',
                padding: '10px 20px',
                borderRadius: '4px',
              }}
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {orders.map((order: any) => {
              const totalItems =
                order.orderItems?.reduce(
                  (acc: number, item: any) => acc + item.quantity,
                  0,
                ) || 0;

              const dateObj = new Date(order.orderDate);
              const formattedDate = dateObj.toLocaleDateString('ro-RO');

              const isCompleted = order.status === 'Completed';
              const statusColor = isCompleted ? 'green' : 'orange';
              const statusText = isCompleted ? 'Completed' : 'Processing';

              return (
                <div key={order.id} className={styles.orderItem}>
                  <div className={styles.orderIcon}>
                    <img
                      src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200"
                      alt="Order Thumbnail"
                    />
                  </div>

                  <div className={styles.orderDetails}>
                    <h3 className={styles.orderTitle}>Order #{order.id}</h3>

                     <p className={`${styles.orderStatus}`}>
                      Delivery Status:{' '}
                      <span
                        className={styles.highlightText}
                        style={{ color: statusColor }}
                      >
                        {statusText}
                      </span>
                    </p>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: '#999',
                        marginTop: '5px',
                      }}
                    >
                      Placed on: {formattedDate}
                    </p>

                    {order.shippingAddress && (
                      <p style={{ fontSize: '0.8rem', color: '#999' }}>
                        Ship to: {order.shippingAddress.street},{' '}
                        {order.shippingAddress.city}
                      </p>
                    )}
                  </div>

                  <div className={styles.orderActionsGroup}>
                    <div className={styles.orderPrice}>
                      {order.totalAmount.toFixed(2)} $
                    </div>

                    {isCompleted ? (
                      <button
                        className={styles.orderEdit}
                        disabled
                        style={{
                          opacity: 0.5,
                          cursor: 'not-allowed',
                        }}
                      >
                        <span className={styles.editIcon}>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                            alt="Edit"
                            style={{ width: '100%', height: '100%' }}
                          />
                        </span>
                        Cannot Edit
                      </button>
                    ) : (
                     
                      <Link
                        to={`/orders/edit/${order.id}`}
                        className={styles.orderEdit}
                        style={{ textDecoration: 'none' }}
                      >
                        <span className={styles.editIcon}>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                            alt="Edit"
                            style={{ width: '100%', height: '100%' }}
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
