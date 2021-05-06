const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const closeBtn = document.getElementById('close');
const text = document.getElementById('text');
const readBtn = document.getElementById('read');

const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text:" I Want To Go To Grandma's"
    }
  ];

  //Insert images to main
  data.forEach(createBox);

  //create box
  function createBox(item){
      const box = document.createElement('div');
      box.classList.add('box');
      const {image , text} = item;

      box.innerHTML=`
      <img src ='${image}'  alt='${text}'/>
      <p  class='info' >${text}</p>
      `;

      box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        box.classList.add('active');
        setTimeout(() => box.classList.remove('active') , 800);
      });
      main.appendChild(box);
  }
  //init message thynthesis
  const message = new SpeechSynthesisUtterance();

  //store voices in array
  let voices = [];

  function getVoices(){
    voices = speechSynthesis.getVoices();
    voices.forEach( voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.innerText =`${voice.name} ${voice.lang}`;
      
      voiceSelect.appendChild(option);
    });
  }


  //set text message 
  function setTextMessage(text){
    message.text = text;
  }

  //speak text mesage 
  function speakText(){
    speechSynthesis.speak(message);
  }
//set voices 
function setVoice(event){
  message.voice = voices.find( voice => voice.name === event.target.value);
}

//read the text area voice
function readText(){
 const textArea = text.value ;
 
 setTextMessage(textArea);
 speakText();

}

//listen for changes in select
speechSynthesis.addEventListener('voiceschanged' , getVoices);
  //toggle the text box
  toggleBtn.addEventListener('click', () => textBox.classList.toggle('show') );

  //close button
  closeBtn.addEventListener('click', () => textBox.classList.remove('show') );


//Change the voice
  voiceSelect.addEventListener('change',setVoice);

  //event listener on read button
  readBtn.addEventListener('click',readText);

  //init the get voices
  getVoices();
