import { Box, Card, Avatar, Typography } from "@mui/material";

export default function CommentsList({ comments }) {
  return (
    <>
      <h3>Comments:</h3>
      <Box>
        {comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "flex-start",
              gap: {
                xs: "10px",
                md: "40px",
              },
            }}
          >
            <Box p={1}>
              <Typography variant="subtitle2">created by: </Typography>
              <Avatar
                src={comment.author.avatar}
                alt={comment.author.name}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="body2" gutterBottom>
                {comment.author.name}
              </Typography>
            </Box>
            <Card
              style={{
                padding: "10px",
                minWidth: "200px",
              }}
            >
              <Typography variant="body1" gutterBottom>
                {comment.body}
              </Typography>
            </Card>
          </Box>
        ))}
      </Box>
    </>
  );
}
