import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

type TableActionsProps = {
    onEditClick?: () => void
    onDeleteClick?: () => void
    disabled?: boolean
}

export const TableActions: React.FC<TableActionsProps> = ({
    onEditClick,
    onDeleteClick,
    disabled,
}) => (
    <Box
        display="flex"
        gap={1}
        sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
        }}
    >
        <IconButton aria-label="edit" onClick={onEditClick} disabled={disabled}>
            <Edit />
        </IconButton>
        <IconButton
            aria-label="delete"
            onClick={onDeleteClick}
            disabled={disabled}
        >
            <Delete />
        </IconButton>
    </Box>
)
