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
        visible: true,
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
        visible: true,
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
        visible: true,
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
        visible: true,
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

    randomTexts: [
      'OK', 
      'Ciao, come stai?', 
      'Ma che piacere sentirti!', 
      'Chi sei?',
      'Ue mitico!',
      'Bella zio',
      'Non scrivermi mai più',
      'Ma smettila di rompermi i coglioni',
      'Scrivimi un\'altra volta e chiamo i carabinieri',
      'Dove sono i miei soldi?!'
    ],

    contactActive: 0,
    msgSent: '',
    search: '',
    consoleVisible: undefined,
    now: dayjs().format('dddd MM MMMM YYYY HH:mm:ss'),
  },

  methods: {
    
    // se siamo nel contatto visualizzato, all'invio di
    // un messaggio (se non è una stringa vuota) questo 
    // viene pushato nel suo array e quindi visualizzato 
    // a schermo. dopo un secondo viene generata una risposta
    // random dall'elenco randomTexts
    botMessage() {
      
      if (this.msgSent.trim().length != 0) {
        this.contacts[this.contactActive].messages.push(
          {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            text: this.msgSent,
            status: 'sent'
          }
        );
        this.msgSent = '';
        setTimeout(() => {
          this.contacts[this.contactActive].messages.push(
            {
              date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
              text: `${this.randomTexts[Math.floor(Math.random() * (this.randomTexts.length - 1)) + 1]}`,
              status: 'received'
            }
          );
        }, 1000);
      } 
      
    }, //end botMessage

    // funzione che prende l'indice e ritorna la data 
    // dell'ultimo messaggio di quel contatto
    lastAccess(index) {
      let contactMsgs = this.contacts[index].messages;
      return contactMsgs[contactMsgs.length - 1].date
    },

    // funzione che prende l'indice e ritorna il testo 
    // dell'ultimo messaggio di quel contatto. Intero se
    // più corto di 30 caratteri, troncato + ... se più lungo
    lastMessage(index) {
      let contactMsgs = this.contacts[index].messages;
      if (contactMsgs[contactMsgs.length - 1].text.length > 30) {
        let sliceTxt = contactMsgs[contactMsgs.length - 1].text.slice(0,30);
        return sliceTxt + '...'
      }
      return contactMsgs[contactMsgs.length - 1].text
    },

    // ad ogni rilascio di tasto questa funzione viene chiamata
    // Con un ciclo forEach scorro ogni contatto e se questo
    // continene nel nome la stringa immessa nel campo di input
    // la sua proprietà visible risulta true e viene mostrato a video
    // nel caso contrario risulta false e scompare dalla lista
    searchUser(str) {

      this.contacts.forEach((contact) => {
        if (contact.name.toLowerCase().includes(str.toLowerCase())) {
          contact.visible = true;
        } else {
          contact.visible = false; 
        }
      })

    }, //end searchUser

    // funzione che chiamata al click di Delete message, rileva 
    // l'indice di quale messaggio ha scatenato l'evento
    // e lo rimuove all'array togliendolo effettivamenete
    // dalla conversazione. All'eliminazione dell'ultimo messaggio
    // la proprietà messagges risulta un array comprendente un 
    // solo oggetto messaggio vuoto. Niente stampa a video.
    deleteText(index) {

      this.contacts[this.contactActive].messages.splice(index, 1);

      if (this.contacts[this.contactActive].messages.length === 0) {
        this.contacts[this.contactActive].messages = [
          {
            date: '',
            text: '',
            status: ''
          },
        ]
      }

    }, //end deleteText

    // al rilascio del tasto enter viene scatenata questa funzione
    // che prende la stringa inserita come nome utente e poi
    // pusha nella base dati contatti un nuovo oggetto contatto
    // con il nome scelto, avatar random e oggetto messaggio template
    // vuoto. Poi azzera il campo di input, sposta il focus 
    // sull'ultima chat creata e chiama la funzione search user 
    // per ristampare a video la lista aggiornata
    newChat(str) {
      
      this.contacts.push(
        {
          name: this.search,
          avatar: `_${Math.floor(Math.random() * 8) + 1}`,
          visible: true,
          messages: [
            {
              date: '',
              text: '',
              status: ''
            },
          ],
        },
      );
      this.search = '';
      this.contactActive = this.contacts.length - 1;
      this.searchUser(this.search);
      
    }, //end newChat
      
  } //end methods

}); //end app

