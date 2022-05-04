import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import styles from './loading.module.css'
const Loading = () => {
    return (
        <div className={styles.loading}>
            <Box sx={{ display: 'flex', }}>
                <CircularProgress />
            </Box>
            <h2>Loading..</h2>
        </div>
    )
}

export default Loading