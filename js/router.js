import Backbone from 'backbone';
import $ from 'jquery';

import ContactsCollection from './contacts_collection';

import homeTemplate from './views/home';
import contactsTemplate from './views/contacts';
import contactTemplate from './views/contact';

import formTemp from './views/form';

let Router = Backbone.Router.extend({

  routes: {
    ""      : "home",
    "contacts" : "showContacts",
    "contacts/:id" : "showSpecificContact",
    "about" : "showAbout",
    "users/new"  :  "showForm",
  },

  initialize: function(appElement) {
    this.$el = appElement;

    this.contacts = new ContactsCollection();

    let router = this;

    this.$el.on('click', '.contact-list-item', function(event) {
      let $li = $(event.currentTarget);
      var contactId = $li.data('contact-id');
      router.navigate(`contacts/${contactId}`);
      console.log(contactId);
      router.showSpecificContact(contactId);
    });
  },

  home: function() {
    console.log('show home page');
    this.$el.html( homeTemplate() );
  },

  showForm: function showForm() {
  this.$el.html(formTemp());
  $('#btnCreateUser').on('click', (event) => {
    console.log('its finally working');
    let newUser = {
      Name: $('input[name="FullName"]').val(),
      PhoneNum: $('input[name="PhoneNum"]').val(),
      Email: $('input[name="Email"]').val(),
      Location: $('input[name="Location"]').val()
    };
    this.contacts.create(newUser);
    this.navigate('contacts');
    this.showContacts();
    return false;
  });
},

  showSpinner: function() {
    this.$el.html(
      '<i class="fa fa-spinner fa-spin"></i>'
    );
  },

  showSpecificContact: function(contactId) {
    let contact = this.contacts.get(contactId);

    if (contact) {
      // todos have fetched and we grabbed the one we want
      this.$el.html( contactTemplate(contact.toJSON()) );
    } else {
      // todos not fetched so we need to load the one we want
      let router = this;
      contact = this.contacts.add({objectId: contactId});
      this.showSpinner();
      contact.fetch().then(function() {
        router.$el.html( contactTemplate(contact.toJSON()) );
      });
    }

  },

  showContacts: function() {
    console.log('show contacts page');

    this.showSpinner();

    var router = this;

    this.contacts.fetch().then( function(){

      router.$el.html( contactsTemplate(router.contacts.toJSON()) );

    });

  },

  showAbout: function() {
    console.log('show about page');
  },

  start: function() {
    Backbone.history.start();
  }

});

export default Router;
