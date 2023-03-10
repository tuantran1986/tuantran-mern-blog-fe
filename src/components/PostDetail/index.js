import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, pink, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment/moment';
import { useDispatch } from 'react-redux';
import { deletePost, updateLikeCountPost } from '../../redux/action';
import { Delete } from '@mui/icons-material';
import ModalConfirm from '../ModalConfirm';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostDetail(props) {
    
    const postInfo = props.postInfo;
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // UPDATE
    const clickUpdateLikeCountPost = (_id, likeCount) => {
        dispatch(updateLikeCountPost({
            _id: _id,
            likeCount: likeCount
        }))
    };

    // DELETE    
    const openDeleteConfirm = () => {
        setShowConfirm(true);
    };
    const closeDeleteConfirm = () => {
        setShowConfirm(false);
    };    
    const handleDeletePost = () => {
        dispatch(deletePost({
            _id: postInfo._id
        }));
        setShowConfirm(false);
    };
    
    // RETURN
    return (
        <>
        <Card sx={{ maxWidth: 600 }}>

            {/* 1. HEADER */}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        T
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <Delete sx={{ color: pink[500] }} onClick={openDeleteConfirm} />
                        {/* <MoreVertIcon /> */}
                    </IconButton>
                }
                // title="Shrimp and Chorizo Paella"
                title={postInfo.author}
                // create Date
                subheader={moment(postInfo.createDate).format('MMMM Do YYYY, h:mm:ss a')}
            />

            {/* 2. IMAGE */}
            <CardMedia
                component="img"
                height="400"
                image={postInfo.attachment}
                alt="Paella dish"
            />

            {/* 3. TITLE */}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {postInfo.title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/* ICON - HEART */}
                <IconButton aria-label="add to favorites" style={{ color: 'rebeccapurple' }} onClick={() => { clickUpdateLikeCountPost(postInfo._id, postInfo.likeCount) }}>
                    <span style={{ fontSize: '16px' }}>
                        {postInfo.likeCount}
                    </span>
                    <FavoriteIcon />
                </IconButton>
                {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    style={{ color: 'rebeccapurple' }}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            {/* 4. CONTENT */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {postInfo.content}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
        
        <ModalConfirm 
            open={showConfirm}
            post={postInfo}
            handleClose={closeDeleteConfirm}
            handleDelete={handleDeletePost}
        />
        </>
    );
}