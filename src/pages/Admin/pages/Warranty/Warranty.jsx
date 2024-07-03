import FavoriteIcon from '@mui/icons-material/Favorite'
import FilterListIcon from '@mui/icons-material/FilterList'

import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import warrantyApi from '../../../../apis/warranty'
import { formatDate } from '../../../../common'

export default function Warranty() {
    const [value, setValue] = useState('')
    const [info, setInfo] = useState({})
    const getWarranty = useMutation({
        mutationFn: (id) => warrantyApi.getWarranty(id)
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value) {
            toast.error('Vui lòng nhập mã bảo hành')
            return
        }
        getWarranty.mutate(value, {
            onSuccess: (data) => {
                setInfo(data)
            },
            onError: (error) => {
                toast.error(error.response.data.message)
                setInfo({})
            }
        })
    }
    console.log(info)
    const avatarContent =
        info.success === false ? (
            <Avatar sx={{ backgroundColor: 'red' }} aria-label='recipe'>
                <ErrorOutline color='#fff' />
            </Avatar>
        ) : (
            <Avatar sx={{ backgroundColor: 'green' }} aria-label='recipe'>
                <CheckCircleOutline color='#fff' />
            </Avatar>
        )

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    mb: 2,
                    px: 4,
                    py: 2,
                    backgroundColor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography fontSize='24px' component='p'>
                    Chế độ bảo hành
                </Typography>
            </Box>
            <Toolbar
                sx={{
                    py: 2,
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 }
                }}
            >
                <Box onSubmit={handleSubmit} sx={{ flex: '1 1 100%' }} variant='div' id='tableTitle' component='form'>
                    <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder='Nhập mã bảo hành'
                        size='medium'
                        sx={{ width: '450px' }}
                    />
                    <Button
                        type='submit'
                        variant='outlined'
                        color='success'
                        sx={{ ml: 2, height: '56px', width: '150px' }}
                    >
                        Kiểm tra
                    </Button>
                </Box>

                <Tooltip title='Filter list'>
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            {info.data && (
                <Card sx={{ maxWidth: 345, marginLeft: '16px' }}>
                    <CardHeader
                        avatar={avatarContent}
                        action={<IconButton aria-label='settings'></IconButton>}
                        title={info.message}
                        subheader={`Thời hạn: ${formatDate(info.data.warranty)}`}
                    />
                    <CardMedia
                        component='img'
                        height='300'
                        image={info.data?.product?.photo || 'https://mui.com/static/images/cards/paella.jpg'}
                        alt='Paella dish'
                    />
                    <CardContent>
                        <Typography variant='body2' color='text.secondary'>
                            {info.data?.product?.name}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label='add to favorites'>
                            <FavoriteIcon color='error' />
                        </IconButton>
                        <Typography fontSize='14px'>
                            Vui lòng đem sản phẩm đến cửa hàng gần nhất để được hướng dẫn
                        </Typography>
                    </CardActions>
                </Card>
            )}
        </Box>
    )
}
