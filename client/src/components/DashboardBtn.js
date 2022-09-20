import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Component that creates a drop down menu on on any page to allow the user to navigate to the home, profile and other links
export default function DashboardBtn() {
	const { logout } = useAuth0();
	let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, value) => {
		setAnchorEl(null);
		if(value === 'profile'){
			console.log('if statement');
			navigate('/profile');
		}
		else if(value === 'home'){
			navigate('/');
		}
		else if(value === 'logout'){
			logout({returnTo: window.location.origin})
		}
  };

  return (
    <Wrapper>
      <Button
				className='button-style'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem 
					// onClick={(e) => handleClose(e)}>Profile</MenuItem>
					onClick={(e) => handleClose(e, 'profile')}>Profile</MenuItem>
        <MenuItem onClick={(e) => handleClose(e, 'home')}>Home</MenuItem>
        <MenuItem onClick={(e) => handleClose(e, 'logout')}>Logout</MenuItem>
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.div`
display: flex;
.button-style {
	background-color: white;
	color: black;
	&:hover {
		background-color: var(--color-main-opal);
	}
}`