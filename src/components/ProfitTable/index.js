import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = {
    root: {
        flexGrow: 1,
    },
    wrap: {
        padding: 30
    },
    rowWrap: {
        background: '#f1f1f1',
        marginBottom: 30,
        borderRadius: 15
    },
    colWrap: {
        padding: '15px!important'
    }
};

class ProfitTable extends React.Component {

    render() {
        const { classes, statistics } = this.props;
        return (
            <div className={classes.wrap}>
                {statistics && Object.keys(statistics).map((section, index) => (
                    <div className={classes.rowWrap} key={index}>
                        <Grid container key={index}>
                            <Grid item xs={4} className={classes.colWrap}>
                                <Typography variant="caption" align="right">Profit per {section}</Typography>
                                <Typography variant="title" align="right">${statistics[section].profit}</Typography>
                                <Typography variant="caption" align="right">Pool Fee ${statistics[section].poolFee}</Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.colWrap}>
                                <Typography variant="caption" align="right">Mined per {section}</Typography>
                                <Typography variant="title" align="right">NIM {statistics[section].mined}</Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.colWrap}>
                                <Typography variant="caption" align="right">Power cost/{section}</Typography>
                                <Typography variant="title" align="right">${statistics[section].powerCost}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                ))}
            </div>
        );
    }
}

ProfitTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfitTable);