const app = new Vue({
  el: '#app',
  
  data: {
    user: {
      name: 'Nome Utente',
      avatar: '_io'
    },
    // base dati contatti
    contacts: [
      {
        name: 'Michele',
        avatar: '_1',
        visible: false,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent'
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: false,
        messages: [
          {
            date: '20/03/2020 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
          }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: false,
        messages: [
          {
            date: '28/03/2020 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: false,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      },
    ],

    msgSent: '',
    search: '',
    clonedContacts: []
  },

  // nel mounted inizializzo il primo contatto
  // della lista come visibile e clono la base dati
  // in un nuovo array
  mounted() {
    this.contacts[0].visible = true;
    this.clonedContacts = [...this.contacts];
  },

  methods: {
    
    // funzione che richiamata dal click sull'elemento lista
    // setta tutti i visibile a false e solo quello cliccato a true
    // in modo da visualizzare quello
    displayMessages(index) {
      this.clonedContacts.forEach((contact) => {
        contact.visible = false
      });
      this.contacts[index].visible = true;
    }, //end displayMessages

    // se siamo nel contatto visualizzato, all'invio di
    // un messaggio questo viene pushato nel suo array
    // e quindi visualizzato a schermo. dopo un 
    // secondo viene generata una risposta predefinita
    botMessage() {
      this.contacts.forEach((contact) => {
        if (contact.visible === true) {
          if (this.msgSent.trim().length != 0) {
            contact.messages.push(
              {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                text: this.msgSent,
                status: 'sent'
              }
            );
            this.msgSent = '';
            setTimeout(() => {
              contact.messages.push(
                {
                  date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                  text: 'OK',
                  status: 'received'
                }
              );
            }, 1000);
          } 
        }
      });
    }, //end botMessage

    // filtro l'array clone ogni volta che viene rilasciato un
    // tasto qualsiasi dopo aver creato un v-bind. cerco il match 
    // tra la stringa immessa e il nome del contatto. se avviene 
    // quel contatto viene inserito nel nuovo array. Alla fine 
    // la base dati viene sovrascritta dal nuovo array. Questa 
    // funzione venendo chiamata ad ogni tasto reagisce anche al delete
    // quindi a strigna vuota tutta la base dati originale viene mostrata
    searchUser(str) {
      let displayContacts = this.clonedContacts.filter((contact) => {
        return contact.name.toLowerCase().includes(str.toLowerCase());
      });
      this.contacts = displayContacts;
    } //end searchUser
      
  } //end methods

}); //end app