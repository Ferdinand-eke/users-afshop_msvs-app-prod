import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Close,
  MoreVert,
  Search,
  Send,
  AttachFile,
  EmojiEmotionsOutlined,
  KeyboardArrowDown,
  Edit,
  ArrowBack
} from '@mui/icons-material';

const GlobalChat = ({ isOpen, onToggle, realtorName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Initialize state from localStorage
  const [expanded, setExpanded] = useState(() => {
    const saved = localStorage.getItem('chatExpanded');
    return saved ? JSON.parse(saved) : false;
  });

  const [selectedConversation, setSelectedConversation] = useState(() => {
    const saved = localStorage.getItem('selectedConversation');
    return saved ? JSON.parse(saved) : null;
  });

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: 'i dey here ooh. how your side na. i don find your number tire',
      sender: 'other',
      time: '5:44 PM',
      date: 'SATURDAY'
    },
    {
      id: 2,
      text: '😂😂😂',
      sender: 'user',
      time: '5:44 PM'
    },
    {
      id: 3,
      text: '08060196460',
      sender: 'user',
      time: '5:44 PM'
    },
    {
      id: 4,
      text: 'ok got it. i go inbox you now',
      sender: 'other',
      time: '6:25 PM'
    }
  ]);

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      name: 'Ferdinand Eke',
      message: 'My name is Krist...',
      avatar: '',
      online: true,
      unread: false
    },
    {
      id: 2,
      name: 'Olivia Aw JiaYi',
      message: 'You: Happy belated birthday',
      date: 'Sep 5, 2023',
      avatar: '',
      online: false,
      unread: false
    },
    {
      id: 3,
      name: 'David Asamonye',
      message: 'David: hello good morning, I m looking to build my...',
      date: 'Dec 26, 2023',
      avatar: '',
      online: true,
      unread: false
    },
    {
      id: 4,
      name: 'Raju Soolanayak...',
      message: 'You: Congrats on your work anniversary',
      date: 'Nov 30, 2023',
      avatar: '',
      online: true,
      unread: false
    },
    {
      id: 5,
      name: 'Elena Bogevska',
      message: 'Elena: Hello Eke, Thanks for the feedback. Feel free to reac...',
      date: 'Oct 1',
      avatar: '',
      online: false,
      unread: false
    },
    {
      id: 6,
      name: 'Peter Dixon',
      message: 'You: Sure, I will',
      date: 'Sep 7, 2023',
      avatar: '',
      online: true,
      unread: false
    }
  ];

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('chatExpanded', JSON.stringify(expanded));
  }, [expanded]);

  useEffect(() => {
    localStorage.setItem('selectedConversation', JSON.stringify(selectedConversation));
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {
      setChatMessages([...chatMessages, {
        id: chatMessages.length + 1,
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!expanded) {
      onToggle();
    }
  };

  const handleClose = () => {
    setExpanded(false);
    setSelectedConversation(null);
    onToggle();
  };

  return (
    <>
      {/* Minimized Chat Button - LinkedIn Style */}
      {!expanded && (
        <Paper
          onClick={toggleExpand}
          elevation={3}
          sx={{
            position: 'fixed !important',
            bottom: '0 !important',
            right: { xs: '8px', sm: '16px' },
            width: { xs: '100%', sm: 280 },
            maxWidth: { xs: 'calc(100% - 16px)', sm: 280 },
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0',
            bgcolor: 'white',
            border: '1px solid #e5e7eb',
            borderBottom: 'none',
            transition: 'all 0.3s ease',
            zIndex: '2147483647 !important',
            '&:hover': {
              boxShadow: 4
            }
          }}
        >
          <Box className="flex items-center">
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: 1.5,
                bgcolor: '#0a66c2',
                fontSize: '0.95rem'
              }}
            >
              M
            </Avatar>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                color: '#000'
              }}
            >
              Messaging
            </Typography>
          </Box>
          <Box className="flex items-center">
            <IconButton size="small" sx={{ mr: 0.5 }}>
              <MoreVert sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton size="small">
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
            >
              <KeyboardArrowDown sx={{ fontSize: 20, transform: 'rotate(180deg)' }} />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Mobile Close Button - Always visible on top */}
      {expanded && isMobile && (
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'fixed !important',
            top: 8,
            right: 8,
            zIndex: '2147483648 !important',
            bgcolor: 'white',
            boxShadow: 2,
            '&:hover': {
              bgcolor: '#f3f4f6'
            }
          }}
        >
          <Close sx={{ fontSize: 28, color: '#111827' }} />
        </IconButton>
      )}

      {/* Expanded Chat Window */}
      <Collapse
        in={expanded}
        timeout={300}
        sx={{
          zIndex: '2147483647 !important',
          position: 'fixed !important'
        }}
      >
        <Paper
          elevation={24}
          sx={{
            position: 'fixed !important',
            top: { xs: 0, md: 'auto' },
            bottom: { xs: 'auto', md: '0 !important' },
            right: { xs: 0, sm: '8px', md: '16px' },
            left: { xs: 0, md: 'auto' },
            width: {
              xs: '100%',
              sm: 'calc(100% - 16px)',
              md: selectedConversation ? (isTablet ? 600 : 800) : 360
            },
            maxWidth: { xs: '100%', md: selectedConversation ? 800 : 360 },
            height: { xs: '100vh', sm: '80vh', md: 600 },
            display: 'flex',
            borderRadius: { xs: 0, md: '8px 8px 0 0' },
            overflow: 'hidden',
            zIndex: '2147483647 !important',
            transition: 'width 0.3s ease'
          }}
        >
          {/* Left Side - Conversation View */}
          {selectedConversation && (
            <Box
              sx={{
                width: {
                  xs: '100%',
                  md: isTablet ? 300 : 440
                },
                display: isMobile && !selectedConversation ? 'none' : 'flex',
                flexDirection: 'column',
                bgcolor: 'white',
                borderRight: { xs: 'none', md: '1px solid #e5e7eb' },
                zIndex: '2147483647 !important',
                position: 'relative'
              }}
            >
              {/* Conversation Header */}
              <Box
                sx={{
                  p: { xs: 1.5, md: 2 },
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  bgcolor: 'white'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <IconButton
                    size="small"
                    onClick={handleBackToList}
                    sx={{
                      mr: 1,
                      display: { xs: 'inline-flex', md: 'none' },
                      color: '#111827',
                      '&:hover': {
                        bgcolor: '#f3f4f6'
                      }
                    }}
                  >
                    <ArrowBack sx={{ fontSize: 24 }} />
                  </IconButton>
                  <Avatar
                    src={selectedConversation.avatar}
                    sx={{
                      width: { xs: 36, md: 40 },
                      height: { xs: 36, md: 40 },
                      mr: 1.5,
                      bgcolor: '#9ca3af',
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                  >
                    {selectedConversation.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                        color: '#111827',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {selectedConversation.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: { xs: '0.75rem', md: '0.8rem' },
                        color: selectedConversation.online ? '#10b981' : '#6b7280'
                      }}
                    >
                      {selectedConversation.online ? 'Available on mobile' : 'Offline'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <IconButton
                    size="small"
                    sx={{
                      mr: 0.5,
                      display: { xs: 'none', md: 'inline-flex' }
                    }}
                  >
                    <MoreVert sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={handleClose}
                    sx={{
                      display: { xs: 'inline-flex', md: 'none' },
                      color: '#111827',
                      '&:hover': {
                        bgcolor: '#f3f4f6'
                      }
                    }}
                  >
                    <Close sx={{ fontSize: 24 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setSelectedConversation(null)}
                    sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                  >
                    <Close sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              </Box>

              {/* Messages Area */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 3,
                  bgcolor: '#ffffff',
                  '&::-webkit-scrollbar': {
                    width: '6px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    bgcolor: '#d1d5db',
                    borderRadius: '3px'
                  }
                }}
              >
                {/* Date Divider */}
                {chatMessages.some(msg => msg.date) && (
                  <Box className="flex items-center justify-center mb-4">
                    <Divider sx={{ flex: 1 }} />
                    <Typography
                      variant="caption"
                      sx={{
                        mx: 2,
                        color: '#6b7280',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      SATURDAY
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                  </Box>
                )}

                {/* Messages */}
                {chatMessages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                      alignItems: 'flex-start'
                    }}
                  >
                    {msg.sender === 'other' && (
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 1,
                          bgcolor: '#9ca3af',
                          fontSize: '0.85rem'
                        }}
                      >
                        {selectedConversation.name.charAt(0)}
                      </Avatar>
                    )}
                    <Box
                      sx={{
                        maxWidth: '70%'
                      }}
                    >
                      {msg.sender === 'other' && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            ml: 0.5,
                            mb: 0.5,
                            display: 'block'
                          }}
                        >
                          {selectedConversation.name} • {msg.time}
                        </Typography>
                      )}
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          bgcolor: msg.sender === 'user' ? '#0a66c2' : '#f3f4f6',
                          color: msg.sender === 'user' ? 'white' : '#111827',
                          borderRadius: 2,
                          fontSize: '0.9rem',
                          lineHeight: 1.5
                        }}
                      >
                        {msg.text}
                      </Paper>
                      {msg.sender === 'user' && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            mr: 0.5,
                            mt: 0.5,
                            display: 'block',
                            textAlign: 'right'
                          }}
                        >
                          {msg.time}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box
                sx={{
                  p: { xs: 1.5, md: 2 },
                  borderTop: '1px solid #e5e7eb',
                  bgcolor: 'white'
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Write a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" sx={{ mr: 0.5, display: { xs: 'none', sm: 'inline-flex' } }}>
                          <AttachFile sx={{ fontSize: 20, color: '#6b7280' }} />
                        </IconButton>
                        <IconButton size="small" sx={{ mr: 0.5, display: { xs: 'none', sm: 'inline-flex' } }}>
                          <EmojiEmotionsOutlined sx={{ fontSize: 20, color: '#6b7280' }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          sx={{
                            color: message.trim() ? '#0a66c2' : '#9ca3af'
                          }}
                        >
                          <Send sx={{ fontSize: 20 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: '#ffffff',
                      borderRadius: 3,
                      fontSize: { xs: '0.85rem', md: '0.9rem' },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e5e7eb'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db'
                      }
                    }
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Right Side - Conversations List */}
          <Box
            sx={{
              width: {
                xs: '100%',
                md: selectedConversation ? (isTablet ? 300 : 360) : '100%'
              },
              display: isMobile && selectedConversation ? 'none' : 'flex',
              flexDirection: 'column',
              bgcolor: 'white'
            }}
          >
            {/* Chat Header - MUST BE VISIBLE ON MOBILE */}
            <Box
              sx={{
                bgcolor: 'white',
                borderBottom: '1px solid #e5e7eb',
                p: 1.5,
                display: 'flex !important',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 56,
                flexShrink: 0,
                position: 'sticky',
                top: 0,
                zIndex: 100
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    mr: 1.5,
                    bgcolor: '#0a66c2',
                    fontSize: '1rem'
                  }}
                >
                  M
                </Avatar>
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  Messaging
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={handleClose}
                  sx={{
                    color: '#111827',
                    padding: '8px',
                    '&:hover': {
                      bgcolor: '#f3f4f6'
                    }
                  }}
                >
                  <Close sx={{ fontSize: 24 }} />
                </IconButton>
              </Box>
            </Box>

            {/* Search Bar */}
            <Box sx={{ p: { xs: 1.5, md: 2 }, bgcolor: 'white', borderBottom: '1px solid #e5e7eb' }}>
              <TextField
                fullWidth
                placeholder="Search messages"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ fontSize: 20, color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: '#f3f4f6',
                    borderRadius: 1,
                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                    '& fieldset': { border: 'none' }
                  }
                }}
              />
            </Box>

            {/* Tabs */}
            <Box
              sx={{
                display: 'flex',
                borderBottom: '1px solid #e5e7eb',
                bgcolor: 'white'
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  py: { xs: 1.2, md: 1.5 },
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderBottom: '2px solid #10b981',
                  color: '#10b981',
                  fontWeight: 600,
                  fontSize: { xs: '0.85rem', md: '0.95rem' }
                }}
              >
                Focused
              </Box>
              <Box
                sx={{
                  flex: 1,
                  py: { xs: 1.2, md: 1.5 },
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontWeight: 400,
                  fontSize: { xs: '0.85rem', md: '0.95rem' }
                }}
              >
                Other
              </Box>
            </Box>

            {/* Conversations List */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                bgcolor: '#ffffff',
                '&::-webkit-scrollbar': {
                  width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: '#d1d5db',
                  borderRadius: '3px'
                }
              }}
            >
              <List sx={{ p: 0 }}>
                {conversations.map((conversation) => (
                  <React.Fragment key={conversation.id}>
                    <ListItem
                      onClick={() => handleConversationClick(conversation)}
                      sx={{
                        py: { xs: 1.5, md: 2 },
                        px: { xs: 1.5, md: 2 },
                        bgcolor: selectedConversation?.id === conversation.id ? '#f3f4f6' : 'transparent',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: '#f9fafb'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          sx={{
                            '& .MuiBadge-dot': {
                              bgcolor: conversation.online ? '#10b981' : 'transparent',
                              width: { xs: 8, md: 10 },
                              height: { xs: 8, md: 10 },
                              borderRadius: '50%',
                              border: '2px solid white'
                            }
                          }}
                        >
                          <Avatar
                            src={conversation.avatar}
                            sx={{
                              width: { xs: 40, md: 48 },
                              height: { xs: 40, md: 48 },
                              bgcolor: '#9ca3af',
                              fontSize: { xs: '1rem', md: '1.1rem' }
                            }}
                          >
                            {conversation.name.charAt(0)}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box className="flex items-center justify-between">
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                fontSize: { xs: '0.85rem', md: '0.95rem' },
                                color: '#111827'
                              }}
                            >
                              {conversation.name}
                            </Typography>
                            {conversation.date && (
                              <Typography
                                variant="caption"
                                sx={{
                                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                                  color: '#9ca3af',
                                  ml: 1
                                }}
                              >
                                {conversation.date}
                              </Typography>
                            )}
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: '0.8rem', md: '0.85rem' },
                              color: '#6b7280',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              mt: 0.5
                            }}
                          >
                            {conversation.message}
                          </Typography>
                        }
                        sx={{ m: 0, ml: { xs: 1, md: 1.5 } }}
                      />
                      <IconButton size="small" sx={{ alignSelf: 'flex-start', display: { xs: 'none', sm: 'inline-flex' } }}>
                        <MoreVert sx={{ fontSize: 18, color: '#9ca3af' }} />
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" sx={{ ml: 9 }} />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </>
  );
};

export default GlobalChat;
