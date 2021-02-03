import React from 'react';
import Color from 'color';
import GoogleFont from 'react-google-font-loader'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core'
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';

const useStyles  = makeStyles(() => ({
    actionArea: {
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)'
        },
    },
    card: ({color}) => ({
        minWidth: 256,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${Color(color)}
                .rotate(-12)
                .darken(0.2)
                .fade(0.5)`,
        },
    }),
    content: ({ color }) => {
        return {
            backgroundColor: color,
            padding: '1rem 1.5rem 1.5rem',
        };
    },
    title: {
        fontFamily: 'Keania One',
        fontSize: '2rem',
        color: '#fff',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: 'Montserrat',
        color: '#fff',
        opacity: 0.87,
        marginTop: '2rem',
        fontWeight: 500,
        fontSize: 14,
    },

}));


const CustomCard = ({ classes, alt, src, title, authors, publish, publishedDate}) => {
    const mediaStyle = useFourThreeCardMediaStyles();

    return (
        <CardActionArea className={classes.actionArea}>
            <Card className={classes.card}>
                <CardMedia className={classes.media} alt={alt} image={src} />
                <CardContent className={classes.content}>
                    <Typography className={classes.title} noWrap={true}>
                        {title}
                    </Typography>
                    {authors && authors.map((author,index) => (
                        <Typography key={index} className={classes.authorStyle}>
                            {author}
                        </Typography>
                    ))}
                    <Typography className={classes.publish}>
                        {publish} {publishedDate}
                    </Typography>
                </CardContent>

            </Card>

        </CardActionArea>
    )
}

export default CustomCard