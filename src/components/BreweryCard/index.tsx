import {
  Box,
  Card,
  CardHeader,
  CardActionArea,
  Divider,
  Typography
} from '@material-ui/core';

import { Brewery } from 'entities';

import useStyles from './styles';

export type BreweryCardProps = {
  onClick: (id: number) => void;
} & Pick<
  Brewery,
  | 'id'
  | 'name'
  | 'street'
  | 'city'
  | 'state'
  | 'country'
  | 'postal_code'
  | 'brewery_type'
>;

function BreweryCard(props: BreweryCardProps) {
  const classes = useStyles({ type: props.brewery_type });

  function handleClick() {
    props.onClick(props.id);
  }

  return (
    <Card classes={{ root: classes.card }}>
      <CardActionArea
        aria-label={`Go to ${props.name} details`}
        classes={{ root: classes.action }}
        onClick={handleClick}
      >
        <CardHeader
          classes={{ root: classes.header, subheader: classes.subheader }}
          title={props.name}
          titleTypographyProps={{
            variant: 'h4',
            component: 'h3',
            className: classes.title
          }}
          subheader={
            <address className={classes.address}>
              <Typography variant="body1">{props.street}</Typography>

              <Typography variant="body1">
                {props.city} {props.state} - {props.postal_code}
              </Typography>

              <Typography variant="body1">{props.country}</Typography>
            </address>
          }
        />
      </CardActionArea>

      <Divider flexItem className={classes.divider} />

      <Box aria-label="brewery type" className={classes.bagde}>
        <span>{props.brewery_type}</span>
      </Box>
    </Card>
  );
}

export default BreweryCard;
