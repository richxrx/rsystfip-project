import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import esLocale from 'date-fns/locale/es';
import parseISO from 'date-fns/parseISO';
import { v4 } from 'uuid';
import rsystfipLogo from '../assets/rsystfip.svg';
import { ICounts } from '../interfaces/ICounts';
import ProtectedElement from './ProtectedElement';

interface IProps {
  title: string;
  data: Array<ICounts>;
  end_time: string;
}

function Listgroup({ title, data, end_time }: IProps): React.ReactNode {
  return (
    <>
      <ProtectedElement isAllowed={data.length > 0}>
        <Typography variant="body2" gutterBottom>
          {title}
        </Typography>
      </ProtectedElement>

      {data.map(({ category_name, counts }) => (
        <ListItem
          key={v4()}
          secondaryAction={<IconButton edge="end">{counts}</IconButton>}
        >
          <ListItemAvatar>
            <Avatar src={rsystfipLogo} alt="twbs" />
          </ListItemAvatar>

          <ListItemText
            primary={category_name}
            secondary={format(parseISO(end_time), 'MMM d, yyyy', {
              locale: esLocale,
            })}
          />
        </ListItem>
      ))}
    </>
  );
}

export default Listgroup;
