import { AddContactForm } from 'components/AddContactForm/AddContactForm';
import { FilterContacts } from 'components/FilterContacts/FilterContacts';
import { ContactList } from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Box } from 'Box';
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedLS = JSON.parse(window.localStorage.getItem('contacts'));

    if (parsedLS) {
      setContacts(parsedLS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (values, { resetForm }) => {
    const arr = contacts.map(el => {
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

    setContacts(arr);

    resetForm();
  };
  const handleFilterContacts = e => {
    setFilter(e.target.value);
  };
  const handleDeleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      mr="auto"
      ml="auto"
      maxWidth={6}
      p={5}
    >
      <AddContactForm handleSubmit={handleSubmit} />
      <FilterContacts handleFilterContacts={handleFilterContacts} />
      <ContactList
        contacts={contacts}
        filter={filter}
        handleDeleteContacts={handleDeleteContact}
      />
    </Box>
  );
};
