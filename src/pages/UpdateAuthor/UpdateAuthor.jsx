import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import AuthorizationAxios from '../../hooks/Request';
import { toast } from 'react-toastify';

export default function UpdateAuthor({ author, onClose }) {
  const [name, setName] = useState(author.name);
  const [born, setBorn] = useState(author.born);
  const [dob, setDob] = useState(author.dob);
  const [died, setDied] = useState(author.died === 'N/A' ? '' : author.died);
  const [description, setDescription] = useState(author.description);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('born', born);
      formData.append('dob', dob);
      formData.append('died', died || null);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      await AuthorizationAxios.postUpload(`/api/author/update/${author.id}`, formData);
      toast.success('Author updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating author:', error);
      toast.error('Failed to update author.');
    }
  };

  return (
    <div>
      <Typography
        variant="h4"
        color="#00635d"
        fontWeight="bold"
        align="center"
        sx={{ mt: 3 }}
      >
        Update Author
      </Typography>
      <hr />
      <div style={{ margin: '20px' }}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Born"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Date of Death"
          type="date"
          value={died}
          onChange={(e) => setDied(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image"
          type="file"
          onChange={handleFileChange}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
