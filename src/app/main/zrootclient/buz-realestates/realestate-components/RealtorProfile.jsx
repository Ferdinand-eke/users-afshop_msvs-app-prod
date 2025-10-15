import React from 'react';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Button,
  Divider,
  IconButton
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
        height: '100vh',
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
          className="h-32 relative"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            src={realtorData.avatar}
            alt={realtorData.name}
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              bottom: -50,
              left: '50%',
              transform: 'translateX(-50%)',
              border: '5px solid white',
              bgcolor: '#9ca3af',
              fontSize: '2.5rem'
            }}
          >
            {realtorData.name.charAt(0)}
          </Avatar>
        </Box>

        {/* Profile Content */}
        <Box
          className="pb-6 px-6"
          sx={{
            marginTop: '70px', // Push content down to avoid avatar overlap
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
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
            className="text-center font-semibold mb-2"
            sx={{ fontSize: '1.75rem' }}
          >
            {realtorData.name}
          </Typography>

          <Typography
            variant="body1"
            className="text-center text-gray-600 mb-2"
            sx={{ fontSize: '1.25rem' }}
          >
            {realtorData.title}
          </Typography>

          <Typography
            variant="body1"
            className="text-center text-gray-500 mb-2"
            sx={{ fontSize: '1.15rem' }}
          >
            {realtorData.subtitle}
          </Typography>

          <Typography
            variant="body1"
            className="text-center text-gray-500 mb-3"
            sx={{ fontSize: '1.1rem' }}
          >
            {realtorData.location}
          </Typography>

          <Typography
            variant="body1"
            className="text-center mb-5"
            sx={{
              color: '#1976d2',
              cursor: 'pointer',
              fontSize: '1.1rem',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {realtorData.website}
          </Typography>

          {/* View Analytics */}
          <Box
            className="flex items-center justify-between py-4 px-5 cursor-pointer hover:bg-gray-50 rounded transition-colors mb-3"
          >
            <Typography
              variant="body1"
              className="text-gray-700"
              sx={{ fontSize: '1.15rem' }}
            >
              View all analytics
            </Typography>
            <ArrowForward sx={{ fontSize: 24, color: '#9ca3af' }} />
          </Box>

          <Divider className="my-4" />

          {/* Connections Section */}
          <Box className="mb-4">
            <Box className="flex items-center justify-between mb-3 px-3">
              <Box>
                <Typography
                  variant="body1"
                  className="font-semibold"
                  sx={{ fontSize: '1.25rem' }}
                >
                  Connections
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-500"
                  sx={{ fontSize: '1.05rem' }}
                >
                  Grow your network
                </Typography>
              </Box>
              <Typography
                variant="h5"
                className="font-semibold"
                sx={{ fontSize: '1.9rem' }}
              >
                {realtorData.stats.connections}
              </Typography>
            </Box>

            {/* Stats Row */}
            <Box className="flex items-center justify-around mb-4 py-3">
              <Box className="text-center">
                <Typography
                  variant="h6"
                  className="font-semibold"
                  sx={{ fontSize: '1.5rem' }}
                >
                  {realtorData.stats.followers}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-500"
                  sx={{ fontSize: '1.05rem' }}
                >
                  Followers
                </Typography>
              </Box>
              <Box className="text-center">
                <Typography
                  variant="h6"
                  className="font-semibold"
                  sx={{ fontSize: '1.5rem' }}
                >
                  {realtorData.stats.following}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-500"
                  sx={{ fontSize: '1.05rem' }}
                >
                  Following
                </Typography>
              </Box>
            </Box>

            {/* Profile Views */}
            <Box className="flex items-center justify-between py-3 px-3">
              <Typography
                variant="body1"
                className="text-gray-700"
                sx={{ fontSize: '1.15rem' }}
              >
                Profile views
              </Typography>
              <Typography
                variant="h6"
                className="font-semibold"
                sx={{ color: '#1976d2', fontSize: '1.5rem' }}
              >
                {realtorData.stats.profileViews}
              </Typography>
            </Box>
          </Box>

          <Divider className="my-4" />

          {/* Menu Items */}
          <Box className="space-y-2">
            {/* Saved Items */}
            <Box
              className="flex items-center py-4 px-5 cursor-pointer hover:bg-gray-50 rounded transition-colors"
            >
              <BookmarkBorder sx={{ fontSize: 28, mr: 3, color: '#6b7280' }} />
              <Typography
                variant="body1"
                className="text-gray-700"
                sx={{ fontSize: '1.15rem' }}
              >
                Saved items
              </Typography>
            </Box>

            {/* Groups */}
            <Box
              className="flex items-center py-4 px-5 cursor-pointer hover:bg-gray-50 rounded transition-colors"
            >
              <GroupOutlined sx={{ fontSize: 28, mr: 3, color: '#6b7280' }} />
              <Typography
                variant="body1"
                className="text-gray-700"
                sx={{ fontSize: '1.15rem' }}
              >
                Groups
              </Typography>
            </Box>

            {/* Newsletters */}
            <Box
              className="flex items-center py-4 px-5 cursor-pointer hover:bg-gray-50 rounded transition-colors"
            >
              <MailOutline sx={{ fontSize: 28, mr: 3, color: '#6b7280' }} />
              <Typography
                variant="body1"
                className="text-gray-700"
                sx={{ fontSize: '1.15rem' }}
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
