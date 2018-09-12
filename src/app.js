const app = () => {
  'use strict';

  const basicOptions = ['rock', 'paper', 'scissors'];
  const advancedOptions = ['rock', 'spock', 'paper', 'lizard', 'scissors'];
  let gameOptions = [];
  let oddsNumbersCounter = [];
  let advancedLvl = false;
  let userChoice = '';
  let timer;
  let winner;

  const computerChoice = () => (
    gameOptions[Math.floor(Math.random() * gameOptions.length)]
  )

  const enablePlayBtn = (enable) => {
    if (enable) {
      document.querySelector('.options .button').style.opacity = 1;
      document.querySelector('.options .button').addEventListener('click', play);
    } else {
      document.querySelector('.options .button').style.opacity = 0.5;
      document.querySelector('.options .button').removeEventListener('click', play);
    }
  }

  const changeLevel = (e) => {
    const isChecked = e.target.checked;
    advancedLvl = !!isChecked;

    if (isChecked) {
      document.querySelector('section section:first-of-type').className = 'selectedOption';
    }

    setUpOptions();
  }

  const changeMode = (e) => {
    const isChecked = e.target.checked;
    setLabels(isChecked);
    enablePlayBtn(isChecked);

    if (isChecked) {
      document.querySelector('section section:first-of-type').className = 'selectedOption';
      document.querySelector('ul').style.opacity = 0.5;
      document.querySelector('ul').removeEventListener('click', setUserChoice);
    } else {
      document.querySelector('ul').style.opacity = 1;
      document.querySelector('ul').addEventListener('click', setUserChoice);
    }
  }

  const restartGame = () => {
    const isChecked = document.querySelector('#btnMode').checked;
    oddsNumbersCounter = [];
    gameOptions = [];
    userChoice = '';
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('section section:first-of-type').className = 'selectedOption';
    document.querySelector('section section:last-of-type').className = 'selectedOption';
    setLabels(isChecked);
    enablePlayBtn(isChecked);
    setUpOptions();
  }

  const setLabels = (isChecked) => {
    document.querySelector('section section:first-of-type').innerHTML = isChecked ? 'Computer 1' : 'Player';
    document.querySelector('section section:last-of-type').innerHTML = isChecked ? 'Computer 2' : 'Computer';
  }

  const setUserChoice = (e) => {
    if (e.target && e.target.nodeName === 'LI') {
      const className = e.target.className;
      userChoice = className;
      document.querySelector('section section:first-of-type').className = `selectedOption ${className}`;
      document.querySelector('section section:first-of-type').innerHTML = '';
      enablePlayBtn(userChoice);
    }
  }

  const setWinner = () => {
    clearTimeout(timer);
    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.modal span').innerHTML = winner;
  }

  const play = () => {
    const player1Choice = userChoice || computerChoice();
    const player1 = gameOptions.indexOf(player1Choice);

    const player2Choice = computerChoice();
    const player2 = gameOptions.indexOf(player2Choice);

    const getDifference = (player1 - player2) % gameOptions.length;

    if (!userChoice) {
      document.querySelector('section section:first-of-type').className = `selectedOption ${player1Choice}`;
      document.querySelector('section section:first-of-type').innerHTML = '';
    }
    document.querySelector('section section:last-of-type').className = `selectedOption ${player2Choice}`;
    document.querySelector('section section:last-of-type').innerHTML = '';

    if (getDifference === 0) {
      winner = `${userChoice ? 'Player and Computer' : 'Computer 1 and Computer 2'} Tie!!!`;
    } else if (oddsNumbersCounter.includes(getDifference) || -(oddsNumbersCounter.length) > getDifference) {
      winner = `${userChoice ? 'Player' : 'Computer 1'} Wins!!!`;
    } else {
      winner = `${userChoice ? 'Computer' : 'Computer 2'} Wins!!!`;
    }

    timer = setTimeout(setWinner, 500);
  }

  const setUpOptions = () => {
    let initValue = 0;
    let items = '';

    gameOptions = advancedLvl ? advancedOptions : basicOptions;

    for (let i = 0; i < gameOptions.length; ++i) {
      items += `<li class="${gameOptions[i]}"></li>`
      if ((i % 2) !== 0) {
        initValue++;
        oddsNumbersCounter.push(initValue);
      }
    }

    document.querySelector('ul').innerHTML = items;
  }

  const setUpGame = () => {
    setUpOptions();
    document.querySelector('ul').addEventListener('click', setUserChoice);
    document.querySelector('#btnMode').addEventListener('click', changeMode);
    document.querySelector('#btnLevel').addEventListener('click', changeLevel);
    document.querySelector('.modal .button').addEventListener('click', restartGame);
    document.querySelector('.options .button').style.opacity = 0.5;
  }

  setUpGame();
}

export default app;