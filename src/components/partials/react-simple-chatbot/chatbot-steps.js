
export const steps = [
    {
      id: '0',
      message: 'Welcome!',
      trigger: '1',
    }, {
      id: '1',
      message: 'Please write your username',
      trigger: '2'
    }, {
      id: '2',
      user: true,
      trigger: '3',
    }, {
      id: '3',
      message: " hi {previousValue}, how can I help you?",
      trigger: 4
    }, {
      id: '4',
      options: [
        { value: 1, label: 'View Courses', trigger: "5" },
        { value: 2, label: 'Read Articles', trigger: "6" },
  
      ],
    },
    {
      id: '5',
      message: "Thanks for choosing view courses",
      end: true
    },
    {
      id: '6',
      message: "Thanks for choosing Articles",
      end: true
    },
  ];
  
  // Creating our own theme
  export const theme = {
    background: '#f2f3f5',
    headerBgColor: '#0274f5',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: '#fff',
    botFontColor: 'white',
    userBubbleColor: '#06ba30',
    userFontColor: 'white',
    fontFamily: 'Helvetica Neue',
  };
  
  // Set some properties of the bot
  export const config = {

    // botAvatar: "img.png",
    floating: true,
  };
