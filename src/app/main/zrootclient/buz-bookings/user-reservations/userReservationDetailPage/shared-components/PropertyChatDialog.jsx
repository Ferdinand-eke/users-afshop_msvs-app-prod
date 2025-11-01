import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import {
  Close,
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
} from "@mui/icons-material";
import { useAppSelector } from "app/store/hooks";
import { selectUser } from "src/app/auth/user/store/userSlice";

/**
 * PropertyChatDialog Component
 * Beautiful, compelling chat interface for users to communicate with property hosts
 * Persistent state using localStorage
 */
function PropertyChatDialog({ open, onClose, reservation }) {
  const user = useAppSelector(selectUser);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    if (reservation?.id) {
      const savedMessages = localStorage.getItem(
        `chat_messages_${reservation.id}`
      );
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (error) {
          console.error("Error loading chat messages:", error);
        }
      }
    }
  }, [reservation?.id]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (reservation?.id && messages.length > 0) {
      localStorage.setItem(
        `chat_messages_${reservation.id}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, reservation?.id]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: "user",
        timestamp: new Date().toISOString(),
        userName: user?.name || user?.data?.displayName || "You",
        userAvatar: user?.data?.photoURL,
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Simulate host response (for demo purposes)
      setTimeout(() => {
        const hostResponse = {
          id: Date.now() + 1,
          text: "Thank you for your message! We'll get back to you shortly.",
          sender: "host",
          timestamp: new Date().toISOString(),
          userName: "Property Host",
          userAvatar: null,
        };
        setMessages((prev) => [...prev, hostResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          height: "80vh",
          maxHeight: "700px",
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              PH
            </Avatar>
            <div>
              <Typography
                variant="h6"
                className="font-bold text-white leading-tight"
              >
                Property Host
              </Typography>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <Typography variant="caption" className="text-white/90">
                  Online
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              sx={{ color: "white" }}
              onClick={() => {
                /* Options menu */
              }}
            >
              <MoreVert />
            </IconButton>
            <IconButton sx={{ color: "white" }} onClick={onClose}>
              <Close />
            </IconButton>
          </div>
        </div>

        {/* Reservation Info Chip */}
        {reservation?.id && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <Chip
              label={`Reservation #${reservation.id}`}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 600,
                backdropFilter: "blur(10px)",
              }}
              size="small"
            />
          </motion.div>
        )}
      </motion.div>

      <Divider />

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4"
        style={{
          background: "linear-gradient(180deg, #fafaf9 0%, #ffffff 100%)",
        }}
      >
        {/* Welcome Message */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)",
              }}
            >
              <EmojiEmotions sx={{ fontSize: "2.5rem", color: "#ea580c" }} />
            </div>
            <Typography variant="h6" className="font-bold text-gray-900 mb-2">
              Start a Conversation
            </Typography>
            <Typography variant="body2" className="text-gray-600 max-w-xs mx-auto">
              Send a message to connect with your property host. They typically
              respond within a few hours.
            </Typography>
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[75%] ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <Avatar
                  src={msg.userAvatar}
                  sx={{
                    width: 36,
                    height: 36,
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                        : "#6b7280",
                  }}
                >
                  {msg.userName?.[0]?.toUpperCase()}
                </Avatar>

                {/* Message Bubble */}
                <div>
                  <div
                    className={`p-4 rounded-2xl ${
                      msg.sender === "user"
                        ? "rounded-tr-none"
                        : "rounded-tl-none"
                    }`}
                    style={{
                      background:
                        msg.sender === "user"
                          ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                          : "#f3f4f6",
                      color: msg.sender === "user" ? "white" : "#111827",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.text}
                    </Typography>
                  </div>
                  <Typography
                    variant="caption"
                    className={`text-gray-500 mt-1 block ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <Divider />

      {/* Input Area */}
      <div className="p-4 bg-white">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <IconButton
            sx={{
              color: "#6b7280",
              "&:hover": {
                color: "#ea580c",
                backgroundColor: "rgba(234, 88, 12, 0.05)",
              },
            }}
          >
            <AttachFile />
          </IconButton>

          {/* Message Input */}
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                backgroundColor: "#f9fafb",
                "&:hover fieldset": {
                  borderColor: "#ea580c",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ea580c",
                },
              },
            }}
          />

          {/* Send Button */}
          <IconButton
            onClick={handleSendMessage}
            disabled={!message.trim()}
            sx={{
              background: message.trim()
                ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                : "#e5e7eb",
              color: "white",
              width: 48,
              height: 48,
              "&:hover": {
                background: message.trim()
                  ? "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)"
                  : "#e5e7eb",
              },
              "&:disabled": {
                color: "#9ca3af",
              },
            }}
          >
            <Send />
          </IconButton>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mt-3 px-2">
          <Typography variant="caption" className="text-gray-500">
            Quick actions:
          </Typography>
          {[
            "Check-in details",
            "Property amenities",
            "Directions",
            "Emergency contact",
          ].map((action, index) => (
            <Chip
              key={index}
              label={action}
              size="small"
              onClick={() => setMessage(action)}
              sx={{
                fontSize: "0.75rem",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#fed7aa",
                },
              }}
            />
          ))}
        </div>
      </div>
    </Dialog>
  );
}

export default PropertyChatDialog;
