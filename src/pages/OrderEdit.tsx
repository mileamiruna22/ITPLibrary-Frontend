import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrderByIdApi, updateOrderDetailsApi } from '../api/orderApi';
import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from './OrderEdit.module.scss';
import { Button } from '../components';

export const OrderEdit: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderByIdApi(Number(orderId)),
    enabled: !!orderId,
  });


  useEffect(() => {
    if (order) {
      setStreet(order.shippingAddress?.street || '');
      setCity(order.shippingAddress?.city || '');
      setState(order.shippingAddress?.state || '');
      setPostalCode(order.shippingAddress?.postalCode || '');
      setCountry(order.shippingAddress?.country || '');
    }
  }, [order]);


  const updateMutation = useMutation({
    mutationFn: () =>
      updateOrderDetailsApi(Number(orderId), {
        street,
        city,
        state,
        postalCode,
        country,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      alert('Order updated successfully!');
      navigate('/orders');
    },
    onError: (error: any) => {
      alert(`Failed to update order: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (order?.status === 'Completed') {
      alert('Cannot edit completed orders!');
      return;
    }

    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <main className={layoutStyles.contentWrapper}>
        <div style={{ padding: '50px', textAlign: 'center' }}>
          Loading order details...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={layoutStyles.contentWrapper}>
        <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
          Error loading order. Please try again.
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className={layoutStyles.contentWrapper}>
        <div style={{ padding: '50px', textAlign: 'center' }}>
          Order not found.
        </div>
      </main>
    );
  }

  return (
    <main className={layoutStyles.contentWrapper}>
      <section className={styles.editSection}>
        <div className={styles.header}>
          <h2>Edit Order #{order.id}</h2>
          <span
            className={styles.status}
            style={{
              color: order.status === 'Completed' ? 'green' : 'orange',
            }}
          >
            Status: {order.status}
          </span>
        </div>


        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h3>Shipping Address</h3>

            <div className={styles.formGroup}>
              <label htmlFor="street">Street Address</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Order Items</h3>
            <div className={styles.itemsList}>
              {order.orderItems?.map((item: any, index: number) => (
                <div key={index} className={styles.item}>
                  <span>{item.title}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>${item.pricePerUnit}</span>
                </div>
              ))}
            </div>
            <div className={styles.total}>
              <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/orders')}
            >
              Cancel
            </Button>

   
              <Button
                type="submit"
                variant="primary"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
 
          </div>
        </form>
      </section>
    </main>
  );
};