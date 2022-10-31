import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

export const RoundedButton: React.FC<ButtonProps> = ({children, ...props}) => {
    return (
        <Button
            variant="contained"
            {...props}
            sx={{ ...props.sx, borderRadius: 5 }}
        >
            {children}
      </Button>
    )
}