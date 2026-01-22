import FuseNavigation from '@fuse/core/FuseNavigation/FuseNavigation';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import SettingsAppNavigation from './SettingsAppNavigation';

const Root = styled('div')(({ theme }) => ({
	background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)',
	'&  .navigation': {
		padding: '8px 16px',
		borderTop: `1px solid rgba(234, 88, 12, 0.08)`
	},
	'&  .fuse-list-item': {
		padding: '20px 24px',
		margin: '8px 0',
		borderRadius: '16px',
		alignItems: 'start',
		border: '2px solid rgba(229, 231, 235, 0.8)',
		backgroundColor: '#ffffff',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		'&:hover': {
			transform: 'translateX(4px)',
			boxShadow: '0 4px 12px rgba(234, 88, 12, 0.12)',
			borderColor: 'rgba(234, 88, 12, 0.2)',
		},
		'&.active': {
			backgroundColor: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(234, 88, 12, 0.05) 100%)',
			border: '2px solid rgba(234, 88, 12, 0.3)',
			boxShadow: '0 4px 16px rgba(234, 88, 12, 0.15)',
			'&  .fuse-list-item-icon': {
				color: '#f97316 !important',
				transform: 'scale(1.1)',
			},
			'&  .fuse-list-item-text-primary': {
				color: '#ea580c !important',
				fontWeight: '700'
			},
			'&  .fuse-list-item-text-secondary': {
				color: '#6b7280 !important',
			}
		}
	},
	'&  .fuse-list-item-icon': {
		width: '48px',
		height: '48px',
		borderRadius: '12px',
		backgroundColor: '#f9fafb',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'all 0.3s ease',
		marginRight: '4px',
		'& svg': {
			fontSize: '24px'
		}
	},
	'&  .fuse-list-item.active .fuse-list-item-icon': {
		background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
		boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
		'& svg': {
			color: '#ffffff !important'
		}
	},
	'&  .fuse-list-item-text-primary': {
		fontSize: '15px',
		fontWeight: '600',
		color: '#1f2937',
		marginBottom: '4px'
	},
	'&  .fuse-list-item-text-secondary': {
		fontSize: '13px',
		whiteSpace: 'normal',
		fontWeight: '400',
		color: '#6b7280',
		lineHeight: '1.5'
	}
}));

function SettingsAppSidebarContent(props) {
	const { className, onSetSidebarOpen } = props;
	return (
		<Root>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className={clsx('m-32 mr-24 flex items-center justify-between sm:my-40', className)}
			>
				<div className="flex items-center gap-3">
					<div
						className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
						style={{
							background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
							boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)'
						}}
					>
						<FuseSvgIcon className="text-white" size={24}>
							heroicons-solid:cog
						</FuseSvgIcon>
					</div>
					<div>
						<Typography className="text-3xl font-extrabold leading-none tracking-tight text-gray-900">
							Settings
						</Typography>
						<Typography className="text-xs text-gray-600 mt-1">
							Manage your preferences
						</Typography>
					</div>
				</div>
				<Hidden lgUp>
					<IconButton
						onClick={() => onSetSidebarOpen(false)}
						aria-label="close left sidebar"
						size="small"
						sx={{
							'&:hover': {
								backgroundColor: 'rgba(234, 88, 12, 0.08)',
							}
						}}
					>
						<FuseSvgIcon className="text-gray-700">heroicons-outline:x</FuseSvgIcon>
					</IconButton>
				</Hidden>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.2 }}
			>
				<FuseNavigation navigation={SettingsAppNavigation.children} />
			</motion.div>

		</Root>
	);
}

export default SettingsAppSidebarContent;
