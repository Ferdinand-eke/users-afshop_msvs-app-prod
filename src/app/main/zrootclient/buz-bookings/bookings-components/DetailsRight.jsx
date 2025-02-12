import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { lazy, useMemo, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { ListingReservation } from './reservationreview'
import { Link } from 'react-router-dom'
import { formatCurrency } from 'src/app/main/vendors-shop/pos/PosUtils'
// import { UilHeart, UilShareAlt, UilShoppingBag } from '@iconscout/react-unicons'





const DetailsRight = React.memo(
    
    ({
        listing,
        locationValue,
        coordinates,
        price,
        totalPrice,
        onChangeDate,
        dateRange,
        onSubmit,
        disabled,
        disabledDates,
    }) => {
        const Map = useMemo(
            () => lazy(() => import('../bookings-components/map')),
            [locationValue]
        )

        // const dispatch = useDispatch()
        const [state, setState] = useState({
            quantity: 1,
        })

        // const { name, rate, price, oldPrice, description, category, brand, popular, id } = listing;
        const { quantity } = state

        // const incrementQuantity = (e) => {
        //     e.preventDefault()
        //     setState({
        //         ...state,
        //         quantity: quantity + 1,
        //     })
        // }

        
        // const decrementQuantity = (e) => {
        //     e.preventDefault()
        //     if (quantity !== 1)
        //         setState({
        //             ...state,
        //             quantity: quantity - 1,
        //         })
        // }

        return (
            <div>
                <Box>
                    <Paper className="lg:mb-5">
                        <Typography
                            className="mx-8 mb-[10px] text-dark dark:text-white/[.87] text-xl lg:text-[16px] sm:text-2xl font-semibold"
                       
                        >
                            {listing?.title}
                        </Typography>
                       
                    </Paper>



                   
                        {/* date picker here */}
                        <ListingReservation
                            price={price}
                            totalPrice={totalPrice}
                            onChangeDate={onChangeDate}
                            dateRange={dateRange}
                            onSubmit={onSubmit}
                            disabled={disabled}
                            disabledDates={disabledDates}
                        />
                    

                </Box>

             

                {coordinates && <Map center={coordinates} />}
            </div>

        )
    }
)

export default DetailsRight