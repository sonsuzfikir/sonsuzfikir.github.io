const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "İstanbul'da kenar bir mahallede,yağmurlu bir havada üç yolun keşistiği bir noktada uyanıyorsun ve etrafında kimse yok. Hava karanlık ve hiçbir şey hatırlamıyorsun. Bir yöne gitmen gerekli.",
    options: [
      {
        text: "Araba seslerinin geldiği yöne doğru git.",
        setState: { araba: true },
        nextText: 2
      },
      {
        text: 'Ambulans sesinin geldiği yöne doğru git.',
		setState:{ambluans:true},
        nextText: 3
      },
		
	  {
        text: 'Kahkaha seslerinin geldiği yöne doğru git.',
		 setState:{kahkaha:true}, 
        nextText: 4
      }	
    ]
  },
  {
    id: 2,
    text: 'Şuan çevre yolunun kenarına ulaştın. Etrafında insan yok ve trafik çok yoğun değil ve yağmurun şiddeti giderek artıyor. Arabalar hızla önünden geçip gidiyorlar.',
    options: [
      {
        text: 'Otostop çekerek bir arabayı durdurmaya çalış.',
        requiredState: (currentState) => currentState.araba,
        nextText: 1
      },
      {
        text: 'Bir taksi durdur ve ona bin.',
        requiredState: (currentState) => currentState.araba,
        nextText: 1
      },
      {
        text: 'Bir kişiyle karşılaşmayı umarak yürümeye devam et.',
		requiredState: (currentState) => currentState.araba,  
        nextText: 1
      }
    ]
  },
  {
    id: 3,
    text: 'Vardığın yerde tam bir kaos söz konusu. Acı içerisinde bağıran bir kişiyi ambulansa koyuyorlar. Kıyafetleri kan içerisinde. Bazı kişiler insanların olay yerini terk etmemesi gerektiğini ve polisin varmak üzere olduğunu söylüyor.',
    options: [
      {
        text: 'Kendini yaralı kişinin yakını olarak tanıt ve ambulansa bin.',
		  requiredState: (currentState) => currentState.ambluans,
        nextText: 1
      },
      {
        text: 'Olay yerinde polisi bekle',
		  requiredState: (currentState) => currentState.ambluans,
        nextText: 1
      }
    ]
  },
  {
    id: 4,
    text: 'Bir eğlenceye denk geldin. Hemen sarhoş iki kişi yanına gelip seni aralarına davet ettiler. Sana başka bir isimle hitap ediyorlar. Belli ki seni başka birisi olarak düşünüyorlar. Bir şekilde masaya oturuyorsun. Sana yemek ve içki ikram ediyorlar. O sırada yanındaki adamın belinde bir silah olduğunu görüyorsun. Karnın çok aç.',
    options: [
      {
        text: 'Hiç bozuntuya vermeden karnını doyur.',
		  requiredState: (currentState) => currentState.kahkaha,
        nextText: 1
      },
		
		{
        text: 'Onların sandığı kişinin sen olmadığını söyle.',
		  requiredState: (currentState) => currentState.kahkaha,
        nextText: 1
      },
		
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()