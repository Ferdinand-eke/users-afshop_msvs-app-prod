import { Button } from '@mui/material';
import { useAppSelector } from 'app/store/hooks';
import React from 'react'
import { selectUser } from 'src/app/auth/user/store/userSlice';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { darken } from '@mui/material/styles';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';

const UserAccountLeads = () => {


    const user = useAppSelector(selectUser);


    
  return (
    <aside className="w-full bg-white p-4 rounded-8 mb-8">
        <Button
				className="min-h-40 min-w-40 p-0 md:py-6 mb-8"
				color="inherit"
			>
				{user.data.photoURL ? (
					<Avatar
						sx={{
							background: (theme) => theme.palette.background.default,
							color: (theme) => theme.palette.text.secondary
						}}
						className="md:mx-4"
						alt="user photo"
						src={user.data.photoURL}
					/>
				) : (
					<Avatar
						sx={{
							background: (theme) => darken(theme.palette.background.default, 0.05),
							color: (theme) => theme.palette.text.secondary
						}}
						className="md:mx-4"
					>
						{user?.name ? user?.name?.[0] : user?.data?.displayName?.[0]}
					</Avatar>
				)}
				<div className="mx-4 hidden flex-col items-end md:flex">
					<Typography
						component="span"
						className="flex font-semibold"
					>
						{user.name ? user.name : user.data.displayName}
					</Typography>
					
				</div>

				
			</Button>
    <ul className="space-y-4">
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-user"></i>
        <Typography>My Africanshops Account</Typography>
      </li>
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-box"></i>
        <Typography
        component={NavLinkAdapter}
        to={`/marketplace/user/orders`}
        >Orders</Typography>
      </li>
    
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-box"></i>
        <Typography
          component={NavLinkAdapter}
          to={`/foodmarts/user/food-orders`}
        >Food Orders</Typography>
      </li>

      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-box"></i>
        <Typography
        component={NavLinkAdapter}
        to={`/bookings/my-reservations`}
        >Trips</Typography>
      </li>
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-envelope"></i>
        <span>Inbox</span>
      </li>
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-star"></i>
        <span>Pending Reviews</span>
      </li>
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-ticket-alt"></i>
        <span>Voucher</span>
      </li>
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-heart"></i>
        <span>Saved Items</span>
      </li>
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-store"></i>
        <span>Followed Sellers</span>
      </li>
      <li className="flex items-center space-x-2 p-2 rounded-md relative bg-white  hover:bg-orange-300 py-1 px-4 cursor-pointer">
        <i className="fas fa-clock"></i>
        <span>Recently Viewed</span>
      </li>
    </ul>
  
    <button className="mt-8 text-red-500">LOGOUT</button>
  </aside>
  )
}

export default UserAccountLeads