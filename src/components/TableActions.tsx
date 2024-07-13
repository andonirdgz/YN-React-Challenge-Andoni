import { Delete, Edit } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

type TableActionsProps = {
    onEditClick?: () => void
    onDeleteClick?: () => void
}

export const TableActions: React.FC<TableActionsProps> = ({
    onEditClick,
    onDeleteClick,
}) => (
    <Box
        display="flex"
        gap={1}
        sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
        }}
    >
        <IconButton aria-label="edit" onClick={onEditClick}>
            <Edit />
        </IconButton>
        <IconButton aria-label="delete" onClick={onDeleteClick}>
            <Delete />
        </IconButton>
    </Box>
)
