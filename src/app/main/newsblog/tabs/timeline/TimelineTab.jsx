import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FuseLoading from '@fuse/core/FuseLoading';
import ActivityItem from './ActivityItem';
import PostItem from './PostItem';
import { useGetProfileTimelineQuery } from '../../ProfileApi';
import getPosts, { useGetSinglePost } from 'app/configs/data/server-calls/newsposts/useGetNews';
import { useParams } from 'react-router';

/**
 * The timeline tab.
 */
function TimelineTab() {

	const {data:newsQuery, isLoading:newsLoading} = getPosts();
	const { data: timeline, isLoading } = useGetProfileTimelineQuery();


	if (newsLoading) {
		return <FuseLoading />;
	}

	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};
	const item = {
		hidden: { opacity: 0, y: 40 },
		show: { opacity: 1, y: 0 }
	};
	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="w-full"
		>
			<div className="md:flex">
				<div className="flex flex-col w-full md:w-320 md:ltr:mr-32 md:rtl:ml-32">
					<Card
						component={motion.div}
						variants={item}
						className="flex flex-col w-full px-32 pt-24"
					>
						<div className="flex justify-between items-center pb-16">
							<Typography className="text-2xl font-semibold leading-tight">News Categories</Typography>
							
						</div>

						<CardContent className="p-0">
							<List className="p-0">
							
									<ActivityItem />
							
							</List>
						</CardContent>
					</Card>
				</div>

				<div className="flex flex-col flex-1">
					

					{newsQuery?.map((post) => (
						<motion.div
							variants={item}
							key={post.id}
						>
							<PostItem item={post} />
						</motion.div>
					 ))} 
				</div>
			</div>
		</motion.div>
	);
}

export default TimelineTab;
