import { useTimeout } from '@fuse/hooks';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';

/**
 * FuseLoading displays a loading state with an optional delay
 */
function FuseLoading(props) {
	const { delay = 0, className } = props;
	const [showLoading, setShowLoading] = useState(!delay);
	useTimeout(() => {
		setShowLoading(true);
	}, delay);
	return (
		<div
			className={clsx(
				className,
				'flex flex-1 h-full w-full self-center flex-col items-center justify-center p-24',
				!showLoading ? 'hidden' : ''
			)}
		>
			{/* <Typography
				className="-mb-16 text-13 font-medium sm:text-20"
				color="text.secondary"
			>
				Loading
			</Typography> */}
			<img
				className="mt-14 logo-icon opacity-70"
				src="assets/images/afslogo/afslogo.png"
				width={45}
				height={45}
				alt="logo"
			/>
			<Box
				id="spinner"
				sx={{
					'& > div': {
						// backgroundColor: 'palette.secondary.main'
						backgroundColor: '#EF6C00'
					}
				}}
			>
				<div className="bounce1 bg-orange-500" />
				<div className="bounce2 bg-orange-500" />
				<div className="bounce3 bg-orange-500" />
			</Box>
		</div>
	);
}

export default FuseLoading;
