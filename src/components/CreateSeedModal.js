import React, { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Tabs, Tab, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}


const CreateSeedModal = (props) => {

  const { open, handleClose } = props
  const [flag, setFlag] = useState(true)
  const [value, setValue] = useState(0)
  const [data, setData] = useState({
    customerId: '',
    date: new Date(),
    price: '',
    category: '',
    name: '',
    type: '',
    pormo: '',
    points: '',
  })


  const handleClick = (event, newValue) => {
    setValue(newValue)
  }

  const handleDateChange = (date) => {
    setData({ ...data, ['date']: date })
  }

  const handleChange = (e) => {
    console.log('[' + e.target.name + '] : ' + e.target.value)
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log('data : ', data)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ backgroundColor: '#fff', p: 2 }}>
        <DialogTitle sx={{ pt: 3, fontSize: '28px', fontWeight: '700' }}>
          Create Seed
        </DialogTitle>

        <DialogContent sx={{ pt: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='itemCenter'>
            <Tabs value={value} onChange={handleClick} aria-label="basic tabs example">
              <Tab label='Order' {...a11yProps(0)} />
              <Tab label="Promotion" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={flag}
            >
              <FormControlLabel value={false} onClick={() => setFlag(true)} control={<Radio />} label="New Customer" />
              <FormControlLabel value={true} onClick={() => setFlag(false)} control={<Radio />} label="Registered Customer" />
            </RadioGroup>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label">CustomerId</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.customerId}
                name='customerId'
                label="CustomerId"
                onChange={handleChange}
                disabled={flag ? false : true}
              >
                <MenuItem value='6617cd6fddce7991943c1c16'>6617cd6fddce7991943c1c16</MenuItem>
                <MenuItem value='6617cd6fddce7991943c1c17'>6617cd6fddce7991943c1c17</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <DatePicker
                className='messageInput'
                selected={data.date}
                placeholderText='Date and Time'
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={handleDateChange}
              />
            </Box>
            <TextField sx={{ my: 2 }} fullWidth variant='outlined' label='Price' name='price' onChange={handleChange} />
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.category}
                name='category'
                label="Category"
                onChange={handleChange}
                disabled={flag ? false : true}
              >
                <MenuItem value='meal'>meal</MenuItem>
                <MenuItem value='drink'>drink</MenuItem>
                <MenuItem value='candy'>candy</MenuItem>
                <MenuItem value='comvenience'>comvenience</MenuItem>
              </Select>
            </FormControl>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <TextField sx={{ py: 1 }} fullWidth variant='standard' label='Name' name='name' onChange={handleChange} />
            <TextField sx={{ py: 1 }} fullWidth variant='standard' label='Type' name='type' onChange={handleChange} />
            <TextField sx={{ py: 1 }} fullWidth variant='standard' label='promo' name='promo' onChange={handleChange} />
            <TextField sx={{ py: 1 }} fullWidth variant='standard' label='points' name='points' onChange={handleChange} />
          </CustomTabPanel>

        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' sx={{ color: 'white !important' }} onClick={handleClose} autoFocus>Close</Button>
          <Button variant='contained' color='success' sx={{ color: 'white !important' }} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default CreateSeedModal