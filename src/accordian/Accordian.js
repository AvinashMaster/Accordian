import React, { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Accordian = () => {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ header: '', details: '' });
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addSection = (e) => {
    e.preventDefault();

    // Check if both header and details are not empty
    if (newSection.header.trim() === '' || newSection.details.trim() === '') {
      return; // Return early if either is empty
    }

    setSections((prevSections) => [
      ...prevSections,
      { header: newSection.header, details: newSection.details },
    ]);
    setNewSection({ header: '', details: '' });
  };

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '40px' }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
        <Paper elevation={3} className="form-paper">
            <Typography variant="h5" sx={{marginBottom:"5px", textAlign:"center"}}>Add Section</Typography>
            <form onSubmit={addSection}>
              <TextField
              sx={{marginBottom:"5px"}}
                label="Section Header"
                fullWidth
                value={newSection.header}
                onChange={(e) =>
                  setNewSection({ ...newSection, header: e.target.value })
                }
              />
              <TextField
              sx={{marginBottom:"5px"}}
                label="Section Details"
                fullWidth
                multiline
                rows={4}
                value={newSection.details}
                onChange={(e) =>
                  setNewSection({ ...newSection, details: e.target.value })
                }
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <div>
            {sections.map((item, i) => (
              <Accordion
                key={i}
                expanded={expandedIndex === i}
                onChange={() => toggleAccordion(i)}
                className="accordion-item"
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-header">
                  <Typography><strong>{item.header}</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.details}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accordian;
