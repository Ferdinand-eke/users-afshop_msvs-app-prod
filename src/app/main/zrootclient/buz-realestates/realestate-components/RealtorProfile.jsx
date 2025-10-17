import {
  Box,
  Paper,
  Avatar,
  Typography,
  Divider
} from '@mui/material';
import {
  BookmarkBorder,
  GroupOutlined,
  MailOutline,
  ArrowForward
} from '@mui/icons-material';

const RealtorProfile = ({ realtor }) => {

  // Default realtor data if not provided
  const realtorData = realtor || {
    name: 'Shirleys Home Idu',
    title: 'Property Listings',
    subtitle: 'Hotels & Apartments',
    location: 'Abuja, Federal Capital Territory',
    website: 'Africanshops',
    avatar: '',
    stats: {
      connections: 94,
      followers: '200.0k',
      following: '1.2k',
      profileViews: 156
    }
  };

  return (
    <Box
      className="relative"
      sx={{
        height: '50vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Paper
        className="overflow-hidden"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Banner */}
        <Box
          className="h-24 relative"
          sx={{
            background: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)'
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            src={realtorData.avatar}
            alt={realtorData.name}
            sx={{
              width: 80,
              height: 80,
              position: 'absolute',
              bottom: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              border: '4px solid white',
              bgcolor: '#9ca3af',
              fontSize: '2rem'
            }}
          >
            {realtorData.name.charAt(0)}
          </Avatar>
        </Box>

        {/* Profile Content */}
        <Box
          className="pb-4 px-4"
          sx={{
            marginTop: '50px', // Push content down to avoid avatar overlap
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: '#d1d5db',
              borderRadius: '3px'
            }

          }}
        >
          {/* Name and Title */}
          <Typography
            variant="h5"
            className="text-center font-semibold mb-1"
            sx={{ fontSize: '1.4rem' }}
          >
            {realtorData.name}
          </Typography>

          <Typography
            variant="body1"
            className="text-center text-gray-600 mb-1"
            sx={{ fontSize: '1rem' }}
          >
            {realtorData.title}
          </Typography>

          <Typography
            variant="body1"
            className="text-center text-gray-500 mb-1"
            sx={{ fontSize: '0.95rem' }}
          >
            {realtorData.subtitle}
          </Typography>

          <Typography
            variant="body1"
            className="text-center text-gray-500 mb-2"
            sx={{ fontSize: '0.9rem' }}
          >
            {realtorData.location}
          </Typography>

          <Typography
            variant="body1"
            className="text-center mb-3"
            sx={{
              color: '#ea580c',
              cursor: 'pointer',
              fontSize: '0.9rem',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {realtorData.website}
          </Typography>

          {/* View Analytics */}
          <Box
            className="flex items-center justify-between py-2 px-3 cursor-pointer rounded transition-colors mb-2"
            sx={{
              '&:hover': {
                background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)'
              }
            }}
          >
            <Typography
              variant="body1"
              className="text-gray-700"
              sx={{ fontSize: '0.95rem' }}
            >
              View all analytics
            </Typography>
            <ArrowForward sx={{ fontSize: 20, color: '#ea580c' }} />
          </Box>

          <Divider className="my-2" />

          {/* Connections Section */}
          <Box className="mb-2">
            <Typography
              variant="body1"
              className="font-semibold mb-3 px-2"
              sx={{ fontSize: '1.05rem' }}
            >
              Network Stats
            </Typography>

            {/* Stats Grid - 2x2 Layout */}
            <Box className="grid grid-cols-2 gap-3 mb-2">
              {/* Connections */}
              <Box className="rounded-lg p-3 text-center" sx={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)' }}>
                <Typography
                  variant="h5"
                  className="font-bold"
                  sx={{ color: '#ea580c', fontSize: '1.5rem' }}
                >
                  {realtorData.stats.connections}
                </Typography>
                <Typography
                  variant="body2"
                  className="mt-1"
                  sx={{ color: '#9a3412', fontSize: '0.85rem' }}
                >
                  Connections
                </Typography>
              </Box>

              {/* Profile Views */}
              <Box className="rounded-lg p-3 text-center" sx={{ background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)' }}>
                <Typography
                  variant="h5"
                  className="font-bold"
                  sx={{ color: '#7c2d12', fontSize: '1.5rem' }}
                >
                  {realtorData.stats.profileViews}
                </Typography>
                <Typography
                  variant="body2"
                  className="mt-1"
                  sx={{ color: '#7c2d12', fontSize: '0.85rem' }}
                >
                  Profile Views
                </Typography>
              </Box>

              {/* Followers */}
              <Box className="rounded-lg p-3 text-center" sx={{ background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)' }}>
                <Typography
                  variant="h5"
                  className="font-bold text-white"
                  sx={{ fontSize: '1.5rem' }}
                >
                  {realtorData.stats.followers}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-white mt-1"
                  sx={{ fontSize: '0.85rem' }}
                >
                  Followers
                </Typography>
              </Box>

              {/* Following */}
              <Box className="rounded-lg p-3 text-center" sx={{ background: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)' }}>
                <Typography
                  variant="h5"
                  className="font-bold"
                  sx={{ color: '#c2410c', fontSize: '1.5rem' }}
                >
                  {realtorData.stats.following}
                </Typography>
                <Typography
                  variant="body2"
                  className="mt-1"
                  sx={{ color: '#9a3412', fontSize: '0.85rem' }}
                >
                  Following
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider className="my-2" />

          {/* Menu Items */}
          <Box className="space-y-1">
            {/* Saved Items */}
            <Box
              className="flex items-center py-2 px-3 cursor-pointer rounded transition-colors"
              sx={{
                '&:hover': {
                  background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)'
                }
              }}
            >
              <BookmarkBorder sx={{ fontSize: 22, mr: 2, color: '#ea580c' }} />
              <Typography
                variant="body1"
                className="text-gray-700"
                sx={{ fontSize: '0.95rem' }}
              >
                Saved items
              </Typography>
            </Box>

            {/* Groups */}
            <Box
              className="flex items-center py-2 px-3 cursor-pointer rounded transition-colors"
              sx={{
                '&:hover': {
                  background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)'
                }
              }}
            >
              <GroupOutlined sx={{ fontSize: 22, mr: 2, color: '#ea580c' }} />
              <Typography
                variant="body1"
                className="text-gray-700"
                sx={{ fontSize: '0.95rem' }}
              >
                Groups
              </Typography>
            </Box>

            {/* Newsletters */}
            <Box
              className="flex items-center py-2 px-3 cursor-pointer rounded transition-colors"
              sx={{
                '&:hover': {
                  background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)'
                }
              }}
            >
              <MailOutline sx={{ fontSize: 22, mr: 2, color: '#ea580c' }} />
              <Typography
                variant="body1"
                className="text-gray-700"
                sx={{ fontSize: '0.95rem' }}
              >
                Newsletters
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RealtorProfile;
