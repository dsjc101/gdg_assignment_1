import { useRouter } from "next/router";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const courses = [
  { id: 1, name: "Introduction to AI", description: "Learn AI basics." },
  { id: 2, name: "Web Development Basics", description: "HTML, CSS, and JS." },
  { id: 3, name: "Data Structures and Algorithms", description: "Master algorithms." },
];

export default function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return <Typography>Course not found.</Typography>;
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4">{course.name}</Typography>
        <Typography variant="body1" gutterBottom>{course.description}</Typography>
        <TextField
          fullWidth
          label="Edit Course Name"
          defaultValue={course.name}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Edit Course Description"
          defaultValue={course.description}
          margin="normal"
        />
        <Button variant="contained" color="primary">Save Changes</Button>
      </Box>
    </Container>
  );
}
