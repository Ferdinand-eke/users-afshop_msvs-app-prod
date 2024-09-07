import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * The notification panel toggle button.
 */
function LinkPanelButton(props) {
	
	return (
		<Button
			// className="h-10 w-40 mx-2"
			component={Link}
			to="/news-blog"
			className="min-h-40 min-w-40 p-0 md:px-8 md:py-6"
			
			// onClick={() => dispatch(toggleNotificationPanel())}
			size="small"
		>
			<Badge
				color="secondary"
				// variant="dot"
				// invisible={notifications?.length === 0}
				className="align-center h-10 w-40 mx-2"
			>
				{/* <motion.div animate={controls}>{children}</motion.div> */}
				Blog
			</Badge>
		  </Button>
	);
}

export default LinkPanelButton;
