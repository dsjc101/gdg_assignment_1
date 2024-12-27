import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';

const LandingPage = ({ isLoggedIn }) => {
  const router = useRouter();

  const [courses, setCourses] = useState([
    { code: 'CS101', title: 'Intro to Computer Science', credits: 4, instructor: 'Dr. Smith' },
    { code: 'MTH202', title: 'Linear Algebra', credits: 3, instructor: 'Dr. Johnson' },
  ]);
  const [search, setSearch] = useState('');
  const [newCourse, setNewCourse] = useState({ code: '', title: '', credits: '', instructor: '' });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [isLoggedIn, router]);

  const filteredCourses = courses.filter((course) =>
    course.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCourse = () => {
    if (newCourse.code && newCourse.title && newCourse.credits && newCourse.instructor) {
      setCourses([...courses, newCourse]);
      setNewCourse({ code: '', title: '', credits: '', instructor: '' });
    }
  };

  const handleDeleteCourse = (code) => {
    setCourses(courses.filter((course) => course.code !== code));
  };

  const handleEditCourse = (updatedCourse) => {
    setCourses(
      courses.map((course) => (course.code === updatedCourse.code ? updatedCourse : course))
    );
    setSelectedCourse(null);
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: 'linear-gradient(to right, #2193b0, #6dd5ed)' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Course Manager
          </Typography>
          <TextField
            size="small"
            placeholder="Search by course code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              bgcolor: 'white',
              borderRadius: '5px',
              '& .MuiOutlinedInput-root': { pl: 1 },
              minWidth: 300,
            }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* Course Grid */}
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.code}>
              <Card
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)' },
                }}
                onClick={() => setSelectedCourse(course)}
              >
                <CardContent>
                  <Typography variant="h6" align="center">
                    {course.code}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Course Section */}
        <Box
          mt={4}
          sx={{
            p: 4,
            borderRadius: '15px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            bgcolor: '#f9f9f9',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add New Course
          </Typography>
          <TextField
            label="Course Code"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
            sx={{ m: 1 }}
          />
          <TextField
            label="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            sx={{ m: 1 }}
          />
          <TextField
            label="Credits"
            type="number"
            value={newCourse.credits}
            onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
            sx={{ m: 1 }}
          />
          <TextField
            label="Instructor Name"
            value={newCourse.instructor}
            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
            sx={{ m: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCourse}
            sx={{ mt: 2, bgcolor: '#2193b0' }}
          >
            Add Course
          </Button>
        </Box>

        {/* Dialog for Course Details */}
        <Dialog open={!!selectedCourse} onClose={() => setSelectedCourse(null)} maxWidth="sm" fullWidth>
          {selectedCourse && (
            <>
              <DialogTitle>{selectedCourse.code} Details</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Title"
                  value={selectedCourse.title}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, title: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Credits"
                  type="number"
                  value={selectedCourse.credits}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, credits: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Instructor Name"
                  value={selectedCourse.instructor}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, instructor: e.target.value })
                  }
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDeleteCourse(selectedCourse.code)} color="error">
                  Delete
                </Button>
                <Button
                  onClick={() => handleEditCourse(selectedCourse)}
                  variant="contained"
                  color="primary"
                  sx={{ bgcolor: '#6dd5ed' }}
                >
                  Save
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default LandingPage;
