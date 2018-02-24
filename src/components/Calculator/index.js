import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardHeader} from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import {Field, reduxForm} from 'redux-form';
import Input from 'material-ui/Input';
import { Select, TextField } from 'redux-form-material-ui';
import Button from 'material-ui/Button';
import ProfitTable from 'components/ProfitTable';
import Grid from 'material-ui/Grid';
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import {compose} from 'recompose';

const defaultValues = {hashRate: 36, hashUnit: 'kh', powerConsumption: 400, kwhCost: 0.10, poolFee: 1};

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between'
    },
    card: {
        minWidth: 275,
        border: '1px solid #D9DEE4'
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: 15
    },
    calcWrap: {
        padding: 30
    }
});

const convertToH = (_rate, _unit) => {
    var _H = parseFloat(_rate);

    switch (_unit) {
        case 'h':
            return _H;
            break;
        case 'kh':
            return _H * 1000;
            break;
        case 'mh':
            return _H * 10000;
            break;
        case 'gh':
            return _H * 100000;
            break;
        case 'th':
            return _H * 1000000;
            break;

    }
}

const _globalHashRate = 200 * 1000 * 1000;
const _blockTime = 60;
const _reward = 5000;
const _price = 0.05;

class Calculator extends React.Component {

    state = {
        statistics: null
    }

    componentDidMount() {
        this.submit(defaultValues);
    }

    submit = (values) => {
        this.calculateProfit(values)
    }

    calculateProfit = (values) => {
        let _hashRate = convertToH(values.hashRate, values.hashUnit);
        console.log('_hashRate ', _hashRate)
        const myWinProbability = _hashRate / _globalHashRate;
        console.log('myWinProbability ', myWinProbability)
        var expectedHashTime = (1 / myWinProbability) * _blockTime;
        console.log('expectedHashTime ', expectedHashTime)
        var numWinning = (86400/expectedHashTime);
        var mined = numWinning * _reward;
        var totalProfit = mined * _price;
        var poolFee = totalProfit * parseFloat(values.poolFee)/100;
        var powerCost = (parseFloat(values.powerConsumption) / 1000) * 24 * parseFloat(values.kwhCost);
        var statistics = {
            day: {
                profit: (totalProfit - poolFee - powerCost).toFixed(2),
                poolFee: (poolFee).toFixed(2),
                mined: (mined).toFixed(0),
                powerCost: (powerCost).toFixed(2)
            }
        }

        statistics.week = {
            profit: (statistics.day.profit * 7).toFixed(2),
            poolFee: (statistics.day.poolFee * 7).toFixed(2),
            mined: (statistics.day.mined * 7).toFixed(0),
            powerCost: (statistics.day.powerCost * 7).toFixed(2)
        }

        statistics.month = {
            profit: (statistics.day.profit * 30).toFixed(2),
            poolFee: (statistics.day.poolFee * 30).toFixed(2),
            mined: (statistics.day.mined * 30).toFixed(0),
            powerCost: (statistics.day.powerCost * 30).toFixed(2)
        }

        statistics.year = {
            profit: (statistics.day.profit * 365).toFixed(2),
            poolFee: (statistics.day.poolFee * 365).toFixed(2),
            mined: (statistics.day.mined * 365).toFixed(0),
            powerCost: (statistics.day.powerCost * 365).toFixed(2)
        }

        this.setState({
            statistics: statistics
        })

        console.log('statistics ', statistics)
    }

    render() {
        const {classes, handleSubmit} = this.props;
        return (
            <Grid container style={{maxWidth:1024, margin: '0 auto'}}>
                <Grid item xs={5}>
                    <div className={classes.calcWrap}>
                        <Card className={classes.card} elevation={0}>
                            <CardHeader
                                title="Mining Calculator"
                            />
                            <CardContent>
                                <form onSubmit={handleSubmit(this.submit)} className={classes.container}>
                                    <Field name="hashRate" type="number" component={TextField} placeholder="Hashing Power" helperText="helper" className={classes.textField} required/>
                                    <Field
                                        name="hashUnit"
                                        component={Select}
                                        inputfield={<Input id="hashing-Unit"/>}
                                        value="h"
                                    >
                                        <MenuItem value="h">H/s</MenuItem>
                                        <MenuItem value="kh">KH/s</MenuItem>
                                        <MenuItem value="mh">MH/s</MenuItem>
                                        <MenuItem value="gh">GH/s</MenuItem>
                                        <MenuItem value="th">TH/s</MenuItem>
                                    </Field>
                                    <div className="cf"></div>
                                    <Field fullWidth name="powerConsumption" label="Power Consumption (w)" type="number" component={TextField} placeholder="Power Consumption" helperText="helper" className={classes.textField} required/>
                                    <Field fullWidth name="kwhCost" label="Cost per KWH ($)" type="number" component={TextField} placeholder="" helperText="helper" className={classes.textField}  required/>
                                    <Field fullWidth name="poolFee" label="Pool Fee" type="number" component={TextField} placeholder="" helperText="helper" className={classes.textField}  required/>
                                    <ExpansionPanel elevation={0}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography className={classes.heading}>Advanced</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className={classes.container}>
                                            <Field fullWidth name="globalHashRate" label="Global Hash Rate" type="number" component={TextField} placeholder="" helperText="helper" className={classes.textField}  required/>
                                            <Field fullWidth name="blockTime" label="Block Time" type="number" component={TextField} placeholder="" helperText="helper" className={classes.textField}  required/>
                                            <Field fullWidth name="reward" label="Block Reward" type="number" component={TextField} placeholder="" helperText="helper" className={classes.textField}  required/>
                                            <Field fullWidth name="price" label="NIM Price" type="number" component={TextField} placeholder="" helperText="helper" className={classes.textField}  required/>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                    <Button type="submit" variant="raised">Calculate</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <ProfitTable statistics={this.state.statistics}/>
                </Grid>
            </Grid>
        )
    }
}

Calculator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    reduxForm({form: 'miningCalc', initialValues: defaultValues}),
)(Calculator);