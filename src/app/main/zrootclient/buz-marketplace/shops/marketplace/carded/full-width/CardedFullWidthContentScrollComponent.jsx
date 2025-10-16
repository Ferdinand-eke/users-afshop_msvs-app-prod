import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import DemoHeader from '../../shared-components/DemoHeaderProduct';
import DemoContent from '../../shared-components/DemoContentProduct';

const Root = styled(FusePageCarded)({
	'& .FusePageCarded-header': {},
	'& .FusePageCarded-toolbar': {},
	'& .FusePageCarded-content': {},
	'& .FusePageCarded-sidebarHeader': {},
	'& .FusePageCarded-sidebarContent': {}
});

/**
 * The CardedFullWidthContentScroll page.
 */
function CardedFullWidthContentScrollComponent() {
	return (
		<Root
			header={<DemoHeader />}
			content={<DemoContent />}
			scroll="content"
		/>
	);
}

export default CardedFullWidthContentScrollComponent;
