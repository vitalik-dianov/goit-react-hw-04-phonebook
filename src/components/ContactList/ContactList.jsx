import { PropTypes } from 'prop-types';
import { ListItem, List } from './ContactList.styled';

export const ContactList = ({ state, handleDeleteContacts }) => {
  const visibleContacts = state.contacts.filter(el => {
    return el.name.toLowerCase().includes(state.filter.toLowerCase());
  });
  return (
    <List>
      {visibleContacts.map(el => {
        return (
          <ListItem key={el.id}>
            {el.name} : {el.number}
            <button type="button" onClick={() => handleDeleteContacts(el.id)}>
              Delete
            </button>
          </ListItem>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  state: PropTypes.object.isRequired,
  handleDeleteContacts: PropTypes.func.isRequired,
};
