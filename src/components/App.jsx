import { AddContactForm } from 'components/AddContactForm/AddContactForm';
import { FilterContacts } from 'components/FilterContacts/FilterContacts';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Box } from 'Box';
import React from 'react';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  componentDidMount() {
    const parsedLS = JSON.parse(localStorage.getItem('contacts'));
    if (parsedLS) {
      this.setState({ contacts: parsedLS });
    }
  }
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleSubmit = (values, { resetForm }) => {
    const arr = this.state.contacts.map(el => {
      return el;
    });
    if (
      arr.find(el => {
        return el.name.toLowerCase() === values.name.toLowerCase();
      })
    ) {
      alert(`Sorry, but ${values.name} is already in contacts!`);
    } else {
      arr.push({ name: values.name, id: nanoid(), number: values.number });
    }

    this.setState({
      contacts: arr,
    });

    resetForm();
  };
  handleFilterContacts = e => {
    this.setState({ filter: e.target.value });
  };
  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    return (
      <Box
        display="flex"
        flexDirection="column"
        mr="auto"
        ml="auto"
        maxWidth={6}
        p={5}
      >
        <AddContactForm handleSubmit={this.handleSubmit} />
        <FilterContacts handleFilterContacts={this.handleFilterContacts} />
        <ContactList
          state={this.state}
          handleDeleteContacts={this.handleDeleteContact}
        />
      </Box>
    );
  }
}
