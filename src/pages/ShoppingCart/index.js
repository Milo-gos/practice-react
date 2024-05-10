import { useQuery } from '@tanstack/react-query';
import fetchProducts from './mock-api/product';
import './index.scss';
import { useEffect, useMemo } from 'react';
import { z } from 'zod';
import useStoreUser from '../../store/store-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const isVietnamesePhoneNumber = (number) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
};
const schema = z.object({
    name: z.string().nonempty('This is a required field'),
    age: z.coerce
        .number({
            message: 'Age must be a number',
        })
        .min(1),
    email: z
        .string()
        .nonempty('This is a required field')
        .email('Email must be a valid email address'),
    phoneNumber: z
        .string()
        .nonempty('This is a required field')
        .refine((number) => isVietnamesePhoneNumber(number), {
            message: 'This is not Vietnamese phone number',
        }),
});
function ShoppingCartPage() {
    const {
        user,
        addToCart,
        deleteCart,
        decreaseCart,
        increaseCart,
        updateInfoUser,
        resetUser,
    } = useStoreUser();
    const { isLoading, data } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
    const totalPrice = useMemo(() => {
        let res = user.carts.reduce((acc, cur) => {
            return acc + cur.quantity * cur.price;
        }, 0);
        if (user.carts.length > 3) res *= 0.9;
        return res;
    }, [user.carts]);

    const handleClickIncrease = (productId) => {
        increaseCart(productId);
    };
    const handleClickDecrease = (productId) => {
        decreaseCart(productId);
    };
    const handleClickRemove = (productId) => {
        deleteCart(productId);
    };
    const handleClickAdd = (product) => {
        const cart = {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        };
        addToCart(cart);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        shouldFocusError: true,
    });
    const onSubmit = (userInfo) => {
        updateInfoUser({
            ...userInfo,
            price: Math.round(totalPrice * 100) / 100,
        });
    };
    const handleClickReset = () => {
        resetUser();
        reset((formValues) => {
            Object.keys(formValues).forEach((key) => {
                formValues[key] = '';
            });
            return formValues;
        });
    };
    return (
        <div className="container-shopping-cart">
            <div className="left-side">
                <h1>Coffee shop</h1>
                {isLoading && <h3>...Loading</h3>}
                <div className="list-products">
                    {data &&
                        data.map((product) => {
                            return (
                                <div
                                    className="card-product"
                                    key={product.id}
                                >
                                    <p>{`${product.name} (price:${product.price.toFixed(2)})`}</p>
                                    <div className="img-wrapper">
                                        <img src={product.image} />
                                    </div>
                                    <button
                                        disabled={user.carts.some(
                                            (cart) =>
                                                cart.productId === product.id
                                        )}
                                        onClick={() => handleClickAdd(product)}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="right-side">
                <div className="cart">
                    <h3>Shopping cart</h3>
                    <p>{`You have ${user.carts.length} products in your cart`}</p>

                    <table>
                        <thead>
                            <tr>
                                <th className="th-product">Product</th>
                                <th className="th-quantity">Quantity</th>
                                <th className="th-price">Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.carts.map((cart) => {
                                return (
                                    <tr key={cart.productId}>
                                        <td>{`${cart.name} ($${cart.price})`}</td>
                                        <td>{cart.quantity}</td>
                                        <td>
                                            $
                                            {(
                                                cart.quantity * cart.price
                                            ).toFixed(2)}
                                        </td>
                                        <td className="td-action">
                                            <button
                                                onClick={() =>
                                                    handleClickIncrease(
                                                        cart.productId
                                                    )
                                                }
                                            >
                                                increase
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleClickDecrease(
                                                        cart.productId
                                                    )
                                                }
                                            >
                                                decrease
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleClickRemove(
                                                        cart.productId
                                                    )
                                                }
                                            >
                                                remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <p>
                        Total price: ${totalPrice.toFixed(2)}{' '}
                        {user.carts.length > 3 && ' (-10%)'}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '100%',
                        marginTop: '32px',
                    }}
                >
                    <input
                        {...register('name')}
                        placeholder="name"
                        style={{ padding: '4px 8px', fontSize: '16px' }}
                    />
                    {errors.name && (
                        <p style={{ color: 'red', marginTop: '4px' }}>
                            {errors.name.message}
                        </p>
                    )}
                    <input
                        {...register('age')}
                        placeholder="age"
                        style={{
                            padding: '4px 8px',
                            fontSize: '16px',
                            marginTop: '16px',
                        }}
                    />
                    {errors.age && (
                        <p style={{ color: 'red', marginTop: '4px' }}>
                            {errors.age.message}
                        </p>
                    )}
                    <input
                        {...register('email')}
                        placeholder="email"
                        style={{
                            padding: '4px 8px',
                            fontSize: '16px',
                            marginTop: '16px',
                        }}
                    />
                    {errors.email && (
                        <p style={{ color: 'red', marginTop: '4px' }}>
                            {errors.email.message}
                        </p>
                    )}

                    <input
                        {...register('phoneNumber')}
                        placeholder="phone number"
                        style={{
                            padding: '4px 8px',
                            fontSize: '16px',
                            marginTop: '16px',
                        }}
                    />
                    {errors.phoneNumber && (
                        <p style={{ color: 'red', marginTop: '4px' }}>
                            {errors.phoneNumber.message}{' '}
                        </p>
                    )}

                    <input
                        type="submit"
                        style={{
                            padding: '2px 4px',
                            fontSize: '16px',
                            marginTop: '16px',
                        }}
                    />
                </form>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={handleClickReset}
                        style={{
                            padding: '4px 8px',
                            fontSize: '16px',
                            marginTop: '16px',
                        }}
                    >
                        Reset All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCartPage;
